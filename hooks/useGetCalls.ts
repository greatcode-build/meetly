import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect } from "react";
import { useCallStore } from "@/store/useCallStore";

export const useGetCalls = () => {
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { calls, recordings, isLoading, loadCalls } = useCallStore();

  useEffect(() => {
    if (!user || !client) return;
    if (calls.length === 0) {
      loadCalls(client, user.id);
    }
  }, [client, user?.id, calls.length, loadCalls]);
  const now = new Date();

  const endedCalls = calls.filter(
    ({ state: { startsAt, endedAt } }) =>
      (startsAt && new Date(startsAt) < now) || !!endedAt,
  );

  const upcomingCalls = calls.filter(
    ({ state: { startsAt } }) => startsAt && new Date(startsAt) > now,
  );

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: recordings,
    isLoading,
  };
};
