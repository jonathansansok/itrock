"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { readFileAsDataURL, resizeDataUrl } from "@/lib/image";

interface ImagePickerProps {
  onImageAction: (dataUrl: string | null) => void; 
  value?: string | null; 
  maxSizeMB?: number; 
  maxW?: number; 
  maxH?: number; 
}

export default function ImagePicker({
  onImageAction,
  value = null,
  maxSizeMB = 2,
  maxW = 1600,
  maxH = 1600,
}: ImagePickerProps) {
  const [preview, setPreview] = useState<string | null>(value);
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (value !== preview) {
      setPreview(value ?? null);
      if (!value && inputRef.current) {

        inputRef.current.value = "";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > maxSizeMB) {
        console.log(`[ImagePicker] archivo > ${maxSizeMB}MB (se intentará comprimir)`);
      }
      const dataUrl = await readFileAsDataURL(file);
      const resized = await resizeDataUrl(dataUrl, maxW, maxH, "image/jpeg", 0.85);
      setPreview(resized);
      onImageAction(resized);
    },
    [maxH, maxSizeMB, maxW, onImageAction]
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
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      className="rounded-xl border border-neutral-800/80 p-3"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="block w-full text-sm file:mr-3 file:rounded-lg file:border file:border-neutral-800 file:bg-neutral-900 file:px-3 file:py-1.5 file:text-sm file:text-neutral-200"
        />
        {preview && (
          <button
            type="button"
            onClick={clear}
            className="rounded-lg border border-neutral-800 px-2 py-1 text-sm hover:bg-neutral-900"
          >
            Quitar
          </button>
        )}
      </div>

      {preview && (
        <div className="mt-3">
          <div className="relative w-full overflow-hidden rounded-xl border border-neutral-800 bg-black"
               style={{ aspectRatio: "1 / 1" }}>
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
        <p className="mt-2 text-xs text-neutral-400">
          Arrastrá y soltá una imagen aquí, o seleccioná un archivo (hasta {maxSizeMB}MB).
        </p>
      )}
    </div>
  );
}
