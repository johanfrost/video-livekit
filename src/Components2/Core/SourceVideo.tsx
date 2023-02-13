
import { ParticipantEvent, TrackPublication } from "livekit-client";
import { useEffect, useState } from "react";
import { videoSource } from "../schemas/videoSource";
import { useParticipant, useVideoSource } from "./ParticipantManager";
import { useRoom } from "./Room";

import { VideoView } from "./VideoView";

export function SourceVideo({style } : { style? : React.CSSProperties}){
    const participant =   useParticipant();
    const videoSource = useVideoSource();
    const { context } = useRoom();


    
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
  
  
    return track ? <VideoView track={track} style={style}></VideoView> : null
    
  
  
 
}