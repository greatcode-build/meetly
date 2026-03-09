"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { useRouter } from "next/navigation";
import { MeetingCard } from "./MeetingCard";
import { Loader } from "./Loader";

const CallList = ({ type }: { type: "upcoming" | "ended" | "recordings" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return "";
    }
  };

  const noCallsMessage = getNoCallsMessage();
  if (isLoading) return <Loader />;

  if (type === "recordings") {
    return (
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {callRecordings.length > 0 ? (
          callRecordings.map((recording) => (
            <MeetingCard
              key={recording.url}
              icon="/icons/recordings.svg"
              title={recording.filename?.substring(0, 20) || "No Description"}
              date={recording.start_time.toLocaleString()}
              isPreviousMeeting={false}
              buttonIcon1="/icons/play.svg"
              buttonText="Play"
              link={recording.url}
              handleClick={() => router.push(recording.url)}
            />
          ))
        ) : (
          <h1>{noCallsMessage}</h1>
        )}
      </div>
    );
  }

  const calls = type === "ended" ? endedCalls : upcomingCalls;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls.length > 0 ? (
        calls.map((call) => (
          <MeetingCard
            key={call.id}
            icon={
              type === "ended" ? "/icons/previous.svg" : "/icons/upcoming.svg"
            }
            title={
              call.state.custom.description?.substring(0, 26) ||
              "No Description"
            }
            date={
              call.state.startsAt
                ? new Date(call.state.startsAt).toLocaleString()
                : "No scheduled time"
            }
            isPreviousMeeting={type === "ended"}
            buttonText="Start"
            link={`/meeting/${call.id}`}
            handleClick={() => router.push(`/meeting/${call.id}`)}
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export { CallList };
