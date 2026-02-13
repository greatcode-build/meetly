"use client";

import { useState } from "react";
import { HomeCard } from "./HomeCard";
import { useRouter } from "next/navigation";
import { MeetingModal } from "./MeetingModal";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meeting, setMeeting] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [callDetails, setCallDetails] = useState<Call>();
  const [values, setValues] = useState(initialValues);
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client) return;

    const id = crypto.randomUUID();
    const call = client.call("default", id);
    if (!call) throw new Error("Failed to create meeting");
    if (!values.description) {
      router.push(`/meeting/${id}`);
    }

    try {
      await call.getOrCreate();
      toast.success("Meeting created successfully");
      setCallDetails(call);
    } catch (error) {
      toast("Failed to create meeting");
      console.error("Failed to create meeting", error);
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

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

      {!callDetails ? (
        <MeetingModal
          isOpen={meeting === "isScheduleMeeting"}
          onClose={() => setMeeting(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
          buttonText=""
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-5.5 text-[#ECF0FF]">
              Add a description
            </label>
            <Textarea
              className="border-none bg-[#1C1F2E] focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-5.5 text-[#ECF0FF]">
              Select date and Time
            </label>
            <DatePicker
              selected={values.dateTime}
              onChange={(date: Date | null) =>
                setValues({ ...values, dateTime: date! })
              }
              showTimeSelect
              dateFormat="Pp"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meeting === "isScheduleMeeting"}
          onClose={() => setMeeting(undefined)}
          title="Meeting Created "
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast("Link copied");
          }}
          image="/icons/checked.svg"
          buttonText="Copy Meeting Link"
          buttonIcon="/icons/copy.svg"
        />
      )}

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
