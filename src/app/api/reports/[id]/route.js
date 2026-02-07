import { NextResponse } from "next/server";
import { apiInstance } from "@/config";

// get report detail by id
export async function GET(request, { params }) {
    try {
        const { id: reportId } = await params;
        const token = request.cookies.get("authToken")?.value;
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await apiInstance.get(`api/reports/reportDetail/${reportId}`);

        return NextResponse.json(
            { success: true, data: response.data },
            { status: response.status }
        );

    } catch (error) {
        console.error("Get Reports Details By Id API Error", error);
        console.log(error.response, 'eeeeeee')
        return NextResponse.json(
            {
                success: false,
                error: error?.response?.data?.message || "Report Details fetch failed",
            },
            { status: error?.response?.status || 500 }
        );
    }
}


// delete report
export async function DELETE(request, { params }) {
    try {
        const { id: reportId } = await params;
        const token = request.cookies.get("authToken")?.value;
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await apiInstance.delete(`api/reports/deleteReport/${reportId}`);

        return NextResponse.json(
            { success: true, data: response.data },
            { status: response.status }
        );

    } catch (error) {
        console.error("Delete Report API Error", error);
        return NextResponse.json(
            {
                success: false,
                error: error?.response?.data?.message || "Report deletion failed",
            },
            { status: error?.response?.status || 500 }
        );
    }
}