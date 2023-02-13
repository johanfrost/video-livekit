import { Box, Flex, Grid } from "@chakra-ui/react";
import { createContext, ReactElement, useContext } from "react"

export function CompTest(){
    return <>
    <Flex flexWrap={"wrap"} justifyContent="center" >
        <List template={<Box backgroundColor={"#0f0"} width="25%" style={{aspectRatio : 1/0.75}}>
            <ParticipantView/>
        </Box>}></List>
        </Flex>
<List></List>    </>
}


export function List({template, container} : { template? : ReactElement, container? : ReactElement}){

    const ViewComponent = template ? template : <ParticipantContainer/>;

    const ViewContainer = container ? container : <Box></Box>

    return <>
        {[1,2,3,4,5].map(idx => <Part id={`id_${idx}`} key={idx} name={`name_${idx}`} template={ViewComponent} ></Part>)}
        </>
}

export function ParticipantContainer(){

    return <Box backgroundColor={"#f00"}><ParticipantView></ParticipantView></Box>
}


export function Part({id, name, template} : { id : string, name : string, template : ReactElement}){
    return <ParticipantContext.Provider value={{ id , name }}>
        {template}
    </ParticipantContext.Provider>
}

export function ParticipantView(){
    const participant = useContext(ParticipantContext);

    return <div>Participant <PartName></PartName></div>
}

function useParticipant(){
    return useContext(ParticipantContext)
}

export function PartName(){
    const participant = useParticipant();
    return <div onClick={()=>{console.log(participant.name)}}>{participant.name}</div>
}


export const ParticipantContext = createContext({ "id" : "","name" : ""})