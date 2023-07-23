export function copyToClipboard(content: string) {
    console.log("copyToClipboard, content: ", content)
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}