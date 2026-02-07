import { NextResponse } from "next/server";
import { apiInstance } from "@/config";

export async function GET(request) {
    try {
        const mobileNumber = request.nextUrl.searchParams.get("mobileNumber");
        const token = request.cookies.get("authToken")?.value;
        if (!mobileNumber) {
            return NextResponse.json(
                { success: false, error: "Mobile number is required" },
                { status: 400 }
            );
        }
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await apiInstance.get(`api/user/userProfile?mobileNumber=${mobileNumber}`);
        return NextResponse.json(
            { success: true, data: response.data },
            { status: response.status }
        );
    } catch (error) {
        console.error("User Profile API Error", error);
        return NextResponse.json(
            {
                success: false,
                error: error?.response?.data?.message || "Profile fetch failed",
            },
            { status: error?.response?.status || 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const token = request.cookies.get("authToken")?.value;
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await apiInstance.put('api/user/updateProfile', body);
        const data = response.data;
        return NextResponse.json(
            { success: true, data },
            { status: response.status }
        );
    } catch (error) {
        console.error('Update User Profile API Error:', error);
        console.log('BACKEND DATA----------------:', error?.response);
        // console.log('BACKEND DATA:', error?.response?.data?.message);
        return NextResponse.json(
            { success: false, error: error?.response?.data?.error || 'Update user profile failed' },
            { status: error?.response?.status || 500 }
        );
    }
}
