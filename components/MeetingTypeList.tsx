"use client";

import { useState } from "react";
import { HomeCard } from "./HomeCard";
import { useRouter } from "next/navigation";
import { MeetingModal } from "./MeetingModal";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meeting, setMeeting] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client) return;

    const id = crypto.randomUUID();
    const call = client.call("default", id);
    router.push(`/meeting/${id}`);

    try {
      await call.getOrCreate();
      toast.success("Meeting created successfully");
    } catch (error) {
      toast("Failed to create meeting");
      console.error("Failed to create meeting", error);
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeeting("isInstantMeeting")}
        className="bg-[#FF742E]"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeeting("isScheduleMeeting")}
        className="bg-[#0E78F9]"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-[#830EF9]"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => setMeeting("isJoiningMeeting")}
        className="bg-[#F9A90E]"
      />
      <MeetingModal
        isOpen={meeting === "isInstantMeeting"}
        onClose={() => setMeeting(undefined)}
        title="Start Instant Meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
        className="text-center"
      />
    </section>
  );
};

export { MeetingTypeList };
