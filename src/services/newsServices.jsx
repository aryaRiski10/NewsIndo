export default async function getNews() {
    const res = await fetch('/api/cnn-news')
    const data = await res.json()
    return data.data
}