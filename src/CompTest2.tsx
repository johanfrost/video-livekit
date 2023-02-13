import { Box } from "@chakra-ui/react";

import { ParticipantList, ParticipantManager, ParticipantName } from "./VidjoComponents/Participant";

export function CompTest2(){
    return <>
            <ParticipantList participantTemplate={<Box><ParticipantName></ParticipantName></Box>}></ParticipantList>
       </>
}

