import Swal from "sweetalert2";

type SharePayload = { title?: string; text?: string; url?: string };
type ShareNavigator = Navigator & { share?: (data: SharePayload) => Promise<void> };

function isMobileUA() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent.toLowerCase();
  return /android|iphone|ipad|ipod|windows phone/i.test(ua);
}

export async function shareSmart(url: string, title?: string, text?: string): Promise<boolean> {
  const message = [text || "", url].filter(Boolean).join(" ").trim();
  const waEncoded = encodeURIComponent(message);
  try {
    const nav = navigator as ShareNavigator;
    if (nav && typeof nav.share === "function") {
      await nav.share({ url, title, text });
      return true;
    }
  } catch {
  }

  if (isMobileUA()) {
    window.location.href = `https://wa.me/?text=${waEncoded}`;
    return true;
  }

  try {
    await navigator.clipboard.writeText(url);
    await Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title: "Enlace copiado 📋",
      text: "Pegalo en WhatsApp, Telegram o donde quieras compartirlo.",
      showConfirmButton: false,
      timer: 2200,
      background: "#0a0a0a",
      color: "#e5e5e5",
    });
    return true;
  } catch {
    alert(`Copiá este enlace:\n${url}`);
    return false;
  }
}
