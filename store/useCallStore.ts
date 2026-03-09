import { create } from "zustand";
import {
  Call,
  CallRecording,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";

type CallStore = {
  calls: Call[];
  recordings: CallRecording[];
  isLoading: boolean;
  loadCalls: (
    client: ReturnType<typeof useStreamVideoClient>,
    userId: string,
  ) => Promise<void>;
};

export const useCallStore = create<CallStore>((set, get) => ({
  calls: [],
  recordings: [],
  isLoading: false,

  loadCalls: async (client, userId) => {
    if (!client || !userId) return;
    set({ isLoading: true });

    try {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          $or: [{ created_by_user_id: userId }, { members: { $in: [userId] } }],
        },
        sort: [{ field: "starts_at", direction: -1 }],
        watch: true,
      });
      set({ calls });

      const recordingsResponses = await Promise.all(
        calls.map((call) => call.queryRecordings()),
      );
      const allRecordings = recordingsResponses.flatMap((r) => r.recordings);
      set({ recordings: allRecordings });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
