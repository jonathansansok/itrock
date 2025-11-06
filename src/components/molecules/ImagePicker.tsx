//social-basic\src\components\molecules\ImagePicker.tsx
"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { readFileAsDataURL, resizeDataUrl } from "@/lib/image";

interface ImagePickerProps {
  onImageAction: (dataUrl: string | null) => void; // ← rename para TS71007
  maxSizeMB?: number; // default 2MB
  maxW?: number; // default 1600
  maxH?: number; // default 1600
}

export default function ImagePicker({
  onImageAction,
  maxSizeMB = 2,
  maxW = 1600,
  maxH = 1600,
}: ImagePickerProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > maxSizeMB) {
        console.log(
          `[ImagePicker] archivo > ${maxSizeMB}MB (se intentará comprimir)`
        );
      }
      const dataUrl = await readFileAsDataURL(file);
      const resized = await resizeDataUrl(
        dataUrl,
        maxW,
        maxH,
        "image/jpeg",
        0.85
      );
      setPreview(resized);
      onImageAction(resized);
    },
    [maxH, maxSizeMB, maxW, onImageAction] // ← deps correctas
  );

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) await handleFile(f);
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) await handleFile(f);
  };

  const clear = () => {
    setPreview(null);
    onImageAction(null);
    inputRef.current?.setAttribute("value", "");
    if (inputRef.current) inputRef.current.value = ""; // reset
  };

  return (
    <div
      className="rounded-xl border border-dashed p-3"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="block w-full text-sm"
        />
        {preview && (
          <button
            type="button"
            onClick={clear}
            className="rounded-lg border px-2 py-1 text-sm"
          >
            Quitar
          </button>
        )}
      </div>

      {preview && (
        <div className="mt-3 z-0">
          <div className="relative w-full h-40 sm:h-56 md:h-64 rounded-xl border border-neutral-800 bg-black overflow-hidden">
            <Image
              src={preview}
              alt="preview"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 700px, 800px"
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
      {!preview && (
        <p className="mt-2 text-xs text-gray-500">
          Arrastrá y soltá una imagen aquí, o seleccioná un archivo (hasta{" "}
          {maxSizeMB}MB). Se redimensiona a máx {maxW}×{maxH}.
        </p>
      )}
    </div>
  );
}
