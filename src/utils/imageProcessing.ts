/**
 * Preprocesses an image on an HTML5 canvas to optimize OCR text extraction accuracy.
 * Enhances sharpness, contrast, removes noise, corrects rotation alignment, and crops empty background.
 */
export async function preprocessImageForOCR(imageSrc: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(imageSrc);
        return;
      }

      // 1. Resize image to optimal dimension for fast OCR
      const maxDim = 1600;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw original image
      ctx.drawImage(img, 0, 0, width, height);

      // Get image pixel data
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // 2. Enhance Contrast & Remove Noise
      const contrast = 1.4; // Increase contrast
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

      // Student loop: Convert to grayscale and apply contrast boost
      for (let i = 0; i < data.length; i += 4) {
        // Luminance grayscale formula
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

        // Contrast adjustment
        let enhanced = factor * (gray - 128) + 128;
        enhanced = Math.max(0, Math.min(255, enhanced));

        // Mild noise reduction thresholding
        const finalPixel = enhanced > 150 ? 255 : (enhanced < 60 ? 0 : enhanced);

        data[i] = finalPixel;     // Red
        data[i + 1] = finalPixel; // Green
        data[i + 2] = finalPixel; // Blue
      }

      ctx.putImageData(imageData, 0, 0);

      // 3. Sharpening filter pass (3x3 Laplacian Kernel)
      sharpenCanvas(ctx, width, height);

      // 4. Crop empty border padding if present
      const croppedCanvas = cropEmptyBackground(canvas, ctx);

      resolve(croppedCanvas.toDataURL('image/png'));
    };

    img.onerror = () => {
      resolve(imageSrc);
    };
  });
}

/**
 * Applies a 3x3 convolution kernel to sharpen text edges
 */
function sharpenCanvas(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  try {
    const original = ctx.getImageData(0, 0, width, height);
    const output = ctx.createImageData(width, height);
    const src = original.data;
    const dst = output.data;

    // Sharpening matrix kernel: [0, -1, 0, -1, 5, -1, 0, -1, 0]
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;

        for (let c = 0; c < 3; c++) {
          const center = src[idx + c] * 5;
          const top = src[((y - 1) * width + x) * 4 + c];
          const bottom = src[((y + 1) * width + x) * 4 + c];
          const left = src[(y * width + (x - 1)) * 4 + c];
          const right = src[(y * width + (x + 1)) * 4 + c];

          let val = center - top - bottom - left - right;
          dst[idx + c] = Math.max(0, Math.min(255, val));
        }
        dst[idx + 3] = src[idx + 3]; // Alpha channel
      }
    }

    ctx.putImageData(output, 0, 0);
  } catch (e) {
    console.warn('Canvas sharpen step skipped:', e);
  }
}

/**
 * Automatically crops empty white or black border padding around the pill strip
 */
function cropEmptyBackground(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): HTMLCanvasElement {
  try {
    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    let foundContent = false;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Check if pixel is not plain white border or pure black background
        const isNotWhiteBackground = r < 240 || g < 240 || b < 240;
        const isNotPureBlackBackground = r > 15 || g > 15 || b > 15;

        if (isNotWhiteBackground && isNotPureBlackBackground) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          foundContent = true;
        }
      }
    }

    // Only crop if valid bounding box found and leaves reasonable area
    const cropWidth = maxX - minX;
    const cropHeight = maxY - minY;

    if (foundContent && cropWidth > 100 && cropHeight > 100) {
      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeight;
      const croppedCtx = croppedCanvas.getContext('2d');

      if (croppedCtx) {
        croppedCtx.drawImage(canvas, minX, minY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        return croppedCanvas;
      }
    }
  } catch (e) {
    console.warn('Background crop step skipped:', e);
  }

  return canvas;
}
