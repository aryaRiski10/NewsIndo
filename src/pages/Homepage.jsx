import { useState } from 'react'

import postsData from '../data/posts.json'
import Header from '../components/Header'
import Article from "../components/Article"
import NotFound from '../components/NotFound'
import Search from '../components/Search'
import Filter from '../components/Filter'
import Footer from '../components/Footer'

export default function Homepage() {
    const [posts, setPosts] = useState(postsData)
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('Semua')

    const categories = ["Semua", ...new Set(posts.map(post => post.category))]

    const handlerSearch = (event) => {
        setSearch(event.target.value)
    }
    const filteredPosts = posts.filter(post => {
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

    const totalDataSearch = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <Header />
            <Search totalDataSearch={totalDataSearch} search={search} handlerSearch={handlerSearch} />
            <Filter categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="posts">
                <div className="results-meta">Menampilkan <span>{filteredPosts.length}</span> dari <span>{totalDataSearch.length}</span> hasil pencarian</div>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                        <Article index={index} key={post.id} title={post.title} content={post.content} tags={post.tags} date={post.created_at} />
                    ))
                ) : (
                    <NotFound />
                )}
            </div>
            <Footer />

        </>
    )
}