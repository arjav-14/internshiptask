// Temporarily disable middleware to fix static assets issue
export async function middleware(req) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};