import http2 from "http2-wrapper";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";
export const GET = async (req: NextApiRequest) => {
  const reqUrl = new URL(req.url ?? "");
  let url = reqUrl.searchParams.get("url");
  if (!url) {
    return new Response("Missing url query parameter", { status: 400 });
  }
  url = decodeURIComponent(url);
  const parsedUrl = new URL(url);
  const client = http2.connect(parsedUrl.origin);
  console.log("Connected to", parsedUrl.pathname);
  const reqHeaders = {
    ":method": "GET",
    ":path": parsedUrl.pathname + parsedUrl.search,
    ":authority": parsedUrl.hostname,
    ":scheme": parsedUrl.protocol.slice(0, -1), // 'https' or 'http'
    accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-encoding": "gzip, deflate, br, zstd",
    "accept-language": "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7",
    priority: "i",
    referer: "https://www.tiktok.com/",
    "sec-ch-ua":
      '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  };

  const stream = client.request(reqHeaders);
  async function getResponseFromStream() {
    const body: Buffer[] = [];
    return new Promise((resolve, reject) => {
      stream.on("data", (chunk) => {
        body.push(chunk as Buffer);
      });

      stream.on("end", () => {
        const buffer = Buffer.concat(body);
        resolve(
          new NextResponse(buffer, {
            headers: {
              "Content-type": "image/jpeg",
              "Content-length": buffer.length.toString(),
              "Cache-Control": "no-store",
            },
            status: 200,
          }),
        );
      });

      stream.on("error", (error) => {
        console.error("Error in stream", error);
        reject(new Response((error as Error).message, { status: 500 }));
      });
    });
  }

  try {
    const response = await getResponseFromStream();
    return response;
  } catch (error) {
    console.error("Error in getResponseFromStream", error);
    return error;
  }
};
