import { Box, VStack } from "@chakra-ui/react";
import { ParticipantList, ScreenShareList } from "../Participant";

export function Sidebar({width = 200, enableParticipantMultiView = false, showScreenshareAsParticipant  = true}: {width? : number, enableParticipantMultiView? : boolean, showScreenshareAsParticipant? : boolean}){
    return <VStack width={`${width}px`}>
        
        <ParticipantList enableParticipantMultiView={enableParticipantMultiView}></ParticipantList>
        {showScreenshareAsParticipant && <ScreenShareList></ScreenShareList>}
    </VStack>
}