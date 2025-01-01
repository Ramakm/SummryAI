import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { url, type } = await req.json()
    console.log('Processing request for URL:', url, 'Type:', type)
    
    // For YouTube URLs, extract video ID and fetch metadata
    if (type === 'youtube') {
      // Support multiple YouTube URL formats
      const patterns = [
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
        /^([^"&?\/\s]{11})$/, // Direct video ID
        /youtube.com\/watch\?v=([^"&?\/\s]{11})/, // Standard watch URL
        /youtu.be\/([^"&?\/\s]{11})/, // Shortened URL
        /youtube.com\/embed\/([^"&?\/\s]{11})/ // Embed URL
      ]

      let videoId = null
      for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match && match[1]) {
          videoId = match[1]
          break
        }
      }
      
      console.log('Extracted video ID:', videoId)
      
      if (!videoId) {
        console.error('Invalid YouTube URL:', url)
        return new Response(
          JSON.stringify({ error: 'Invalid YouTube URL format' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      try {
        const apiKey = Deno.env.get('YOUTUBE_API_KEY')
        if (!apiKey) {
          console.error('YouTube API key not configured')
          return new Response(
            JSON.stringify({ error: 'YouTube API configuration missing' }),
            { 
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`,
          { method: 'GET' }
        )
        
        if (!response.ok) {
          console.error('YouTube API error:', await response.text())
          throw new Error('Failed to fetch video data from YouTube API')
        }

        const data = await response.json()
        console.log('YouTube API response received')
        
        if (!data.items?.[0]) {
          console.error('No video data found for ID:', videoId)
          return new Response(
            JSON.stringify({ error: 'Video not found' }),
            { 
              status: 404,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

        const video = data.items[0].snippet
        return new Response(
          JSON.stringify({
            title: video.title,
            thumbnail: video.thumbnails.medium.url,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } catch (error) {
        console.error('Error fetching YouTube data:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to fetch video data' }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
    }

    // For audio/podcast, return basic preview
    if (type === 'audio' || type === 'podcast') {
      console.log('Processing audio/podcast URL:', url)
      return new Response(
        JSON.stringify({
          title: url.split('/').pop() || 'Audio content',
          thumbnail: null,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Invalid content type
    return new Response(
      JSON.stringify({ error: 'Unsupported content type' }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})