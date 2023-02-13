import { TrackSource } from "@livekit/components-react";
import { ReactElement } from "react";
import { videoSource } from "../schemas/videoSource";
import { ParticipantManager } from "./ParticipantManager";
import { useParticipants } from "./Room";

export function SourceList({ children, videoSources = ["camera"] }: { children: ReactElement; videoSources?: videoSource[] }) {
  const participants = useParticipants();
  if (!participants) return null;
  return (
    <>
      {participants.map((part) => {
        const arr: ReactElement[] = [];

        if (videoSources.includes("camera")) {
          if (part.getTrack(TrackSource.Camera)) {
            arr.push(
              <ParticipantManager key={part.identity} participant={part} videoSource={"camera"}>
                {children}
              </ParticipantManager>
            );
          }
        }

        if (videoSources.includes("screen_share")) {
          if (part.getTrack(TrackSource.ScreenShare)) {
            arr.push(
              <ParticipantManager key={part.identity} participant={part} videoSource={"screen_share"}>
                {children}
              </ParticipantManager>
            );
          }
        }

        return arr;
      })}
    </>
  );
}
