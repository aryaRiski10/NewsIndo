import { Link } from 'react-router-dom'

export default function Navbar({ sources }) {
    return (
        <div className="navbar container">
            <nav className="nav nav-news flex flex-wrap items-center justify-center gap-[16px]">
                <Link to="/" className="nav-link nav-news-item">Home</Link>
                {sources.map((item, index) => (
                    <Link key={index} to={`/source/${item.toLowerCase().replace(/ /g, '-')}`} className="nav-link nav-news-item">{item}</Link>
                ))}
            </nav>
        </div>
    )
}