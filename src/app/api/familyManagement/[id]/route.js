import { NextResponse } from "next/server";
import { apiInstance } from "@/config";

// Update family member
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const token = request.cookies.get("authToken")?.value;
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await apiInstance.put(`api/user/updateFamilyMember/${id}`, body);
        const data = response.data;
        return NextResponse.json(
            { success: true, data },
            { status: response.status }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error?.response?.data?.error || 'Update user profile failed' },
            { status: error?.response?.status || 500 }
        );
    }
}
