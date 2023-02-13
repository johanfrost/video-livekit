import {
    RemoteTrack, RoomEvent
} from "livekit-client";
import React, { useEffect, useState } from "react";
import { useRoom } from "./Room";

export function AudioTracksManager() {
  const {room} = useRoom();

  const [audioTracks, setAudioTracks] = useState<RemoteTrack[]>([]);

  const onTrackSubscibed = (track: RemoteTrack) => {
    if (track.kind === "audio") {
      setAudioTracks([...audioTracks, track]);
    }
  };

  useEffect(() => {
    if (!room) return;
    room.on(RoomEvent.TrackSubscribed, onTrackSubscibed);
    return () => {
      room.off(RoomEvent.TrackSubscribed, onTrackSubscibed);
    };
  }, []);

  if (!room) return null;

  return (
    <>
      {audioTracks.map((a, i) => (
        <AudioPlayer track={a} key={i}></AudioPlayer>
      ))}
    </>
  );
}

export function AudioPlayer({ track }: { track: RemoteTrack }) {
  const element = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!element.current) return;
    track.attach(element.current);
  }, []);

  return <audio ref={element}></audio>;
}
