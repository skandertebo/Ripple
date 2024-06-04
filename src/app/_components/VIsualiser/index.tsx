"use client";

import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Visualiser({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => setLoaded(true);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h2 className="text-start text-2xl font-bold">Clusters visualisation</h2>
      {!loaded && (
        <div className="mt-24 flex w-full justify-center">
          <AiOutlineLoading className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <iframe src={url} height={"100%"} width={700} onLoad={onLoad} />
    </div>
  );
}
