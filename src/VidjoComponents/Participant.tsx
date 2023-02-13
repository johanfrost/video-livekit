import { Box } from "@chakra-ui/react";

import { Participant, ParticipantEvent, TrackPublication } from "livekit-client";
import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import { useParticipants,  useRoomContext } from "./Room";
import { VideoPlayer } from "./VideoPlayer";


const ParticipantContext = createContext<Participant | null>(null)


function useParticipant(){
    return useContext(ParticipantContext)
}

export function ParticipantManager( { children, participant } : { participant : Participant, children : ReactElement}){
    return <ParticipantContext.Provider value={participant}>
        {children}
    </ParticipantContext.Provider>
}

export function ParticipantView({multiView = false, singleViewPrimary  ="camera"} : { multiView? : boolean, singleViewPrimary? :"camera" | "screen_share" }){
    const participant = useParticipant();
    const [multiviewPrimary, setmultiviewPrimary] = useState<"camera" | "screen_share">(singleViewPrimary);
    const context = useRoomContext();

    useEffect(()=>{
        setmultiviewPrimary(singleViewPrimary)
    }, [singleViewPrimary])
    

    if(!participant) return null;


    let hasScreenshare = false;
    participant.videoTracks.forEach((track) => {
        if(track.isSubscribed && track.source === "screen_share") hasScreenshare  = true;
    })

    if(multiView && !hasScreenshare && multiviewPrimary !== "screen_share"){
        setmultiviewPrimary("screen_share");
    }

    if(hasScreenshare && multiView){
       return <div style={{"position" : "relative", "width" : "100%"}} onDoubleClick={()=>{
        context?.setMainView(participant.identity, multiviewPrimary)
       }}>
        <ParticipantName></ParticipantName>
        <ParticipantVideo videoSource={multiviewPrimary}></ParticipantVideo>    
        
        <div style={{position : "absolute", right : "20px", bottom : "20px", width : "30%", maxWidth : "200px", cursor : "pointer"}} onClick={()=>{
            setmultiviewPrimary(multiviewPrimary === "camera" ? "screen_share" : "camera");
        }}>
        <ParticipantVideo  videoSource={multiviewPrimary === "camera" ? "screen_share" : "camera"}></ParticipantVideo>
        
        </div>
        
    </div>
    }




    return <div style={{"position" : "relative", "width" : "100%"}} onClick={()=>{
        context?.setMainView(participant.identity, multiviewPrimary)
       }}>
        <ParticipantName></ParticipantName>
        <ParticipantVideo videoSource={singleViewPrimary}></ParticipantVideo>
        
        
    </div>
}

export function ScreenshareView(){
    const participant = useParticipant();
    const context = useRoomContext();
    if(!participant) return null;
    return <div onClick={()=>{
        context?.setMainView(participant.identity, "screen_share")
       }}>
        <ParticipantVideo videoSource="screen_share"></ParticipantVideo>
    </div>
}

export function ParticipantName(){
    const participant = useParticipant();
    if(!participant) return null;
    return <div>{participant.identity}</div>
}


export function ParticipantVideo({videoSource = "camera"} : {videoSource ? : "camera" | "screen_share" }){
    const participant = useParticipant();

    const context = useRoomContext();

    const [track, setTrack] = useState<TrackPublication | null>(null);

    const onTrackSubscribed = () => {
        findVideoTrack();
      context?.refreshParticipants &&  context?.refreshParticipants();
      };
    
      const onTrackPublished = () => {
        findVideoTrack();
        context?.refreshParticipants && context?.refreshParticipants();
      };  

      const onTrackUnsubscribed = () => {
        findVideoTrack();
        context?.refreshParticipants && context?.refreshParticipants();
      }

      const findVideoTrack = () => {
        if(!participant) return;
        let subscibedTracks : TrackPublication[] = [];

        participant.videoTracks.forEach((track) => {
        if(track.isSubscribed && track.source === videoSource)  subscibedTracks.push(track)
        })
        if(subscibedTracks.length > 0){
            setTrack(subscibedTracks[0])
        }else{
            setTrack(null);
        }
    }
  
      
    useEffect(() => {
        if(!participant) return;
        participant.on(ParticipantEvent.TrackSubscribed, onTrackSubscribed);
        participant.on(ParticipantEvent.TrackUnsubscribed, onTrackUnsubscribed)
        participant.on(ParticipantEvent.LocalTrackPublished, onTrackPublished)
        findVideoTrack();
        return () => {
            participant.off(ParticipantEvent.TrackSubscribed, onTrackSubscribed);
            participant.off(ParticipantEvent.TrackUnsubscribed, onTrackUnsubscribed)
            participant.off(ParticipantEvent.LocalTrackPublished, onTrackPublished)
        }
      }, [videoSource,participant]);


    if(!participant) return null;
  
  
    return track ? <VideoPlayer track={track}></VideoPlayer> : null
    
  
  
 
}


export function ParticipantContainer({ children, containerStyle, participantMultiView = false } : { children? : ReactElement, containerStyle? : React.CSSProperties, participantMultiView? : boolean} ){
    const participant = useParticipant();
    if(!participant) return null;

    const template = children ? children : <ParticipantView multiView={participantMultiView}></ParticipantView>

    return <Box style={containerStyle}>
        {template}
    </Box>

}

export function ScreenshareContainer({ children, containerStyle } : { children? : ReactElement, containerStyle? : React.CSSProperties}){
    const participant = useParticipant();
    if(!participant) return null;

    const template = children ? children : <ScreenshareView></ScreenshareView>

    return <Box style={containerStyle}>
        {template}
    </Box>

}




export function ParticipantList({participantTemplate, participantContainerStyle, enableParticipantMultiView} : { participantTemplate? : ReactElement, participantContainerStyle? : React.CSSProperties, enableParticipantMultiView? : boolean}){
    const participants = useParticipants();
    if(!participants) return null;

        const ViewComponent = participantTemplate ? participantTemplate : <ParticipantContainer containerStyle={participantContainerStyle} participantMultiView={enableParticipantMultiView}/>;
    return <>
        {participants.map(part => <ParticipantManager key={part.identity} participant={part}>{ViewComponent}</ParticipantManager>)}
        </>
}



export function ScreenShareList({screenshareTemplate, screenshareContainerStyle} : { screenshareTemplate? : ReactElement, screenshareContainerStyle? : React.CSSProperties}){
    const participants = useParticipants();
    if(!participants) return null;

    const filteredParticipants = participants.filter(participant=>{
        let subscibedTracks : TrackPublication[] = [];

        participant.videoTracks.forEach((track) => {
        if(track.isSubscribed && track.source === "screen_share")  subscibedTracks.push(track)
        })
        return subscibedTracks.length > 0


    })


        const ViewComponent = screenshareTemplate ? screenshareTemplate : <ScreenshareContainer containerStyle={screenshareContainerStyle}/>;
    return <>
        {filteredParticipants.map(part => <ParticipantManager key={`${part.identity}_screen`} participant={part}>{ViewComponent}</ParticipantManager>)}
        </>
}


