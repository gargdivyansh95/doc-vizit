import { NextResponse } from "next/server";
import { apiInstance } from "@/config";

// Get family members
export async function GET(request) {
    try {
        const token = request.cookies.get("authToken")?.value;
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await apiInstance.get(`api/user/familyMember`);
        return NextResponse.json(
            { success: true, data: response.data },
            { status: response.status }
        );
    } catch (error) {
        console.error("Family Mmbers List API Error", error);
        return NextResponse.json(
            {
                success: false,
                error: error?.response?.data?.message || "Family Members fetch failed",
            },
            { status: error?.response?.status || 500 }
        );
    }
}

// Add family member
export async function POST(request) {
    try {
        const body = await request.json();
        const token = request.cookies.get("authToken")?.value;
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await apiInstance.post('api/user/addFamilyMember', body);
        const data = response.data;
        return NextResponse.json(
            { success: true, data },
            { status: response.status }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error?.response?.data?.error || 'Add Family Member failed' },
            { status: error?.response?.status || 500 }
        );
    }
}
