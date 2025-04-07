import { GoogleGenerativeAI } from "npm:@google/generative-ai@0.1.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set');
      throw new Error('API key not configured');
    }

    const { goals, currentGPA, interests } = await req.json();
    console.log('Received request with:', { goals, currentGPA, interests });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-1.0" }); // Updated model name

    const prompt = `As an academic advisor, create a detailed 4-year academic plan based on the following:
    Student Goals: ${goals}
    Current GPA: ${currentGPA}
    Academic Interests: ${interests}

    Please provide a structured semester-by-semester plan including:
    1. Course recommendations for each semester
    2. Expected credit hours per semester
    3. Prerequisites and course sequencing
    4. Suggested extracurricular activities
    5. Academic milestones and targets

    Format the response in a clear, semester-by-semester structure.`;

    console.log('Sending prompt to Gemini API');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('Received response from Gemini API');

    return new Response(
      JSON.stringify({ plan: text }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in academic planner:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        details: error.toString()
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});