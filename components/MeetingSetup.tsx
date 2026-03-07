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
  const { useCameraState } = useCallStateHooks();
  const { hasBrowserPermission } = useCameraState();

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const [isPreviewing, setIsPreviewing] = useState(false);

  useEffect(() => {
    const checkDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === "videoinput");
        setHasCamera(videoDevices.length > 0);
        if (videoDevices.length === 0) console.warn("No camera detected");
      } catch (err) {
        console.error("Device enumeration failed:", err);
        setHasCamera(false);
      }
    };
    checkDevices();
  }, []);

  useEffect(() => {
    const startPreview = async () => {
      if (!call) return;
      if (!hasBrowserPermission) {
        console.warn("Camera permission not granted");
        return;
      }

      try {
        if (hasCamera && !isMicCamToggled) {
          await call.camera.enable();
        } else {
          await call.camera.disable();
        }

        if (!isMicCamToggled) {
          await call.microphone.enable();
        } else {
          await call.microphone.disable();
        }

        setIsPreviewing(true);
      } catch (err) {
        console.error("Preview failed:", err);
        setIsPreviewing(false);
      }
    };

    startPreview();
  }, [call, hasBrowserPermission, hasCamera, isMicCamToggled]);

  const joinMeeting = async () => {
    if (!call) return;

    try {
      if (hasCamera && !isMicCamToggled) {
        await call.camera.select(undefined);
      } else {
        await call.camera.disable();
      }

      if (isMicCamToggled) {
        await call.microphone.disable();
      }

      await call.join();
      setIsSetupComplete(true);
    } catch (err) {
      console.error("Join failed:", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>

      {hasCamera && isPreviewing ? (
        <VideoPreview />
      ) : (
        <p className="text-red-400">No camera available or preview failed</p>
      )}

      <div className="flex items-center justify-center h-16 gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>

      <Button
        className="rounded-md bg-green-500"
        onClick={joinMeeting}
        disabled={!hasCamera && !isMicCamToggled}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export { MeetingSetup };
