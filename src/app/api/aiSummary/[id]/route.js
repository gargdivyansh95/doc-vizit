import { NextResponse } from "next/server";
import { apiInstance } from "@/config";

// get ai summary detail by id
export async function GET(request, { params }) {
    try {
        const { id: summaryId } = await params;
        const token = request.cookies.get("authToken")?.value;
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await apiInstance.get(`api/reports/aiSummaryDetail/${summaryId}`);

        return NextResponse.json(
            { success: true, data: response.data },
            { status: response.status }
        );

    } catch (error) {
        console.error("Get AI Summary Details By Id API Error", error);
        console.log(error.response, 'eeeeeee')
        return NextResponse.json(
            {
                success: false,
                error: error?.response?.data?.message || "AI Summary Details fetch failed",
            },
            { status: error?.response?.status || 500 }
        );
    }
}

// delete ai summary
export async function DELETE(request, { params }) {
    try {
        const { id: summaryId } = await params;
        const token = request.cookies.get("authToken")?.value;
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await apiInstance.delete(`api/reports/deleteAiSummary/${summaryId}`);

        return NextResponse.json(
            { success: true, data: response.data },
            { status: response.status }
        );

    } catch (error) {
        console.error("Delete AI Summary API Error", error);
        return NextResponse.json(
            {
                success: false,
                error: error?.response?.data?.message || "Ai Summary deletion failed",
            },
            { status: error?.response?.status || 500 }
        );
    }
}