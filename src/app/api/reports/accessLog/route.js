import { apiInstance } from '@/config';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const token = request.cookies.get("authToken")?.value;
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await apiInstance.post('api/reports/accessLog', body);
        const data = response.data;
        return NextResponse.json(
            { success: true, data },
            { status: response.status }
        );

    } catch (error) {
        // console.error('Share Report API Error:', error);
        // console.log('BACKEND DATA----------------:', error?.response);
        return NextResponse.json(
            { success: false, error: error?.response?.data?.error || 'Report Access Log failed' },
            { status: error?.response?.status || 500 }
        );
    }
}