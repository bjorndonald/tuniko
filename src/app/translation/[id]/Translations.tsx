'use client';
import React, { useState } from 'react'
import TranslationCard from './TranslationCard'
import { Pagination } from '@/components/Common/Pagination';

const Translations = () => {
    const [page, setPage] = useState(1)
    return (
        <div className='flex flex-col gap-6 max-w-2xl mx-auto'>
            <TranslationCard />
            <TranslationCard />
            <TranslationCard />
            <TranslationCard />
            <TranslationCard />
            <TranslationCard />
            <Pagination pageSize={4} currentPage={page} onPageChange={setPage} totalCount={40} />
        </div>
    )
}

export default Translations