import { Participant } from "livekit-client"
import { createContext, ReactElement, useContext } from "react"
import { videoSource } from "../schemas/videoSource";

export interface ParticipantCtx  {
    participant : Participant;
    videoSource : videoSource
}
const ParticipantContext = createContext< ParticipantCtx | null>(null)

export function useParticipant(){
    return useContext(ParticipantContext)?.participant
}
export function useVideoSource(){
    return useContext(ParticipantContext)?.videoSource
}
export function useParticipantContext(){
    return useContext(ParticipantContext)
}

export function ParticipantManager( { children, participant, videoSource } : { participant : Participant, children : ReactElement, videoSource : videoSource}){
    console.log("participant", participant)
    console.log("children", children)
    console.log("Participant manager")
    return <ParticipantContext.Provider value={ { participant, videoSource} }>
      {children}
    </ParticipantContext.Provider>
}
