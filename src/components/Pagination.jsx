export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="pagination items-center">
            <button className={`prev pg-btn ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                {/* <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg> */}
                Previous
            </button>
            {/* {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    className={`number pg-btn ${currentPage === index + 1 ? 'active' : ''}`}
                >
                    {index + 1}
                </button>
            ))} */}
            <span>{currentPage} of {totalPages}</span>

            <button className={`next pg-btn ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                {/* <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg> */}
                Next
            </button>
        </div >
    )
}