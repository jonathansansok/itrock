export function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export function isStrongPassword(v: string) {
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);
}