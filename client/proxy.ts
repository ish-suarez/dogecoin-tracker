'use server'

import { NextResponse } from 'next/server';

export async function proxy(req: Request) {
    return NextResponse.redirect(new URL('/tracker', req.url));
}

export const config = {
    matcher: ['/',],
};