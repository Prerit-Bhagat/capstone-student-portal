export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function formatName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
