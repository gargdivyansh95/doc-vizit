import { NextResponse } from "next/server";
import { apiInstance } from "@/config";

// delete user/ family member
export async function DELETE(request, { params }) {
    try {
        const { id: memberId } = await params;
        const token = request.cookies.get("authToken")?.value;
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await apiInstance.delete(`api/user/${memberId}`);
        return NextResponse.json(
            { success: true, data: response.data },
            { status: response.status }
        );
    } catch (error) {
        console.error("Delete Account API Error", error);
        console.log(error.response, 'rrrrrrrrrrrrrrrrrrrrrrrrr')
        return NextResponse.json(
            {
                success: false,
                error: error?.response?.data?.message || "Account deletion failed",
            },
            { status: error?.response?.status || 500 }
        );
    }
}