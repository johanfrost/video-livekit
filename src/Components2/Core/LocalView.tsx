import { ReactElement } from "react";
import { ParticipantManager } from "./ParticipantManager";
import { useRoom } from "./Room";


export function LocalView({children} : { children : ReactElement}){
    const {room} = useRoom();
    if(!room) return null;

    return <ParticipantManager participant={room.localParticipant} videoSource="camera">{children}</ParticipantManager>

}