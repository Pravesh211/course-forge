import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import axios from 'axios';
import { CheckCircle, Loader2Icon, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useState } from 'react';
import YouTube from 'react-youtube';
import { toast } from 'sonner';

function ChapterContent({ courseInfo, refreshData }) {
  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);
  const {courseId} = useParams();
  const [loading, setLoading] = useState(false);

  if (!courseInfo) {
    return <div className="p-10 text-xl">Loading course content...</div>;
  }

  const { course, enrollCourse } = courseInfo;
  const courseContent = courseInfo?.courses?.courseContent;
  const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
  const chapterName = courseContent?.[selectedChapterIndex]?.courseData?.chapterName;
  const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics;
  let completedChapter = enrollCourse?.completedChapter ?? [];
  

  const markChapterCompleted= async()=>{
        setLoading(true)
        completedChapter?.push(selectedChapterIndex);
        const result = await axios.put('/api/enroll-course',{
          courseId: courseId, 
          completedChapter:completedChapter
        });

        console.log(result);
        refreshData();   
        toast.success('Chapter Marked Completed !!')
        setLoading(false);
  }

  const markChapterInCompleted= async()=>{
        setLoading(true)
        const completedChap = completedChapter.filter(item=>item!=selectedChapterIndex)
        const result = await axios.put('/api/enroll-course',{
          courseId: courseId, 
          completedChapter:completedChap
        });

        console.log(result);
        refreshData();   
        toast.success('Chapter Marked Incompleted !!')
        setLoading(false);
  }

  return (
    <div className="p-10 font-bold text-2xl">
      <div className='flex justify-between items-center'>
      <h2>{selectedChapterIndex + 1}. {chapterName || 'Chapter not found'}</h2>
      {!completedChapter?.includes(selectedChapterIndex) ? <Button className={'cursor-pointer'} onClick={()=>markChapterCompleted() }
        disable={loading}>{loading?<Loader2Icon className='animate-spin'/>:<CheckCircle/>}Mark as Completed</Button>:
      <Button variant={"outline"} onClick={()=>markChapterInCompleted()} disabled={loading}>{loading?<Loader2Icon className='animate-spin'/>:<X/>} Mark Incomplete</Button>}
      </div>
      <h2 className='my-2 text-lg font-bold'>Related Videos 🎬</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 '>
        {videoData?.map((video, index)=> index < 2 && (
            <div key={index} className='bg-black rounded-xl overflow-hidden shadow-xl hover:shadow-xl transition duration-300'>
                    <YouTube
                    videoId={video?.videoId}
                    opts={{
                        height:'250',
                        width:'400'
                    }}
                    />
            </div>
        ))}
      </div>

      <div className='mt-7'>
            {topics.map((topic, index)=>(
                <div key={index} className='mt-10 p-5 bg-secondary rounded-xl'>
                   
                    <h2 className="text-2xl text-primary font-bold mb-4 font-premium"> {index + 1 }. {topic?.topic}</h2>
                    
                    <div
                    className=" text-base"
                dangerouslySetInnerHTML={{ __html: topic?.content }}
                        style={{
                    lineHeight:'2.5'
                    }}
                    ></div>

                </div>
            ))}
      </div>

    </div>
  );
}

export default ChapterContent;
