"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="h-full w-full p-8 text-red-700">
      <h1 className="text-4xl font-bold">Error</h1>
      <p className="text-lg">{error.message}</p>
    </div>
  );
}
