/** Safari-safe ID generator — works on non-HTTPS origins where crypto.randomUUID() throws. */
export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
