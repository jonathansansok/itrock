// src/lib/share.ts
type SharePayload = { title?: string; text?: string; url?: string };
type ShareNavigator = Navigator & { share?: (data: SharePayload) => Promise<void> };

function isMobileUA() {
  if (typeof navigator === "undefined") return false;
  const ua = (navigator.userAgent || "").toLowerCase();
  return /android|iphone|ipad|ipod|windows phone/i.test(ua);
}

export async function shareSmart(
  url: string,
  title?: string,
  text?: string
): Promise<boolean> {
  const message = [text || "", url].filter(Boolean).join(" ");
  const encodedMsg = encodeURIComponent(message);

  // 1️⃣ Intentar Web Share API
  try {
    const nav = navigator as ShareNavigator;
    if (typeof nav.share === "function") {
      await nav.share({ url, title, text });
      return true;
    }
  } catch {
    // sigue a fallback
  }

  // 2️⃣ Detectar móvil o desktop
  const waUrl = isMobileUA()
    ? `https://wa.me/?text=${encodedMsg}`
    : `https://web.whatsapp.com/send?text=${encodedMsg}`;

  // 3️⃣ En desktop forzar apertura fuera del sandbox
  try {
    const w = window.open(waUrl, "_blank", "noopener,noreferrer,width=700,height=800");
    if (w && !w.closed) return true;
  } catch {
    // si bloquea popup, seguimos
  }

  // 4️⃣ Alternativa: abrir mediante redirección (garantizado)
  window.location.href = waUrl;
  return true;
}
