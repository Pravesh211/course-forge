"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AddNewCourseDialog from './AddNewCourseDialog';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import CourseCard from './CourseCard';
import { Skeleton } from '@/components/ui/skeleton';

function CourseList() {

    const [courseList, setCourseList]= useState([]);
    const {user} = useUser();
    useEffect(()=>{
      user && GetCourseList();
    }, [user] )

    const GetCourseList= async ()=>{
      const result = await axios.get('/api/courses');
      console.log(result.data);
      setCourseList(result.data);
    }

  return (
    <div className='mt-10'>
        <h2 className='font-bold  text-2xl'>
            Course List :
        </h2>

        {courseList?.length==0? 
          <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-secondary'>
            <Image src={'/online-education.png'} alt='edu' width={80} height={80} />
            <h2 className='my-2 text-xl font-bold'>Look's like you haven't created any course yet</h2>
              <AddNewCourseDialog>
                  <Button className={'inline-flex items-center max-w-sm px-4 py-2 hover:bg-indigo-700 hover:shadow-xl cursor-pointer transition'}>Create your first course</Button>
              </AddNewCourseDialog>
            
        </div>:<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                {courseList.length>0?courseList?.map((course,index)=>(
                  <CourseCard course={course} key={index} />
                )):
                [0,1,2,3].map((item,index)=>(
                    <Skeleton key={index} className='w-full h-[240px]'/>
                ))
                }
            </div> }
    </div>
  )
}

export default CourseList
