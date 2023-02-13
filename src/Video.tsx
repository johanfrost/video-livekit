import { LiveKitRoom, MessageFormatter, RoomAudioRenderer, TileLoop } from "@livekit/components-react";
import { ConnectionState, LocalParticipant, LocalTrackPublication, Participant, ParticipantEvent, RemoteAudioTrack, RemoteParticipant, RemoteTrack, RemoteTrackPublication, Room, RoomConnectOptions, RoomEvent, RoomOptions, TrackPublication } from "livekit-client";
import React, { useEffect, useMemo, useState } from "react";

export function Test() {
  const options: RoomOptions = useMemo(() => ({}), []);
  const connectOptions: RoomConnectOptions = useMemo(() => ({}), []);

  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    setRoom(new Room(options));
  }, [options]);

  useEffect(() => {
    if (!room) return;
    const onSignalConnected = () => {
      const localP = room.localParticipant;
      try {
        //localP.setMicrophoneEnabled(!!audio, typeof audio !== 'boolean' ? audio : undefined);
        //localP.setCameraEnabled(!!video, typeof video !== 'boolean' ? video : undefined);
        //localP.setScreenShareEnabled(!!screen, typeof screen !== 'boolean' ? screen : undefined);
        localP.setMicrophoneEnabled(true);
        localP.setCameraEnabled(true);

        setParticipants(Array.from(room.participants, (item) => item[1]));
      } catch (e) {
        console.warn(e);
      }
    };

    const onConnectionStateChanged = (state: ConnectionState) => {
      //       switch (state) {
      //         case ConnectionState.Disconnected:
      //           if (onDisconnected) onDisconnected();
      //           break;
      //         case ConnectionState.Connected:
      //           if (onConnected) onConnected();
      //           break;
      //         default:
      //           break;
    };

    const onParticipantConnected = (participant: Participant) => {
      setParticipants(Array.from(room.participants, (item) => item[1]));
    };
    room.on(RoomEvent.SignalConnected, onSignalConnected);
    room.on(RoomEvent.ConnectionStateChanged, onConnectionStateChanged);
    room.on(RoomEvent.ParticipantConnected, onParticipantConnected);
    return () => {
      room.off(RoomEvent.SignalConnected, onSignalConnected);
      room.off(RoomEvent.ConnectionStateChanged, onConnectionStateChanged);
      room.off(RoomEvent.ParticipantConnected, onParticipantConnected);
    };
  }, [room]);

  const [participants, setParticipants] = useState<RemoteParticipant[]>();
  useEffect(() => {
    if (!room) return;

    // if (simulateParticipants) {
    //     room.simulateParticipants({
    //       participants: {
    //         count: simulateParticipants,
    //       },
    //       publish: {
    //         audio: true,
    //         useRealTracks: true,
    //       },
    //     });
    //   }

    room
      .connect(
        "wss://lk.aquro.com",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzU5MzY4MDAsImlzcyI6IkFQSWJuSGNOZmR1NDhSQSIsIm5hbWUiOiJ1c2VyMyIsIm5iZiI6MTY3NTg1MDQwMCwic3ViIjoidXNlcjMiLCJ2aWRlbyI6eyJyb29tIjoibXktZmlyc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.Ebm9t3SdEGDKBvR2GS_QFJj88GGR_pPdVSLyzgexrjc",
        connectOptions
      )
      .catch((e) => {
        console.warn(e);
      });
  }, [room, connectOptions]);

  useEffect(() => {
    if (!room) return;
    return () => {
      console.debug("disconnecting on unmount");
      room.disconnect();
    };
  }, []);

  return (
    <>
      {room && <AudioTracksManager room={room}></AudioTracksManager>}
      {room && room.localParticipant && <ParticipantView participant={room.localParticipant}></ParticipantView>}
      {participants?.map((part) => (
        <ParticipantView key={part.identity} participant={part}></ParticipantView>
      ))}
      <div>Hello wowlrd</div>
    </>
  );
}



function ParticipantView({ participant }: { participant: Participant }) {
 
  const [track, setTrack] = useState<TrackPublication | null>(null);
  const findVideoTrack = () => {
    let subscibedTracks : TrackPublication[] = [];
    participant.videoTracks.forEach((track) => {
    if(track.isSubscribed && track.source === "camera")  subscibedTracks.push(track)
    })
    if(subscibedTracks.length > 0){
    setTrack(subscibedTracks[0])
    }
}

  const onTrackSubscribed = () => {
    findVideoTrack();
  };

  const onTrackPublished = () => {
    console.log("Track published")
    findVideoTrack();
  };  

  


  useEffect(() => {
    participant.on(ParticipantEvent.TrackSubscribed, onTrackSubscribed);
    participant.on(ParticipantEvent.LocalTrackPublished, onTrackPublished)
    findVideoTrack();
    return () => {
        participant.off(ParticipantEvent.TrackSubscribed, onTrackSubscribed);
        participant.off(ParticipantEvent.LocalTrackPublished, onTrackPublished)
    }
  }, []);



  return (
    <div>
      <div>{participant.identity}</div>
        <VideoPlayer track={track}></VideoPlayer>
    </div>
  );
}


function VideoPlayer({track} : { track?: TrackPublication | null }){
    const element = React.useRef<HTMLVideoElement>(null);
    const previousElement = React.useRef<HTMLMediaElement | undefined | null>();
  
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
          if (previousElement.current) {
              track.videoTrack!.detach(previousElement.current);
          }
        };
      }, [ track]);

      return <video ref={element} muted={true}></video>

}

function AudioTracksManager({ room }: { room: Room }) {
  const [audioTracks, setAudioTracks] = useState<RemoteTrack[]>([]);

  const onTrackSubscibed = (track: RemoteTrack) => {
    if (track.kind === "audio") {
      setAudioTracks([...audioTracks, track]);
    }
  };

  useEffect(() => {
    room.on(RoomEvent.TrackSubscribed, onTrackSubscibed);
    return () => {
      room.off(RoomEvent.TrackSubscribed, onTrackSubscibed);
    };
  }, []);

  return (
    <>
      {audioTracks.map((a, i) => (
        <AudioPlayer track={a} key={i}></AudioPlayer>
      ))}
    </>
  );
}

function AudioPlayer({ track }: { track: RemoteTrack }) {
  const element = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!element.current) return;
    track.attach(element.current);
  }, []);

  return <audio ref={element}></audio>;
}
