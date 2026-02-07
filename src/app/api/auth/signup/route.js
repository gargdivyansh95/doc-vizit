import { apiInstance } from '@/config';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const response = await apiInstance.post('api/accounts/register', body);
        const data = response.data;
        return NextResponse.json(
            { success: true, data },
            { status: response.status }
        );

    } catch (error) {
        console.error('Signup API Error:', error);
        // console.log('BACKEND STATUS:', error?.response?.status);
        console.log('BACKEND DATA:', error?.response?.data);
        // console.log('BACKEND HEADERS:', error?.response?.headers);
        return NextResponse.json(
            { success: false, error: error?.response?.data?.message || 'Signup failed' },
            { status: error?.response?.status || 500 }
        );
    }
}