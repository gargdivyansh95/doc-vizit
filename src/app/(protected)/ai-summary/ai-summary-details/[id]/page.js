"use client";
import { AiSummaryDetails } from "@/modules";
import { useParams } from "next/navigation";
import React from "react";

const AiSummaryDetailsPage = () => {

  const params = useParams();
  const id = params?.id;

  return (
    <AiSummaryDetails summaryId={id} />
  );
};

export default AiSummaryDetailsPage;