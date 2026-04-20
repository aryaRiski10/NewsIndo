export default function Article({ title, content, tags, date, index }) {
    const formattedDate = new Date(date).toLocaleDateString('id-ID', {
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
                <h2 className="post-title">{title}</h2>
                <p className="post-excerpt">{content}</p>
                <div className="post-tags flex flex-wrap gap-[6px]">{tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
            </div>
        </article>
    )
}