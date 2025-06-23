import { NextResponse } from 'next/server';

export async function POST() {
    const res = NextResponse.json({ message: 'Logged out' });

    res.cookies.set('token', '', {
        path: '/',
        maxAge: 0, // 💀 delete immediately
    });

    return res;
}