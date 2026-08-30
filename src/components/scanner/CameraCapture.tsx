import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Check } from 'lucide-react';
import { Modal } from '../common/Modal';

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access camera. Please allow permission or select a file instead.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleTakeSnap = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        onCapture(dataUrl);
        stopCamera();
        onClose();
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Live Camera Scanner" maxWidth="max-w-2xl">
      <div className="space-y-4">
        {cameraError ? (
          <div className="p-6 text-center text-xs text-red-500 bg-red-500/10 rounded-2xl">
            {cameraError}
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black flex items-center justify-center">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <canvas ref={canvasRef} className="hidden" />

            {/* Target Alignment Overlay Grid */}
            <div className="absolute inset-8 border-2 border-brand-400/70 border-dashed rounded-2xl pointer-events-none flex items-center justify-center">
              <span className="bg-slate-900/80 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Align Medicine Label Within Frame
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={startCamera}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>

          <button
            onClick={handleTakeSnap}
            disabled={!!cameraError}
            className="gradient-bg-primary px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
          >
            <Camera className="w-4 h-4" />
            <span>Capture Image</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
