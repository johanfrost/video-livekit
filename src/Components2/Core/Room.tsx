import { ConnectionState, Participant, ParticipantEvent, RemoteParticipant, Room, RoomConnectOptions, RoomEvent, RoomOptions } from "livekit-client";
import { createContext, ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { focusViewData } from "../schemas/focusViewData";
import { videoSource } from "../schemas/videoSource";
import { AudioTracksManager } from "./Audio";

interface RoomCtx {
  room?: Room;
  participants?: Participant[];
  refreshParticipants: () => void;
  setFocusView: (participantId: string, videoSource: videoSource) => void;
  focusView?: focusViewData | null;
  connected? : boolean
}


export function useScreenshare() {
  const context = useContext(RoomContext);
  
  const [enabled, setEnabled] = useState<boolean>(context?.room?.localParticipant.isScreenShareEnabled || false)

  useEffect(()=>{
        setEnabled(context?.room?.localParticipant.isScreenShareEnabled || false);
  }, [context?.room?.localParticipant.isScreenShareEnabled])
  
  context?.room?.localParticipant.on(ParticipantEvent.LocalTrackPublished, (track)=>{
    setEnabled(context?.room?.localParticipant.isScreenShareEnabled || false)
  })
  context?.room?.localParticipant.on(ParticipantEvent.LocalTrackUnpublished, (track)=>{
    setEnabled(context?.room?.localParticipant.isScreenShareEnabled || false)
  })

  if (!context) {
    return {
      isEnabled: undefined,
    };
  }


  return {
    isEnabled:  enabled,
    enable: () => {
      context.room?.localParticipant.setScreenShareEnabled(true);
      setEnabled(true)
    },
    disable: () => {
      context.room?.localParticipant.setScreenShareEnabled(false);
      setEnabled(false)
    },
  };
}




export function useMicrophone() {
  const context = useContext(RoomContext);
  
  const [enabled, setEnabled] = useState<boolean>(context?.room?.localParticipant.isMicrophoneEnabled || false)

  useEffect(()=>{
        setEnabled(context?.room?.localParticipant.isMicrophoneEnabled || false);
  }, [context?.room?.localParticipant.isMicrophoneEnabled])


  
  context?.room?.localParticipant.on(ParticipantEvent.TrackMuted, (track)=>{
    setEnabled(context?.room?.localParticipant.isMicrophoneEnabled || false)
  })
  context?.room?.localParticipant.on(ParticipantEvent.TrackUnmuted, (track)=>{
    setEnabled(context?.room?.localParticipant.isMicrophoneEnabled || false)
  })   

  if (!context) {
    return {
      isEnabled: undefined,
    };
  }


  return {
    isEnabled:  enabled,
    enable: () => {
      context.room?.localParticipant.setMicrophoneEnabled(true);
      setEnabled(true)
    },
    disable: () => {
      context.room?.localParticipant.setMicrophoneEnabled(false);
      setEnabled(false)
    },
  };
}



export function useCamera() {
  const context = useContext(RoomContext);
  
  const [enabled, setEnabled] = useState<boolean>(context?.room?.localParticipant.isCameraEnabled || false)

  useEffect(()=>{
        setEnabled(context?.room?.localParticipant.isCameraEnabled || false);
  }, [context?.room?.localParticipant.isCameraEnabled])


  
  context?.room?.localParticipant.on(ParticipantEvent.TrackMuted, (track)=>{
    setEnabled(context?.room?.localParticipant.isCameraEnabled || false)
  })
  context?.room?.localParticipant.on(ParticipantEvent.TrackUnmuted, (track)=>{
    setEnabled(context?.room?.localParticipant.isCameraEnabled || false)
  }) 

  if (!context) {
    return {
      isEnabled: undefined,
    };
  }


  return {
    isEnabled:  enabled,
    enable: () => {
      context.room?.localParticipant.setCameraEnabled(true);
      setEnabled(true)
    },
    disable: () => {
      context.room?.localParticipant.setCameraEnabled(false);
      setEnabled(false)
    },
  };
}

export function useRoom() {
  const context = useContext(RoomContext);
  if (!context) {
    return {
      room: undefined,
      context: undefined,
    };
  }
  return { room: context.room, context: context };
}

export function useParticipants() {
  const context = useContext(RoomContext);
  if (!context) return null;
  return context.participants;
}

export function useFocusView() {
  const context = useContext(RoomContext);
  if (!context) return null;
  return context.focusView;
}

const RoomContext = createContext<RoomCtx | null>(null);

function RoomComponent({ children }: { children?: ReactElement }) {
  const options: RoomOptions = useMemo(() => ({}), []);
  const connectOptions: RoomConnectOptions = useMemo(() => ({}), []);

  const [room, setRoom] = useState<Room>();

  const [focusViewData, setFocusViewData] = useState<focusViewData | null>(null);

  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    setRoom(new Room(options));
  }, [options]);

  useEffect(() => {
    if (!room) return;
    const onSignalConnected = () => {
      const localP = room.localParticipant;
      
      try {
        setConnected(true);
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

    const onDisconnected = () => {
      console.log("Room disconnected")
      setConnected(false);
    }

    const onParticipantConnected = (participant: Participant) => {
      setParticipants(Array.from(room.participants, (item) => item[1]));
    };

    const onParticipantDisconnected = (participant: Participant) => {
      setParticipants(Array.from(room.participants, (item) => item[1]));
    };

    room.on(RoomEvent.SignalConnected, onSignalConnected);
    room.on(RoomEvent.ConnectionStateChanged, onConnectionStateChanged);
    room.on(RoomEvent.ParticipantConnected, onParticipantConnected);
    room.on(RoomEvent.ParticipantDisconnected, onParticipantDisconnected);
    room.on(RoomEvent.Disconnected, onDisconnected)
    return () => {
      room.off(RoomEvent.SignalConnected, onSignalConnected);
      room.off(RoomEvent.ConnectionStateChanged, onConnectionStateChanged);
      room.off(RoomEvent.ParticipantConnected, onParticipantConnected);
      room.off(RoomEvent.ParticipantDisconnected, onParticipantDisconnected);
      room.off(RoomEvent.Disconnected, onDisconnected)
    };
  }, [room]);

  const refreshParticipants = () => {
    if (!room) return;

    const participants = Array.from(room.participants, (item) => item[1]);
    setParticipants(participants);

    if (!focusViewData || !focusViewData.participantId) {
      if (participants.length > 0) {
        setFocusView(participants[0].identity, "camera");
      }
    }
  };

  const setFocusView = (participantId: string, videoSource: "camera" | "screen_share") => {
    console.log({ participantId, videoSource });
    setFocusViewData({ participantId, videoSource });
  };

  const [participants, setParticipants] = useState<RemoteParticipant[]>();
  useEffect(() => {
    if (!room) return;

    room
      .connect(
        "wss://lk.aquro.com",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzYzMzI4MjcsImlzcyI6IkFQSWJuSGNOZmR1NDhSQSIsIm5hbWUiOiJ1c2VyMSIsIm5iZiI6MTY3NTk3MjgyNywic3ViIjoidXNlcjEiLCJ2aWRlbyI6eyJyb29tIjoibXktZmlyc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.2Hz79HrJ9tzx1vprEDQIHPfJ7DO2Qp19Ikj_dfbZYKM",
        connectOptions
      )
      .catch((e) => {
        console.warn(e);
      });
  }, [room, connectOptions]);

  //Disconnect room on unmount
  useEffect(() => {
    if (!room) return;
    return () => {
      room.disconnect();
    };
  }, []);

  console.log("connected", connected)
  return (
    <>
      {room && (
        <RoomContext.Provider value={{ room, participants, refreshParticipants, setFocusView, focusView: focusViewData, connected }}>
          <>
            <AudioTracksManager></AudioTracksManager>
            {children}
          </>
        </RoomContext.Provider>
      )}
    </>
  );
}

export { RoomComponent as Room };
