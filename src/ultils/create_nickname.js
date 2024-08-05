export function cleanString(str) {
    return str.replace(/[^a-zA-Z0-9_]/g, '');
}