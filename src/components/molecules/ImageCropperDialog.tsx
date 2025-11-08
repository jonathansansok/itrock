"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedResult } from "@/lib/crop";
import Button from "@/components/atoms/Button";

type Props = {
  open: boolean;
  src: string | null;
  onCloseAction: () => void;
  onConfirmAction: (res: { dataUrl: string; width: number; height: number }) => void;
  aspect?: number;
  circular?: boolean;
};

export default function ImageCropperDialog({
  open, src, onCloseAction, onConfirmAction, aspect = 1, circular,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pixels, setPixels] = useState<Area | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const onCropComplete = useCallback((_a: Area, p: Area) => setPixels(p), []);
  if (!open || !src || !mounted) return null;

  const confirm = async () => {
    if (!pixels) return;
    setSaving(true);
    try {
      const res = await getCroppedResult(src, pixels, rotation, "image/jpeg", 0.92);
      onConfirmAction(res);
    } finally {
      setSaving(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-9999 grid place-items-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCloseAction} />
      <div className="relative w-[min(92vw,740px)] rounded-2xl bg-neutral-950 border border-neutral-800 p-4 shadow-2xl">
        <div className="relative rounded-xl overflow-hidden bg-black" style={{ aspectRatio: `${aspect}` }}>
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            aspect={aspect}
            cropShape={circular ? "round" : "rect"}
            restrictPosition
            showGrid={false}
          />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="flex items-center gap-3 text-sm text-neutral-300">
            Zoom
            <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e)=>setZoom(Number(e.target.value))} className="w-full accent-white" />
          </label>
          <label className="flex items-center gap-3 text-sm text-neutral-300">
            Rotación
            <input type="range" min={-45} max={45} step={1} value={rotation} onChange={(e)=>setRotation(Number(e.target.value))} className="w-full accent-white" />
          </label>
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={onCloseAction}>Cancelar</Button>
            <Button onClick={confirm} loading={saving}>Usar foto</Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
