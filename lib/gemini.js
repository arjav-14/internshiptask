import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY)

async function transcribeAudio(base64Audio, mimeType) {
  try {
    const model = genAI.getGenerativeModel({model: "gemini-flash-latest" })
    
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Audio,
          mimeType,
        },
      },
      "Please transcribe this audio file accurately. Return only the transcribed text without any additional commentary or formatting.",
    ])

    const response = await result.response
    const text = response.text()
    
    return text.trim()
  } catch (error) {
    console.error("Gemini API error:", error)
    throw new Error("Failed to transcribe audio")
  }
}

export { transcribeAudio }
