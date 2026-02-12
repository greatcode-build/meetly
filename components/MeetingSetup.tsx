"use client";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const call = useCall();
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
  const { useCameraState } = useCallStateHooks();
  const { hasBrowserPermission, camera } = useCameraState();

  if (!hasBrowserPermission) {
    alert("User has not granted camera permissions!");
  }

  useEffect(() => {
    const previewCamera = async () => {
      if (!hasBrowserPermission || !camera) return;

      try {
        await camera.enable();
      } catch (err) {
        console.error("Camera preview failed:", err);
      }
    };

    previewCamera();
  }, [hasBrowserPermission, camera]);

  const joinMeeting = async () => {
    try {
      await call?.camera.select(undefined);
      if (isMicCamToggled) {
        await call?.camera.disable();
        await call?.microphone.disable();
      }

      await call?.join();
      setIsSetupComplete(true);
    } catch (error) {
      console.error("Join failed:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex items-center justify-center h-16 gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />{" "}
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button className="rounded-md bg-green-500" onClick={joinMeeting}>
        Join Meeting
      </Button>
    </div>
  );
};

export { MeetingSetup };
