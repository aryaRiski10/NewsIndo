export default function Filter({ categories, activeCategory, setActiveCategory }) {
    const buttonFilter = () => {
        return (
            categories.map((category, index) => (
                <button key={index} className={`category-btn ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)}>{category}</button>
            ))
        )
    }
    return (
        <div className="tag-filters flex flex-wrap items-center gap-[8px]">
            <span className="filter-label">Filter:</span>
            {buttonFilter()}
        </div>
    )
}