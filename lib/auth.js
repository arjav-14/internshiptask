import jwt from "jsonwebtoken";
import prisma from "./prisma";

// Helper function to verify JWT token from Authorization header
export async function requireAuth(req) {
  const authHeader = req.headers.get("authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  
  const token = authHeader.split(" ")[1];
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = jwt.verify(token, process.env.BETTER_AUTH_SECRET);
    
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
      select: { id: true, username: true }
    });
    
    return admin;
  } catch (error) {
    return null;
  }
}