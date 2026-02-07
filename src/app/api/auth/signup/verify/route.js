import { apiInstance } from '@/config';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const response = await apiInstance.post('api/accounts/verifyOtp', body);
        console.log(response.data, 'response.data')
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
            maxAge: response?.data?.expiresIn
        });

        return res;
        // const data = response.data;
        // return NextResponse.json(
        //     { success: true, data },
        //     { status: response.status }
        // );

    } catch (error) {
        console.error('Verify Registration API Error:', error);
        // console.log('BACKEND STATUS:', error?.response?.status);
        // console.log('BACKEND DATA:', error?.response?.data);
        // console.log('BACKEND HEADERS:', error?.response?.headers);
        return NextResponse.json(
            { success: false, error: error?.response?.data?.message || 'Verification failed' },
            { status: error?.response?.status || 500 }
        );
    }
}