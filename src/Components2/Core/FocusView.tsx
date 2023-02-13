import { Participant } from "livekit-client";
import { ReactElement, useEffect, useState } from "react";
import { ParticipantManager  } from "./ParticipantManager";
import { useFocusView, useParticipants } from "./Room";


export function FocusView({ children } : { children : ReactElement}){
    const focusView = useFocusView()
    const participants = useParticipants();
    const [participant, setParticipant] = useState<Participant | null>(null)
    useEffect(()=>{
        if(!focusView || !participants) return;
        const participant = participants.find(p=>p.identity === focusView.participantId)
        setParticipant(participant || null)

    }, [focusView, participants])


    if(!focusView || !participants || !participant) return null;

    return <ParticipantManager participant={participant} videoSource={focusView.videoSource}>{children}</ParticipantManager>

    
}