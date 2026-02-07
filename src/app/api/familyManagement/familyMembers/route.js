import { NextResponse } from "next/server";
import { apiInstance } from "@/config";

// Get All family members list including self
export async function GET(request) {
    try {
        const token = request.cookies.get("authToken")?.value;
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await apiInstance.get(`api/user/familyMemberList`);
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
