'use client';
import React, { useState } from 'react'

type SortType = "Popular" | "Recent" | "Easiest" | "Hardest";

const TranslationFilters = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState<SortType>();
    return (
        <div className="flew-row mt-24 max-w-2xl mx-auto flex h-[68px] items-center justify-between ">
            <h2 className='text-3xl'>Translations</h2>

            <div className="flex items-center gap-2">
                <label className="input input-bordered flex h-9 items-center gap-2 rounded border-[rgb(218,220,224)] bg-transparent !outline-none">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="grow text-primary placeholder:text-primary/70"
                        placeholder="Search"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>

                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-outline m-1 h-9 min-h-9 rounded border-[rgb(218,220,224)] font-normal text-[rgb(25,103,210)] hover:bg-primary/10"
                    >
                        {sort ?? "Sort By"}
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content z-[1]  w-52 rounded border border-[rgb(218,220,224)] bg-white/65 p-2 text-tertiary shadow"
                    >
                        <li onClick={() => setSort("Popular")}>
                            <a>Popular</a>
                        </li>
                        <li onClick={() => setSort("Recent")}>
                            <a>Recent</a>
                        </li>
                        <li onClick={() => setSort("Easiest")}>
                            <a>Easiest</a>
                        </li>
                        <li onClick={() => setSort("Hardest")}>
                            <a>Hardest</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TranslationFilters