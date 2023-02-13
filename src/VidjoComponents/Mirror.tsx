import { Box } from "@chakra-ui/react";
import { ParticipantManager, ParticipantVideo } from "./Participant";
import { useRoom } from "./Room"

export function Mirror({containerStyle} : {containerStyle? : React.CSSProperties}){
    const room = useRoom();

    return <Box style={containerStyle}>
        {room && room.localParticipant && <ParticipantManager participant={room.localParticipant}><ParticipantVideo></ParticipantVideo></ParticipantManager>}
    </Box>

}