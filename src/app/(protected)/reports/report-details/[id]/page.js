"use client";
import { ReportDetails } from "@/modules";
import { useParams } from "next/navigation";
import React from "react";

const ReportDetailsPage = () => {

  const params = useParams();
  const id = params?.id;

  return (
    <ReportDetails reportId={id} />
  );
};

export default ReportDetailsPage;