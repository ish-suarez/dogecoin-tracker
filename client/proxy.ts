'use server'

import { NextResponse } from 'next/server';

// Proxy function to redirect root path to /tracker
export async function proxy(req: Request) {
    return NextResponse.redirect(new URL('/tracker', req.url));
}

// Configure the matcher to apply this proxy to the root path
export const config = {
    matcher: ['/',],
};