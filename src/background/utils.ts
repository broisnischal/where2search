
export function getSearchURL(baseURL: string, text: string): string {
    return baseURL + encodeURIComponent(text);
}