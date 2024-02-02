export function toISODate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString();
}
