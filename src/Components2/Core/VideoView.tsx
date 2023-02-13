
import { TrackPublication } from "livekit-client";
import React, { useEffect } from "react";



export function VideoView({track, style} : { track?: TrackPublication | null, style? : React.CSSProperties }){
    const element = React.useRef<HTMLVideoElement>(null);
    const previousElement = React.useRef<HTMLMediaElement | undefined | null>();

    const elStyle = {
        maxHeight : "100%",
        width :  "100%",
        ...style
    }

    useEffect(() => {
        if (!track) return;
        if (track && track.track) {
          if (previousElement.current) {
            track.track.detach(previousElement.current);
          }
          track.track.attach(element.current!);
        }
        previousElement.current = element?.current;
        return () => {
          if (previousElement.current && track.videoTrack) {
              track.videoTrack!.detach(previousElement.current);
          }
        };
      }, [ track]);

      return <video ref={element} muted={true} style={elStyle}></video>

}