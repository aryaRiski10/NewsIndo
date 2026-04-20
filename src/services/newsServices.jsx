export default async function getNews() {
    /* Local development
    const res = await fetch('/api/cnn-news')
    */
    const res = await fetch('https://berita-indo-api-next.vercel.app/api/cnn-news')
    const data = await res.json()
    return data.data
}