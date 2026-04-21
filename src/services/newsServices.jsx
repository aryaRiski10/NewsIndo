export async function getSource() {
    try {
        const res = await fetch('https://berita-indo-api.vercel.app')
        const data = await res.json()
        return data.listApi
    } catch (error) {
        console.error('Error fetching data:', error);
        return {}
    }

}

export async function getAllNews(url) {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data.data
    } catch (error) {
        console.error('Error fetching news:', error);
        return []
    }
}