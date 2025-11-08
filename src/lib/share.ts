// src/lib/share.ts
type SharePayload = { title?: string; text?: string; url?: string };
type ShareNavigator = Navigator & { share?: (data: SharePayload) => Promise<void> };

function isMobileUA() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || navigator.vendor;
  return /android|iphone|ipad|ipod|windows phone/i.test(ua);
}

export async function shareSmart(
  url: string,
  title?: string,
  text?: string
): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined") {
      const nav = navigator as ShareNavigator;
      if (typeof nav.share === "function") {
        await nav.share({ url, title, text });
        return true;
      }
    }
  } catch {
    // fallback
  }

  // WhatsApp en móviles
  if (isMobileUA()) {
    const msg = encodeURIComponent([text || "", url].filter(Boolean).join(" "));
    const wa = `https://wa.me/?text=${msg}`;
    window.open(wa, "_blank", "noopener,noreferrer");
    return true;
  }

  // Fallback: copiar al portapapeles
  try {
    await navigator.clipboard.writeText(url);
    alert("Enlace copiado al portapapeles");
    return true;
  } catch {
    return false;
  }
}
