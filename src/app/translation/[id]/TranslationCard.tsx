import React from 'react'
import { ThumbsDown, ThumbsUp } from 'react-feather'
import { mdiDiamond } from '@mdi/js'
import Icon from '@mdi/react';

const TranslationCard = () => {
    return (
        <div className='translation px-4 flex flex-col gap-3 pb-3 pt-3 rounded border border-black/10 '>
            <span className='z-0 cursor-pointer h-fit whitespace-pre-wrap text-2xl/8 text-tertiary'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam soluta architecto velit nisi ratione. In ipsa obcaecati expedita itaque dolorum?
            </span>
            <div className="flex justify-between items-center">
                <div></div>

                <div className="flex gap-3">
                    <button className="flex btn btn-sm rounded-xl btn-ghost gap-2 text-tertiary font-medium items-center text-[10px]">
                        <ThumbsUp size={14} />
                        16
                    </button>
                    <button className="flex btn btn-sm rounded-xl btn-ghost gap-2 text-tertiary font-medium items-center text-[10px]">
                        <ThumbsDown size={14} />
                        16
                    </button>

                    <div className="flex gap-2 text-tertiary font-semibold items-center text-lg">
                        <Icon path={mdiDiamond} size={1} />
                        16
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info">
                                <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-primary"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div tabIndex={0} className="card compact dropdown-content z-[1] border border-black shadow bg-white rounded-box w-64">
                                <div tabIndex={0} className="card-body">
                                    <h2 className="card-title">You needed more info?</h2>
                                    <p>Here is a description!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TranslationCard