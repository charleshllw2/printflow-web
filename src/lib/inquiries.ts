export const MAX_ARTWORK_BYTES = 2 * 1024 * 1024;
export interface Inquiry {
  kind: 'quote' | 'contact' | 'artwork';
  requestId: string;
  contactName: string;
  contactEmail: string;
  website?: string;
  [key: string]: string | undefined;
}
async function encodeArtwork(file: File) {
  if (file.size > MAX_ARTWORK_BYTES || file.size === 0) throw new Error('Please choose artwork up to 2 MB, or email your larger file to hello@printflowstudio.com.');
  if (!['image/png', 'image/jpeg', 'application/pdf', 'image/svg+xml'].includes(file.type)) throw new Error('Please choose a PNG, JPG, PDF, or SVG artwork file.');
  const content = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Your file could not be read. Please select it again.'));
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return { name: file.name, type: file.type, content };
}
export async function submitInquiry(inquiry: Inquiry, file?: File | null) {
  const attachment = file ? await encodeArtwork(file) : undefined;
  const response = await fetch('/api/submit-inquiry', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...inquiry, attachment }),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.success !== true) throw new Error(result?.error || 'Your message could not be sent. Please try again or email hello@printflowstudio.com.');
  return result as { success: true; reference: string };
}
