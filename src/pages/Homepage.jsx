import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { getSource, getAllNews } from '../services/newsServices'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Article from "../components/Article"
import NotFound from '../components/NotFound'
import Search from '../components/Search'
import Filter from '../components/Filter'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'

export default function Homepage() {
    const { allNewsSource } = useOutletContext()
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('Semua')
    const [currentPage, setCurrentPage] = useState(1)
    const newsPerPage = 10

    const categories = ["Semua", ...new Set(allNewsSource.map(post => post.category))]

    const handlerSearch = (event) => {
        setSearch(event.target.value)
    }
    const filteredNews = allNewsSource.filter(post => {
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
        <>
            <Header />
            <Search totalDataSearch={totalDataSearch} search={search} handlerSearch={handlerSearch} />
            <Filter categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="posts">
                <div className="results-meta">Menampilkan <span>{filteredNews.length}</span> dari <span>{filteredNews.length}</span> hasil pencarian</div>
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
            <Footer />

        </>
    )
}