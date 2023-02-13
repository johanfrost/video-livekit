import { Box, ChakraProvider, Flex, HStack, theme } from "@chakra-ui/react";
import "./App.css";
import { MainView } from "./VidjoComponents/MainView";
import { Mirror } from "./VidjoComponents/Mirror";
import { Room } from "./VidjoComponents/Room";
import { Sidebar } from "./VidjoComponents/UI/Sidebar";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Room>
      <>
        <Box width={"100vw"} height={"100vh"} backgroundColor="#333">
          <HStack height={"100%"} width={"100%"}>
            <Flex flex={1} height={"100%"} alignItems={"center"} justifyContent={"center"}>
              <MainView enableParticipantMultiView={true}></MainView>
            </Flex>
            <Flex width="250px" height={"100%"} flexDir={"column"}>
              <Flex flex={1} p={5}>
                <Sidebar></Sidebar>
              </Flex>
              <Flex>
                <Box width="250px">
                  <Mirror></Mirror>
                </Box>
              </Flex>
            </Flex>
          </HStack>
        </Box>
        {/* <Box height={"100vh"}>
          <MainView enableParticipantMultiView={true}></MainView>
          <Flex gap={5} flexWrap={"wrap"} height="100vh" alignItems={"center"} justifyContent="center">
            <ParticipantList participantContainerStyle={{ backgroundColor: "#f00", padding: "10px", flex: 1, minWidth: "500px" }} enableParticipantMultiView={true}></ParticipantList>
            {/* <ScreenShareList screenshareContainerStyle={{ backgroundColor: "#f00", padding: "10px", flex: 1, minWidth: "500px" }}></ScreenShareList> 
          </Flex>
          <Mirror containerStyle={{ maxWidth: "200px", position: "absolute", right: "10px", bottom: "10px" }}></Mirror>
        </Box> */}
      </>
    </Room>
  </ChakraProvider>
);
