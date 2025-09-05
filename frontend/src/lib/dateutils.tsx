export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString();
}

export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString();
}
