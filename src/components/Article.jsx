export default function Article({ title, contentSnippet, isoDate, category, link, index }) {
    const formattedDate = new Date(isoDate).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <article className="post-item">
            <div className="post-body relative">
                <div className="post-meta-top flex items-center gap-[12px] mb-[0.6rem]">
                    <span className="post-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="post-category-dot"></span>
                    <span className="post-date-inline">{formattedDate}</span>
                </div>
                <a href={link} className="post-title">{title}</a>
                <p className="post-excerpt">{contentSnippet}</p>
                <div className="post-tags flex flex-wrap gap-[6px]"><span key={category} className="tag">{category}</span></div>
            </div>
        </article>
    )
}