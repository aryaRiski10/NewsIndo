import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getAllNews } from "../services/newsServices"
import Navbar from "../components/Navbar"
import Header from "../components/Header"
import NotFound from "../components/NotFound"
import Article from "../components/Article"
import Pagination from "../components/Pagination"
import Search from "../components/Search"
import Filter from "../components/Filter"

export default function Source({ endpointSource }) {
    const { sourceName } = useParams()
    const [search, setSearch] = useState('')
    const [news, setNews] = useState([])
    const [activeCategory, setActiveCategory] = useState('Semua')
    const [currentPage, setCurrentPage] = useState(1)
    const newsPerPage = 10

    const categories = ["Semua", ...new Set(news.map(post => post.category))]

    const handlerSearch = (event) => {
        setSearch(event.target.value)
    }

    useEffect(() => {
        const fetchNewsBySource = async () => {
            try {
                const bySource = endpointSource.find((url) => url.includes(sourceName))
                if (!bySource) return
                const newsBySource = await getAllNews(bySource)
                const dataNews = newsBySource.map((news, index) => {
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
                setNews(dataNews)
            } catch (error) {
                console.error('Error fetching news by source:', error);
            }
        }
        fetchNewsBySource();
    }, [sourceName, endpointSource])

    const totalDataSearch = news.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))

    const totalPages = Math.ceil(totalDataSearch.length / newsPerPage)
    const indexOfLastNews = currentPage * newsPerPage
    const indexOfFirstNews = indexOfLastNews - newsPerPage
    const currentNews = totalDataSearch.slice(indexOfFirstNews, indexOfFirstNews + newsPerPage)

    return (
        <div className="source-page container">
            <Header />
            <Search totalDataSearch={totalDataSearch} search={search} handlerSearch={handlerSearch} />
            <Filter categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

            <div className="posts">
                <div className="results-meta">Menampilkan <span>{totalDataSearch.length}</span> dari <span>{news.length}</span> hasil pencarian</div>
                <div className="posts-list">
                    {currentNews.length > 0 ? (
                        currentNews.map((item, index) => (
                            <Article
                                key={item.link}
                                index={indexOfFirstNews + index}
                                title={item.title}
                                content={item.contentSnippet ?? item.description ?? item.content}
                                category={item.category}
                                isoDate={item.isoDate}
                                link={item.link} />
                        ))
                    ) : <NotFound />}
                </div>
                <div className="pagination-post">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            </div >
        </div>
    )
}