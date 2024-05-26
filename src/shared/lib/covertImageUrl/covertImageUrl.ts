export function covertImageUrl(url: string | undefined): string | undefined {
    if (url && url.includes('/uploads/')) {
        return __API_IMAGE__ + url;
    }

    if (url) {
        return url;
    }

    return undefined;
}
