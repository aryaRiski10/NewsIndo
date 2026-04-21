import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { getSource, getAllNews } from './services/newsServices'
import Homepage from './pages/Homepage'
import Source from './pages/Source'
function App() {

  const [sources, setSources] = useState([])
  const [allUrls, setAllUrls] = useState([])
  const [allNewsSource, setAllNewsSource] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true)
      try {
        const dataSources = await getSource();
        const topSources = Object.fromEntries(Object.entries(dataSources).slice(0, 4))
        setSources(topSources);

        const allUrls = Object.entries(topSources).map(([key, value]) => value.all).flat()
        setAllUrls(allUrls);
        const getNews = await Promise.all(
          allUrls.map((url) => getAllNews(url))
        )
        const dataNews = getNews.flat().map((news, index) => {
          let category = "Lainnya"
          try {
            if (news.link.includes('cnn') || (news.link.includes('cnbc'))) {
              category = new URL(news.link).pathname.split('/')[1]
            } else if (news.link.includes('tempo')) {
              category = new URL(news.link).hostname.split('.')[0]
            } else if (news.link.includes('republika')) {
              category = news.categories ?? "Lainnya"
            } else {
              category = "Lainnya"
            }
          } catch (error) {
            console.error('Error parsing URL:', error);
          }
          return {
            category,
            ...news
          }
        })
        setAllNewsSource(dataNews)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false)
      }
    };
    fetchAllData();
  }, [])

  if (loading) return <div className="loading">Loading...</div>

  const listSources = Object.entries(sources).map(([key, value]) => key)

  return (
    <>
      <Navbar sources={listSources} />
      <Routes>
        <Route path="/" element={<Homepage allNewsSource={allNewsSource} />} />
        <Route path="/source/:sourceName" element={<Source endpointSource={allUrls} />} />
      </Routes>
    </>
  )
}

export default App
