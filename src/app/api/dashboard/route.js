import { NextResponse } from "next/server";
import { apiInstance } from "@/config";

export async function GET(request) {
    try {
        const queryString = request.nextUrl.searchParams.toString();
        const token = request.cookies.get("authToken")?.value;
        const userId = request.headers.get('user_id');
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        apiInstance.defaults.headers.common['user_id'] = userId;
        const response = await apiInstance.get(`api/reports/dashboard?${queryString}`);
        return NextResponse.json(
            { success: true, data: response.data },
            { status: response.status }
        );
    } catch (error) {
        console.error("Get Dashboard Report API Error", error);
        return NextResponse.json(
            {
                success: false,
                error: error?.response?.data?.message || "Reports fetch failed",
            },
            { status: error?.response?.status || 500 }
        );
    }
}
