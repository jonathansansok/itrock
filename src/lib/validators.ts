 export const isValidEmail = (v: string) =>
   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

 export const isStrongPassword = (v: string) =>
  /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);