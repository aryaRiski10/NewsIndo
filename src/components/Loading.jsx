export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center loading-overlay h-screen gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c9a96e]"></div>
            <div className="text">Loading Data...</div>
        </div>
    )
}