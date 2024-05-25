'use client';
import cx from 'classnames'
import { EfikTextArea, EnglishTextArea } from '@/components/Common/Language';
import useLanguageStore from '@/store/language';
import CorpusText from '@/types/corpustext';
import Language from '@/types/language';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { Copy, RefreshCw, Share, X } from 'react-feather'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Editing = "Corpus" | "Translation"

interface Props {
    corpusText: CorpusText
    languages: Language[]
}

const schema = z.object({
    corpus: z.string(),
    translation: z.string(),
})

type FormData = z.infer<typeof schema>

const Inputs = ({ corpusText }: Props) => {
    const navigate = useRouter()
    const [loading, setLoading] = useState(false)
    const isEditing = useLanguageStore(s => s.isEditing)
    const setIsEditing = useLanguageStore(s => s.setIsEditing)
    const setCorpus =  useLanguageStore(s => s.setCorpus)
    const corpus = useLanguageStore(s => s.corpus)
    const translation = useLanguageStore(s => s.translation)
    const setTranslation = useLanguageStore(s => s.setTranslation)
    const languageFrom = useLanguageStore(s => s.languageFrom)
    const languageTo = useLanguageStore(s => s.languageTo)

    const { handleSubmit, setValue } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    useEffect(() => {
      setTranslation(corpusText.text)
    
      return () => {
      }
    }, [])

   const saveTranslation = async () => {
       toast.loading("Loading...", {
           id: 'loading',
           duration: 2000
       })
       setLoading(true)

       try {
           const res = await axios.post(
               process.env.NEXT_PUBLIC_SERVER_URI + "/translation", {
               text: translation,
                translator_id: 1,
                corpus: corpusText.id,
                language_id: languageTo
           })
           toast.remove('loading')
           toast.success("Saved")
           setLoading(false)
           navigate.push("/translation/" + res.data.id)
       } catch (error) {
           toast.remove('loading')
           toast.error("Error")
           setLoading(false)
       }
   }

    const saveCorpus = async () => {
        toast.loading("Loading...", {
            id: 'loading',
            duration: 2000
        })
        setLoading(true)

        try {
            const res = await axios.post(
                process.env.NEXT_PUBLIC_SERVER_URI + "/corpus", {
                text: corpus,
                owner_id: 1,
                language_from_id: languageFrom,
                language_to_id: languageTo
            })
            toast.remove('loading')
            toast.success("Saved")
            setLoading(false)
            navigate.push("/translation/" + res.data.id)
        } catch (error) {
            toast.remove('loading')
            toast.error("Error")
            setLoading(false)
        }
    }
    
    return (
        <div className='flex-1 gap-2 flex flex-row flex-nowrap'>
            <form onSubmit={handleSubmit(saveTranslation)} className="border grow min-h-[166px] flex-col justify-between relative flex border-black/[0.12] rounded-lg">
                {!!corpus.length && <button className='btn absolute right-2 top-2 w-10 h-10 rounded-full btn-ghost btn-circle !min-h-10'>
                    <X width={24} height={24} color='rgb(95,99,104)' />
                </button>}

                <div className="flex w-full pt-3 pr-[52px] pl-4">
                    {languageTo === 1 ?
                        <EfikTextArea value={corpus} setValue={(str) => {
                            setCorpus(str)
                            setValue('corpus', str)
                        }} id='corpus' /> :
                        <EnglishTextArea value={corpus} setValue={(str) => {
                            setCorpus(str)
                            setValue('corpus', str)
                        }} id='corpus' />}
                    {/* <textarea value={corpus} onChange={e => setCorpus(e.target.value)} className='min-h-16 text-2xl outline-none border-none bg-transparent w-full text-[rgb(60,64,67)] whitespace-pre-wrap resize-none' aria-label='corpus' aria-autocomplete='list'
                        aria-expanded='false' autoComplete='off' autoCorrect='off' role='combobox' rows={1} spellCheck={false} name="corpus" id="corpus"></textarea> */}
                </div>
                <div className="flex px-4 items-center justify-between">
                    {/* {isEditingCorpus ?
                        <button className='btn my-2 btn-ghost text-sm uppercase'>
                            Save Translation
                        </button> :
                        <button className='btn my-2 btn-ghost text-sm uppercase'>
                            Edit
                        </button>
                    } */}
                    
                        <button className='btn my-2 btn-ghost text-primary text-sm uppercase'>
                            Save Translation
                        </button> 
                    <span className='text-[rgb(60,64,67)] text-xs/[27px]'>
                        {corpus.length} / 300
                    </span>
                </div>
            </form>
            <form onSubmit={handleSubmit(saveCorpus)} className="grow flex-col justify-between relative flex bg-[#f5f5f5] rounded-lg">
                <button className='btn absolute right-2 top-2 w-10 h-10 rounded-full btn-ghost btn-circle !min-h-10'>
                    <Copy width={24} height={24} color='rgb(95,99,104)' />
                </button>

                <div className="flex pt-3 pr-[52px] pl-4">
                    {languageFrom === 1 ? 
                    <EfikTextArea disabled={!isEditing} value={translation} setValue={(str) => {
                        setTranslation(str)
                        setValue('translation', str)
                        }} id='translation' /> : 
                        <EnglishTextArea disabled={!isEditing} value={translation} setValue={(str) => {
                            setTranslation(str)
                            setValue('translation', str)
                        }} id='translation' />}
                    
                </div>
                <div className="flex items-center px-4 justify-between">
                    <div className="flex gap-2 items-center">
                        {isEditing &&
                        <button className='btn h-10 w-10 my-2 p-2 !min-h-10 rounded-full btn-ghost btn-circle'>
                            <RefreshCw width={16} height={16} color='rgb(95,99,104)' />
                        </button> }
                         <span className='text-[rgb(60,64,67)] text-xs/[27px]'>
                            {translation.length} / 300
                        </span>
                    </div>
                    
                    <div className="flex items-center">
                        <button className='btn my-2 h-10 w-10 p-2 !min-h-10 rounded-full btn-ghost btn-circle'>
                            <Share color='rgb(95,99,104)' />
                        </button>
                        {isEditing &&
                            <button disabled={corpusText.text === translation} className={cx('btn my-2 btn-ghost text-sm uppercase text-primary', corpusText.text === translation && ' !text-black/50')}>
                                Make Corpus
                            </button> }
                            
                        {!isEditing &&
                            <button onClick={()=>setIsEditing(true)} className='btn my-2 btn-ghost text-sm uppercase'>
                                Edit
                            </button>
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Inputs