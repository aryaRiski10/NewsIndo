import { useState, useEffect } from "react"
import { useParams, useOutletContext, useLoaderData } from "react-router-dom"
import { getAllNews } from "../services/newsServices"
import Navbar from "../components/Navbar"
import Header from "../components/Header"
import NotFound from "../components/NotFound"
import Article from "../components/Article"
import Pagination from "../components/Pagination"
import Search from "../components/Search"
import Filter from "../components/Filter"

export default function Source() {
    const { allNewsSource } = useOutletContext()
    const { dataNews } = useLoaderData()
    const [search, setSearch] = useState('')
    const [news, setNews] = useState([])
    const [activeCategory, setActiveCategory] = useState('Semua')
    const [currentPage, setCurrentPage] = useState(1)
    const newsPerPage = 10


    const categories = ["Semua", ...new Set(dataNews.map(post => post.category))]

    const handlerSearch = (event) => {
        setSearch(event.target.value)
    }

    const filteredNews = dataNews.filter(post => {
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

    const totalDataSearch = filteredNews.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))

    const totalPages = Math.ceil(filteredNews.length / newsPerPage)
    const indexOfLastNews = currentPage * newsPerPage
    const indexOfFirstNews = indexOfLastNews - newsPerPage
    const currentNews = filteredNews.slice(indexOfFirstNews, indexOfFirstNews + newsPerPage)

    return (
        <div className="source-page container">
            <Header />
            <Search totalDataSearch={totalDataSearch} search={search} handlerSearch={handlerSearch} />
            <Filter categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

            <div className="posts">
                <div className="results-meta">Menampilkan <span>{totalDataSearch.length}</span> dari <span>{totalDataSearch.length}</span> hasil pencarian</div>
                <div className="posts-list">
                    {currentNews.length > 0 ? (
                        currentNews.map((item, index) => (
                            <Article
                                key={item.link}
                                index={indexOfFirstNews + index}
                                title={item.title}
                                content={item.contentSnippet ?? item.description ?? item.content}
                                category={item.category}
                                image={item.image?.small}
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