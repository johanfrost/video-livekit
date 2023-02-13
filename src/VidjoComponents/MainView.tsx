import { Participant } from "livekit-client";
import { ReactElement, useEffect, useState } from "react";
import { ParticipantManager, ParticipantView } from "./Participant";
import { useMainView, useParticipants } from "./Room";


export function MainView({enableParticipantMultiView = false, mainViewTemplate } : {enableParticipantMultiView? : boolean, mainViewTemplate? : ReactElement}){
    const mainView = useMainView()
    const participants = useParticipants();
    const [participant, setParticipant] = useState<Participant | null>(null)
    useEffect(()=>{
        if(!mainView || !participants) return;
        const participant = participants.find(p=>p.identity === mainView.participantId)
        setParticipant(participant || null)

    }, [mainView])


    if(!mainView || !participants || !participant) return null;

    const ViewComponent = mainViewTemplate ? mainViewTemplate :  <ParticipantView multiView={enableParticipantMultiView} singleViewPrimary={mainView.videoSource}></ParticipantView>;
    return <ParticipantManager participant={participant}>{ViewComponent}</ParticipantManager>

    
}