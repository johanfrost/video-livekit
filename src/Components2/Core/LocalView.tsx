import { ReactElement } from "react";
import { videoSource } from "../schemas/videoSource";
import { ParticipantManager } from "./ParticipantManager";
import { useRoom } from "./Room";


export function LocalView({children, videoSource = "camera"} : { children : ReactElement, videoSource? : videoSource}){
    const {room} = useRoom();
    if(!room) return null;

    return <ParticipantManager participant={room.localParticipant} videoSource={videoSource}>{children}</ParticipantManager>

}