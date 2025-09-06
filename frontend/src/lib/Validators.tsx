export function validateEmail(email: string): boolean {
  return email.includes("@");
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}
