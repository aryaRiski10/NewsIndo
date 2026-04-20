export default function NotFound() {
    return (
        <div className="empty-state" id="emptyState">
            <div className="empty-icon">✦</div>
            <p className="empty-title">Artikel tidak ditemukan</p>
            <p className="empty-sub">Coba kata kunci yang berbeda atau hapus filter.</p>
        </div>
    )
}