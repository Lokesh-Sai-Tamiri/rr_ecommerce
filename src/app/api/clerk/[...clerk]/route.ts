import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Clerk API route handler - handles all Clerk authentication endpoints
export async function GET(request: NextRequest) {
  // This route is handled by Clerk's middleware automatically
  // We just need to ensure it exists for Clerk to route requests properly
  const { userId } = await auth();
  
  return NextResponse.json({ 
    message: 'Clerk API endpoint',
    authenticated: !!userId 
  });
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  
  return NextResponse.json({ 
    message: 'Clerk API endpoint',
    authenticated: !!userId 
  });
}
