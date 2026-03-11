/**
 * Formspree submission helper.
 * Form ID can be set in .env as VITE_FORMSPREE_FORM_ID (e.g. xaqpegvb).
 */
const FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID ?? "xaqpegvb";
const ENDPOINT = `https://formspree.io/f/${FORM_ID}`;

export type FormspreeResult = { ok: true } | { ok: false; error: string };

export async function submitToFormspree(payload: Record<string, string>): Promise<FormspreeResult> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: text || `Request failed (${res.status})` };
    }
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Network error";
    return { ok: false, error: message };
  }
}
