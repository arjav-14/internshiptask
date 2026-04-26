import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
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

    const transcripts =
      await prisma.transcript.findMany({
        where: {
          adminId: decoded.adminId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({ transcripts });

  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}