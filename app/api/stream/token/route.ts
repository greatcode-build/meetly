import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
  const secret = process.env.STREAM_SECRET_KEY!;

  const client = new StreamClient(apiKey, secret, { timeout: 3000 });

  const token = client.generateUserToken({
    user_id: user.id,
    validity_in_seconds: 60 * 60 * 24,
  });

  return NextResponse.json({ token });
}
