import { useState, useEffect } from 'react'

import getNews from '../services/newsServices'
import postsData from '../data/posts.json'
import Header from '../components/Header'
import Article from "../components/Article"
import NotFound from '../components/NotFound'
import Search from '../components/Search'
import Filter from '../components/Filter'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'

export default function Homepage() {
    const [news, setNews] = useState([])
    const [posts, setPosts] = useState(postsData)
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('Semua')
    const [currentPage, setCurrentPage] = useState(1)
    const newsPerPage = 10

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNews();
                const formattedData = data.map((item, index) => {
                    let category = "Lainnya"
                    let id = ""
                    try {
                        category = new URL(item.link).pathname.split('/')[1]
                        id = new URL(item.link).pathname.split('/')[2]
                    } catch (error) {
                        console.error('Error parsing URL:', error);
                    }

                    return {
                        id,
                        category,
                        ...item
                    }
                })
                setNews(formattedData);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [])

    const categories = ["Semua", ...new Set(news.map(post => post.category))]

    const handlerSearch = (event) => {
        setSearch(event.target.value)
    }
    const filteredNews = news.filter(post => {
        if (activeCategory != 'Semua' && search) {
            return post.category === activeCategory && post.title.toLowerCase().includes(search.toLowerCase())
        } else if (activeCategory != 'Semua') {
            return post.category === activeCategory
        } else if (search) {
            return post.title.toLowerCase().includes(search.toLowerCase())
        } else {
            return true
        }
    })
    const totalDataSearch = news.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))

    const totalPages = Math.ceil(filteredNews.length / newsPerPage)
    const indexOfLastNews = currentPage * newsPerPage
    const indexOfFirstNews = indexOfLastNews - newsPerPage
    const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews)

    return (
        <>

            <Header />
            <Search totalDataSearch={totalDataSearch} search={search} handlerSearch={handlerSearch} />
            <Filter categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="posts">
                <div className="results-meta">Menampilkan <span>{filteredNews.length}</span> dari <span>{totalDataSearch.length}</span> hasil pencarian</div>
                <div className="posts-list">
                    {currentNews.length > 0 ? (
                        currentNews.map((item, index) => (
                            <Article key={item.id} index={index} title={item.title} contentSnippet={item.contentSnippet} category={item.category} isoDate={item.isoDate} link={item.link} />
                        ))
                    ) : <NotFound />}
                </div>
                <div className="pagination-post">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            </div >
            <Footer />

        </>
    )
}