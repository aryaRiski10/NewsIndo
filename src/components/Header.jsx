import { useParams } from "react-router-dom"

export default function Header() {
    const { sourceName } = useParams()

    const title = (sourceName ? sourceName.toLocaleUpperCase().replace(/-/g, ' ') : 'Berita Terkini')

    return (
        <header className="site-header pt-[3.5rem]">
            <div className="header-eyebrow flex items-center gap-[8px] mb-[1rem]">
                <div className="eyebrow-line"></div>
                <span className="eyebrow-text">{title}</span>
            </div>
            <h1 className="site-title"><em>News</em>Indo</h1>
        </header>
    )
}