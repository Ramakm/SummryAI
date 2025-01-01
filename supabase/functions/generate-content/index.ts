import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { sourceType, sourceUrl, subject, difficulty, language, targetAge, selectedFeatures } = await req.json()
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')

    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured')
    }

    // Fetch video title and description from YouTube
    let contentContext = ''
    if (sourceType === 'youtube') {
      const videoId = sourceUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
      if (!videoId) {
        throw new Error('Invalid YouTube URL')
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${Deno.env.get('YOUTUBE_API_KEY')}&part=snippet`,
        { method: 'GET' }
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch video data')
      }

      const data = await response.json()
      if (!data.items?.[0]) {
        throw new Error('Video not found')
      }

      const video = data.items[0].snippet
      contentContext = `Title: ${video.title}\nDescription: ${video.description}`
    }

    const outputs = {}
    const genAI = new GoogleGenerativeAI(geminiApiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    
    for (const feature of selectedFeatures) {
      console.log(`Generating ${feature} content using Gemini...`)
      
      const prompt = `Based on this content:\n${contentContext}\n\n
        Generate ${feature} content for a ${subject} ${sourceType} targeted at ${targetAge} students, 
        with ${difficulty} difficulty level, in ${language} language.
        Make sure to provide detailed and well-structured content that is appropriate for the target age group.
        For summaries, include key points and takeaways.
        For quizzes, include multiple choice questions with answers.
        For study guides, organize content into clear sections with main concepts.
        Format the output using HTML tags for bold text (<b>) instead of markdown (**).`

      const result = await model.generateContent(prompt)
      const response = await result.response
      outputs[feature] = response.text()
      
      console.log(`Generated ${feature} content successfully`)
    }

    return new Response(
      JSON.stringify({ outputs }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in generate-content function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})