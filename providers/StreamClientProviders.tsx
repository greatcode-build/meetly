"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { Loader } from "@/components/Loader";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [client, setClient] = useState<StreamVideoClient | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const initClient = async () => {
      const res = await fetch("/api/stream/token");
      const { token } = await res.json();

      const videoClient = new StreamVideoClient({
        apiKey: API_KEY,
        user: {
          id: user.id,
          name: user.username || user.id,
          image: user.imageUrl,
        },
        token,
        options: {
          timeout: 10000, // increase timeout
        },
      });

      setClient(videoClient);
    };

    initClient();
  }, [isLoaded, user]);

  if (!client) return <Loader />;

  return <StreamVideo client={client}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
