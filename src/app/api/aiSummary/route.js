import { NextResponse } from "next/server";
import { apiInstance } from "@/config";

export async function GET(request) {
    try {
        const token = request.cookies.get("authToken")?.value;
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await apiInstance.get(`api/reports/aiSummaryreportList`);
        return NextResponse.json(
            { success: true, data: response.data },
            { status: response.status }
        );

    } catch (error) {
        console.error("Get AI Summary List API Error", error);
        return NextResponse.json(
            {
                success: false,
                error: error?.response?.data?.message || "AI Summary fetch failed",
            },
            { status: error?.response?.status || 500 }
        );
    }
}
