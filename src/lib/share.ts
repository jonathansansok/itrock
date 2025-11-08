type SharePayload = { title?: string; text?: string; url?: string };
type ShareNavigator = Navigator & { share?: (data: SharePayload) => Promise<void> };

function isMobileUA() {
  if (typeof navigator === "undefined") return false;
  const ua =
    typeof (navigator as Navigator & { vendor?: string }).vendor === "string"
      ? `${navigator.userAgent} ${(navigator as Navigator & { vendor?: string }).vendor}`
      : navigator.userAgent;
  return /android|iphone|ipad|ipod|windows phone/i.test(ua);
}

function openPopup(url: string) {
  // Intentá abrir en una ventana nueva; si el bloqueador lo impide, cae a la pestaña actual
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) window.location.href = url;
  return true;
}

export async function shareSmart(url: string, title?: string, text?: string): Promise<boolean> {
  // 1) Web Share API (si existe)
  try {
    if (typeof navigator !== "undefined") {
      const nav = navigator as ShareNavigator;
      if (typeof nav.share === "function") {
        await nav.share({ url, title, text });
        return true;
      }
    }
  } catch {
    // seguimos con fallbacks
  }

  const message = [text || "", url].filter(Boolean).join(" ").trim();
  const waEncoded = encodeURIComponent(message);

  // 2) Móvil → WhatsApp app
  if (isMobileUA()) {
    return openPopup(`https://wa.me/?text=${waEncoded}`);
  }

  // 3) Desktop → WhatsApp Web
  // Nota: web.whatsapp.com funciona bien en desktop moderno con sesión iniciada
  if (typeof window !== "undefined") {
    return openPopup(`https://web.whatsapp.com/send?text=${waEncoded}`);
  }

  // 4) Fallback: copiar al portapapeles + toast
  try {
    await navigator.clipboard.writeText(url);
    const Swal = (await import("sweetalert2")).default;
    await Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Enlace copiado al portapapeles",
      showConfirmButton: false,
      timer: 1800,
      background: "#0a0a0a",
      color: "#e5e5e5",
    });
    return true;
  } catch {
    return false;
  }
}
