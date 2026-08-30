import { BrowserMultiFormatReader } from '@zxing/browser';

/**
 * Decodes barcode / QR code from an image data URL or HTML Video element
 */
export async function decodeBarcodeFromImage(imageSrc: string): Promise<string | null> {
  // Method 1: Check native browser BarcodeDetector API if available
  if ('BarcodeDetector' in window) {
    try {
      const img = new Image();
      img.src = imageSrc;
      await new Promise((res) => (img.onload = res));

      const detector = new (window as any).BarcodeDetector({
        formats: ['qr_code', 'ean_13', 'upc_a', 'upc_e', 'code_128', 'datamatrix'],
      });

      const barcodes = await detector.detect(img);
      if (barcodes.length > 0) {
        return barcodes[0].rawValue;
      }
    } catch (e) {
      console.warn('Native BarcodeDetector fallback to ZXing:', e);
    }
  }

  // Method 2: Fallback to ZXing MultiFormatReader
  try {
    const codeReader = new BrowserMultiFormatReader();
    const img = new Image();
    img.src = imageSrc;
    await new Promise((res) => (img.onload = res));

    const result = await codeReader.decodeFromImageElement(img);
    if (result) {
      return result.getText();
    }
  } catch (e) {
    // No barcode detected in image
  }

  return null;
}
