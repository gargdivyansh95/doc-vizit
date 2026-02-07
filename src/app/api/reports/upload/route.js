export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { apiInstance } from "@/config";
import path from "path";
import FormData from "form-data";
import fs from "fs";

export async function POST(req) {
  const token = req.cookies.get("authToken")?.value;
  let tempFilePath = null;

  try {
    const incomingFormData = await req.formData();
    const file = incomingFormData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File missing" },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name);
    const baseName = path.basename(file.name, ext);
    const newFileName = `EDIGIID_${Date.now()}_${baseName}${ext}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ ONLY THIS
    const tempDir = "/tmp/uploads";
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    tempFilePath = `${tempDir}/${newFileName}`;
    fs.writeFileSync(tempFilePath, buffer);

    const backendFormData = new FormData();
    backendFormData.append(
      "file",
      fs.createReadStream(tempFilePath),
      newFileName
    );

    const response = await apiInstance.post(
      "api/reports/upload",
      backendFormData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ...backendFormData.getHeaders(),
        },
      }
    );

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  } finally {
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
}
