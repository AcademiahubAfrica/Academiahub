"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

type SpecSource = "frontend" | "backend";

export function SwaggerViewer() {
  const [activeSpec, setActiveSpec] = useState<SpecSource>("frontend");
  const [spec, setSpec] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url =
      activeSpec === "frontend"
        ? "/api/docs/json"
        : `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"}/docs/json`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setSpec(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(String(err));
        setLoading(false);
      });
  }, [activeSpec]);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-screen-xl p-6">
        <div className="mb-6 flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">API Docs</h1>
          <select
            value={activeSpec}
            onChange={(e) => setActiveSpec(e.target.value as SpecSource)}
            className="rounded border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="frontend">Frontend API (Next.js)</option>
            <option value="backend">Backend API (Express)</option>
          </select>
        </div>

        {loading && <p className="text-gray-500">Loading spec...</p>}
        {error && <p className="text-red-500">Failed to load spec: {error}</p>}
        {!loading && !error && spec && <SwaggerUI spec={spec} />}
      </div>
    </div>
  );
}
