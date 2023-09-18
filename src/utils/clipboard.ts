export function copyToClipboard(content: string) {
    console.log("copyToClipboard, content: ", content)
    navigator.clipboard.writeText(content);
}