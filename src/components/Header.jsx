export default function Header() {
    return (
        <header className="site-header pt-[3.5rem]">
            <div className="header-eyebrow flex items-center gap-[8px] mb-[1rem]">
                <div className="eyebrow-line"></div>
                <span className="eyebrow-text">Blog &amp; Artikel</span>
            </div>
            <h1 className="site-title">My <em>Simple</em> Posts</h1>
        </header>
    )
}