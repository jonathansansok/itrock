"use client";

export async function getCroppedResult(
  src: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0,
  mime: "image/jpeg" | "image/png" = "image/jpeg",
  quality = 0.9
): Promise<{ dataUrl: string; width: number; height: number }> {
  const image = await createImage(src);
  const rad = (rotation * Math.PI) / 180;


  const maxSize = Math.max(image.width, image.height);
  const safeArea = Math.ceil(maxSize * Math.SQRT2) * 2;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  canvas.width = safeArea;
  canvas.height = safeArea;

  const cx = safeArea / 2;
  const cy = safeArea / 2;

  ctx.translate(cx, cy);
  ctx.rotate(rad);

  ctx.drawImage(image, -image.width / 2, -image.height / 2);

  const offsetX = cx - image.width / 2;
  const offsetY = cy - image.height / 2;

  const data = ctx.getImageData(
    Math.round(pixelCrop.x + offsetX),
    Math.round(pixelCrop.y + offsetY),
    Math.round(pixelCrop.width),
    Math.round(pixelCrop.height)
  );

  const out = document.createElement("canvas");
  const outCtx = out.getContext("2d");
  out.width = pixelCrop.width;
  out.height = pixelCrop.height;
  outCtx?.putImageData(data, 0, 0);

  const dataUrl = out.toDataURL(mime, quality);
  return { dataUrl, width: out.width, height: out.height };
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = "anonymous";
    img.src = url;
  });
}
