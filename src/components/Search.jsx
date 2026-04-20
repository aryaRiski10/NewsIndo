import { useState } from 'react'
import Filter from './Filter'
export default function Search({ search, handlerSearch, totalDataSearch }) {

    return (
        <div className="search-container flex flex-col py-[1.5rem] gap-2">
            <div className="search relative flex items-center">
                <span className="search-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
                </span>
                <input type="text" placeholder="Cari Artikel..." className="search-input block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" onChange={handlerSearch} />
            </div>
            <small className="text-search">Ditemukan {totalDataSearch.length} data dengan pencarian kata "{search}"</small>
        </div>
    )
}