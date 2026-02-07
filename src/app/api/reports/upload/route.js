import { NextResponse } from "next/server";
import { apiInstance } from "@/config";
import path from "path";
import FormData from "form-data";
import fs from "fs";

const generateRandomNumber = () => {
    return Math.floor(10000 + Math.random() * 90000);
};

export async function POST(req) {
    const token = req.cookies.get("authToken")?.value;
    let tempFilePath = null;

    try {
        const incomingFormData = await req.formData();
        const file = incomingFormData.get("file");
        const originalFileName = file.name;
        const ext = path.extname(originalFileName);
        const baseName = path.basename(originalFileName, ext);
        const randomNumber = generateRandomNumber();
        const newFileName = `EDIGIID_${randomNumber}_${baseName}${ext}`;

        const fields = {};
        for (const [key, value] of incomingFormData.entries()) {
            if (key !== "file") {
                fields[key] = value;
            }
        }

        if (!file) {
            return NextResponse.json(
                { success: false, message: "File missing" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Vercel-compatible: Use /tmp directory
        const tempDir = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), "public/uploads");

        if (!process.env.VERCEL && !fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        tempFilePath = path.join(tempDir, newFileName);
        fs.writeFileSync(tempFilePath, buffer);

        const backendFormData = new FormData();
        backendFormData.append(
            "file",
            fs.createReadStream(tempFilePath),
            newFileName
        );

        Object.entries(fields).forEach(([key, value]) => {
            backendFormData.append(key, value);
        });

        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await apiInstance.post("api/reports/upload", backendFormData, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...backendFormData.getHeaders(),
            },
            maxBodyLength: Infinity,
        });

        return NextResponse.json(
            { success: true, data: response.data },
            { status: response.status }
        );
    } catch (error) {
        console.error("Upload error:", error?.response?.data || error);
        return NextResponse.json(
            {
                success: false,
                error: error?.response?.data?.error || "Upload failed",
            },
            { status: error?.response?.status || 500 }
        );
    } finally {
        if (tempFilePath && fs.existsSync(tempFilePath)) {
            try {
                fs.unlinkSync(tempFilePath);
                console.log("Temp file deleted:", tempFilePath);
            } catch (err) {
                console.error("Temp file delete failed:", err);
            }
        }
    }
}
