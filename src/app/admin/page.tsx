import { env } from "@/env";
import Visualiser from "../_components/VIsualiser";
import { Navbar } from "../_components/homePage/navbar";

export default async function AdminPage() {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 p-4">
        <div className="w-full text-start">
          <h1 className="mx-4 w-[90%] border-b border-slate-300 text-3xl font-bold text-slate-600 md:mx-16">
            Admin Section
          </h1>
        </div>
        <Visualiser url={`${env.INFLUENCER_API_URL}/visualise/`} />
      </div>
    </div>
  );
}
