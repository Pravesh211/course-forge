import { Gift } from 'lucide-react';
import React from 'react'

function ChapterTopicList({course}) {
    const courseLayout = course?.courseJson?.course;

  return (
    <div>
      <h2 className='font-bold text-3xl mt-10 '>Chapters & Topics</h2>
      <div className='flex flex-col items-center justify-center mt-10'>
        {courseLayout?.chapters.map((chapter, index) => (
            <div key={index} className='flex flex-col items-center'>
                <div className='p-4 border shadow-md rounded-xl bg-primary text-white'>
                    <h2 className='text-center'>Chapter {index +1 }</h2>
                    <h2 className='font-bold text-lg text-center'>{chapter.chapterName}</h2>
                    <h2 className='text-xs flex justify-between gap-16'><span>Duration: {chapter?.duration}</span>
                    <span>No. of Chapters: {chapter?.topics?.length}</span>
                    </h2>
                </div> 
                <div>
                    {chapter?.topics.map((topic, index) => (
                      <div className='flex flex-col items-center' key = {index}>
                          <div className='h-10 bg-gray-300 w-1'></div>
                          <div className='flex items-center gap-5'>
                              <span className={`${index % 2 == 0 && 'text-transparent'} max-w-xs`}>{topic}</span>
                              <h2 className='text-center rounded-full bg-gray-300 px-6 text-gray-500 p-4'>{index + 1}</h2>
                              <span className={`${index % 2 != 0 && 'text-transparent'} max-w-xs`}>{topic}</span>
                          </div>
                          {index == chapter?.topics?.length - 1 && <div className='h-10 w-1 bg-gray-300 mx-auto text-white '></div>}
                          {index == chapter?.topics?.length - 1 && <div className='flex items-center justify-center  '>
                            <div className="text-center rounded-full bg-gray-300 p-4 text-gray-600 ">
                              <Gift/>
                              </div>
                            </div>
                            }
                          {index == chapter?.topics?.length -1 && <div className='h-10 w-1 auto-mix bg-gray-300 text-white'></div>}
                      </div>
                    ))}
                </div>
            </div>
        ))}
        <div className='p-4 border-2 border-yellow-400 shadow-lg rounded-xl bg-emerald-700 text-yellow-300
                transition transform duration-300 ease-in-out
                hover:scale-105 hover:shadow-2xl hover:brightness-110 cursor-pointer'>
          <h2>FINISH</h2>
        </div>
      </div>
    </div>
  )
}

export default ChapterTopicList
