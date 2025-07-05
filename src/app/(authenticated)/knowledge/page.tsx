"use client";

import React from "react";
import { KnowledgeResources } from "@modules/classManagement/components/KnowledgeCard";

export default function KnowledgePage() {

  return (
    <div className="p-6">
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-2xl font-bold">Conhecimento</h1>
      </div>
      <KnowledgeResources />
    </div>
  );
}
