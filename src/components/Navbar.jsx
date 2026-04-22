import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar({ sources }) {
    const [activeSource, setActiveSource] = useState('')
    return (
        <div className="navbar container">
            <nav className="nav nav-news flex flex-wrap items-center justify-center gap-[16px]">
                <Link to="/" className={`nav-link nav-news-item ${activeSource === '' ? 'active' : ''}`} onClick={() => setActiveSource('')}>Home</Link>
                {sources.map((item, index) => (
                    <Link key={index} to={`/source/${item.toLowerCase().replace(/ /g, '-')}`} className={`nav-link nav-news-item ${activeSource === item ? 'active' : ''}`} onClick={() => setActiveSource(item)}>{item}</Link>
                ))}
            </nav>
        </div>
    )
}