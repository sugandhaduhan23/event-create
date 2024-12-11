export function sanitize(str: string): string {
    str = str.replace(/[^a-z0-9áéíóúñü .@,_-]/gi, "");
    str = str.replace(/\s+/g, " ");
    return str
}