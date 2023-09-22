export function getLabBaseUrl(viteBaseUrl: string, userId: string, instanceName: string,) {
    return `${import.meta.env.VITE_BASE_URL}/lab/${userId}/${instanceName}`
}