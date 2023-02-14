import { Participant } from "livekit-client";
import { ReactElement, useEffect, useState } from "react";
import { ParticipantManager  } from "./ParticipantManager";
import { useFocusView, useParticipants, useRoom } from "./Room";


export function FocusView({ children } : { children : ReactElement}){
    const focusView  = useFocusView()
    const { room } =useRoom();
    const participants = useParticipants();
    const [participant, setParticipant] = useState<Participant | null>(null)
    useEffect(()=>{
        if(!focusView  || !focusView.focusView || !participants) return;
        let participant = participants.find(p=>p.identity === focusView.focusView.participantId)
        if(!participant){
            if(room?.localParticipant?.identity === focusView.focusView.participantId ){
                participant = room.localParticipant
            }
        }
        setParticipant(participant || null)

    }, [focusView, participants])


    if(!focusView || !focusView.focusView || !participants || !participant) return null;

    return <ParticipantManager participant={participant} videoSource={focusView.focusView.videoSource}>{children}</ParticipantManager>

    
}