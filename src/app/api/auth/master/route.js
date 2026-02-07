import { apiInstance } from '@/config';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const response = await apiInstance.post('api/accounts/fetchmasterdata', body);
        const data = response.data;
        return NextResponse.json(
            { success: true, data },
            { status: response.status }
        );
    } catch (error) {
        // console.log(error.response?.data, 'error.response?.data')
        return NextResponse.json(
            { success: false, error: error?.response?.data?.message || 'Get Master Data failed' },
            { status: error?.response?.status || 500 }
        );
    }
}