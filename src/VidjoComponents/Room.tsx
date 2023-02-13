
import { LiveKitRoom, MessageFormatter, RoomAudioRenderer, TileLoop } from "@livekit/components-react";
import { ConnectionState, LocalParticipant, LocalTrackPublication, Participant, ParticipantEvent, RemoteAudioTrack, RemoteParticipant, RemoteTrack, RemoteTrackPublication, Room, RoomConnectOptions, RoomEvent, RoomOptions, TrackPublication } from "livekit-client";
import React, { createContext, ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { AudioTracksManager } from "./Audio";
import { ParticipantList } from "./Participant";
import { VideoPlayer } from "./VideoPlayer";



interface RoomCtx {
    room? : Room
    participants? : Participant[],
    refreshParticipants : () => void,
    setMainView : (participantId : string, videoSource : "camera" | "screen_share") => void,
    mainView? : {participantId : string, videoSource : "camera" | "screen_share"} | null
}



export function useRoom(){
    const context = useContext(RoomContext)
    if(!context) return null;
    return context.room
}

export function useParticipants(){
    const context = useContext(RoomContext)
    if(!context) return null;
    return context.participants
}

export function useRoomContext(){
    const context = useContext(RoomContext)
   return context;
}

export function useMainView(){
    const context = useContext(RoomContext)
    if(!context) return null;
    return context.mainView
}






 const RoomContext = createContext<RoomCtx | null>(null)

 let RoomContextValue : RoomCtx  = { refreshParticipants : () => {}, setMainView : () => {}  };

function RoomComponent({children} : {children? : ReactElement}) {
    const options: RoomOptions = useMemo(() => ({}), []);
    const connectOptions: RoomConnectOptions = useMemo(() => ({}), []);
  
    const [room, setRoom] = useState<Room>();
  
    const [mainViewProp, setMainViewProp] = useState< {participantId : string, videoSource : "camera" | "screen_share"} | null>(null)

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
          refreshParticipants()
          //setParticipants(Array.from(room.participants, (item) => item[1]));
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
        refreshParticipants();
        //setParticipants(Array.from(room.participants, (item) => item[1]));
      };

      const onParticipantDisconnected = (participant: Participant) => {
        refreshParticipants();
//        setParticipants(Array.from(room.participants, (item) => item[1]));
      };


      room.on(RoomEvent.SignalConnected, onSignalConnected);
      room.on(RoomEvent.ConnectionStateChanged, onConnectionStateChanged);
      room.on(RoomEvent.ParticipantConnected, onParticipantConnected);
      room.on(RoomEvent.ParticipantDisconnected, onParticipantDisconnected)
      return () => {
        room.off(RoomEvent.SignalConnected, onSignalConnected);
        room.off(RoomEvent.ConnectionStateChanged, onConnectionStateChanged);
        room.off(RoomEvent.ParticipantConnected, onParticipantConnected);
        room.off(RoomEvent.ParticipantDisconnected, onParticipantDisconnected)
      };
    }, [room]);

    const refreshParticipants = () => {
        if(!room) return;

        const participants = Array.from(room.participants, (item) => item[1]);
        setParticipants(participants);


        if(!mainViewProp || !mainViewProp.participantId ){
            if(participants.length > 0){
                setMainView(participants[0].identity, "camera");
            }
        }

      }

      

    const setMainView = (participantId : string, videoSource : "camera" | "screen_share") => {
        console.log({participantId,videoSource })
        setMainViewProp({participantId,videoSource })
    }

  
    const [participants, setParticipants] = useState<RemoteParticipant[]>();
    useEffect(() => {
      if (!room) return;
  

      room
        .connect(
          "wss://lk.aquro.com",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzYzMzI4NDksImlzcyI6IkFQSWJuSGNOZmR1NDhSQSIsIm5hbWUiOiJ1c2VyMiIsIm5iZiI6MTY3NTk3Mjg0OSwic3ViIjoidXNlcjIiLCJ2aWRlbyI6eyJyb29tIjoibXktZmlyc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.mlTAsbCyC-PvyAsxzzb6ft7lMpKRHsgqlOZWiR8TXiQ",
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
    
    
    RoomContextValue.room = room;
    RoomContextValue.participants = participants;
    console.log("Children", children)
    return (
        <>
        {room && <RoomContext.Provider value={{ room , participants, refreshParticipants, setMainView, mainView : mainViewProp }}>
            <>
                <AudioTracksManager></AudioTracksManager>
                {children}
        </>
        </RoomContext.Provider>
        }
        </>
    );
  }
  
  
  

  
  

  




  export { RoomComponent as Room } 

