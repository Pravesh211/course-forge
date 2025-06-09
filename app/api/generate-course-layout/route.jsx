import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import {
  GoogleGenAI,
} from '@google/genai';
import axios from 'axios';
import { NextResponse } from 'next/server';

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types

const PROMPT = `Generate a learning course based on the following details. Make sure to include the Course Name, Description, Chapter Name, Duration for each chapter, and Topics under each chapter. For each chapter, also provide an Image Prompt that describes a simple, modern, flat-style 2.5D digital illustration representing the chapter topic. The illustration should include UI/UX elements like mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to the course, such as sticky notes, design components, and visual aids. Use a vibrant color palette with blues, purples, and oranges, maintaining a clean, professional, creative, tech-savvy, and educational look. The illustration is meant to be used as a course banner in a simple 2.5 format.

Schema:

{
"course":{
"name": "string",
"description": "string",
"category" : "string",
"level" : "string",
"includeVideo": "boolean",
"noOfChapters": "number",
"bannerImagePrompt": "Generate a clean, modern 2.5D digital illustration for a course banner. Use a flat-design style enhanced with soft shadows, depth, and isometric elements to create a semi-3D appearance. The scene should depict a creative, tech-savvy learning environment featuring UI/UX components like mockup screens, text blocks, icons, tool panels, and buttons. Include symbolic items that reflect the course topic — such as sticky notes, diagrams, books, code snippets, or charts. Use a vibrant and harmonious color scheme (blues, purples, oranges) with smooth gradients and professional tones. The composition should be well-balanced and horizontal, ideal for a web or mobile learning platform. The image should feel educational, dynamic, and visually engaging.",
"chapters":[
{"chapterName":"string",
"duration":"string",
"topics": [
"string"
],
"imagePrompt": "string"
}
]
}
}`

export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

export async function POST(req) 
{
    const  {courseId, ...formData}  = await req.json();
    const user = await currentUser();

    const { has } = await auth()
const hasPremiumAccess = has({ plan: 'starter' })


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT + JSON.stringify(formData),
        },
      ],
    },
  ];

//If user already created any course?
if(!hasPremiumAccess){
  const result = await db.select().from(coursesTable)
  .where(eq(coursesTable.userEmail, user?.primaryEmailAddress?.emailAddress));

  if(result?.length>=1){
    return NextResponse.json({'resp':'limit exceed'})
  }
}

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
 
console.log(response.candidates[0].content.parts[0].text);
const RawResp =response?.candidates[0]?.content?.parts[0]?.text;
const RawJson = RawResp.replace('```json','').replace('```', '');
const JSONResp = JSON.parse(RawJson);

const ImagePrompt = JSONResp.course?.bannerImagePrompt;

//Generate Image
const bannerImageUrl= await GenerateImage(ImagePrompt);

//Save to Database
try {
  console.log("👉 JSONResp to insert:", JSONResp);

 const result = await db.insert(coursesTable).values({
  ...formData,
  courseJson: JSONResp,
  userEmail: user?.primaryEmailAddress?.emailAddress,
  cid: courseId,
  bannerImageUrl: bannerImageUrl
});


  console.log("✅ Insert result:", result);
} catch (error) {
  console.error("❌ Insert failed:", error);
}

return NextResponse.json({courseId: courseId});

}

const GenerateImage= async (imagePrompt)=>{
  const BASE_URL='https://aigurulab.tech';
const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: imagePrompt,
            model: 'flux',//'flux'
            aspectRatio:"16:9"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process?.env?.AI_GURU_LAB_API, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
console.log(result.data.image) //Output Result: Base 64 Image
return result.data.image;
}
