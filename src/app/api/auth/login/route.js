import { apiInstance } from '@/config';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const response = await apiInstance.post('api/accounts/login', body);
        const token = response.data?.token;
        const res = NextResponse.json(
            { success: true, data: response.data },
            { status: response.status }
        );
        res.cookies.set("authToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: (response?.data?.expiresIn) * 60
        });

        return res;
    } catch (error) {
        console.error('Login API Error:', error);
        console.log(error.response?.data, 'error.response?.data')
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Internal server error';
        return NextResponse.json(
            { success: false, error: message },
            { status }
        );
    }
}
