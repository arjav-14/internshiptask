import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader)
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.BETTER_AUTH_SECRET
    );

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file)
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    const base64Audio = buffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest"
    });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: file.type,
          data: base64Audio,
        },
      },
      "Transcribe this audio file.",
    ]);

    const transcriptText =
      result.response.text();

    const transcript =
      await prisma.transcript.create({
        data: {
          text: transcriptText,
          adminId: decoded.adminId,
        },
      });

    return NextResponse.json({ transcript });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}