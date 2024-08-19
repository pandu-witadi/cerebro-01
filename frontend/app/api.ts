export const detectHost = async (): Promise<string> => {
    const checkUrl = async (url: string): Promise<boolean> => {
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`)
            }
            return true;
        } catch (error) {
            console.error(`Failed to fetch from ${url}:`, error)
            return false
        }
    }

    const protocol = window.location.protocol === "https:" ? "https://" : "http://";
    const localUrl = protocol + process.env.NEXT_PUBLIC_SERVER_URL + "/api/health";
    const isLocalHealthy = await checkUrl(localUrl);
    if (isLocalHealthy) {
        return (protocol + process.env.NEXT_PUBLIC_SERVER_URL);
    }

    throw new Error("Both health checks failed, please check the Verba Server")
}

export const getOllamaHost = async (): Promise<string> => {
    const protocol = window.location.protocol === "https:" ? "https://" : "http://";
    return (protocol + process.env.NEXT_PUBLIC_OLLAMA);
}