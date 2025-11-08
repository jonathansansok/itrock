type SharePayload = { title?: string; text?: string; url?: string };
type NavigatorWithShare = Navigator & { share?: (data: SharePayload) => Promise<void> };

export async function shareOrCopy(
  url: string,
  title?: string,
  text?: string
): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined") {
      const nav = navigator as NavigatorWithShare;
      if (typeof nav.share === "function") {
        await nav.share({ url, title, text });
        return true;
      }
    }
  } catch {
    // fallback
  }
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}
