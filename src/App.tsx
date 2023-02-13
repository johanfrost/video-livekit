import { Box, ChakraProvider, Flex, HStack, theme } from "@chakra-ui/react";
import "./App.css";
import { SourceVideo } from "./Components2/Core/SourceVideo";
import { Room } from "./Components2/Core/Room";
import { SourceList } from "./Components2/Core/SourceList";
import { FocusView } from "./Components2/Core/FocusView";
import { LocalView } from "./Components2/Core/LocalView";
import { VuiMicrophone } from "./Components2/UI/VuiMicrophone";




export const App = () => (
  <ChakraProvider theme={theme}>
    <Room>
      <>
      <SimpleCall></SimpleCall>

      <div style={{ position : "fixed", "top" : "10px",  "zIndex" : 1000}}>
        aaa
        <VuiMicrophone></VuiMicrophone>
      </div>
      </>

      {/* <>
      <LocalView>
        <SourceVideo></SourceVideo>
      </LocalView>
      <FocusView>
        <SourceVideo></SourceVideo>
      </FocusView>
      <SourceList videoSources={["camera", "screen_share"]}>
        <Box>
          <Box>aaa</Box>
          <SourceVideo></SourceVideo>
        </Box>
      </SourceList>
      </> */}
    </Room>
    
  </ChakraProvider>
);


const SimpleCall = () => {
  return <div style={{ position : "fixed", left : "0px", top : "0px", right : "0px", bottom : "0px", backgroundColor : "#000"}}>
    <div style={{ position : "absolute", right : "10px", top : "10px", width : "150px", overflow : "hidden", borderRadius : "3px"}}>
    <LocalView>
        <SourceVideo></SourceVideo>
      </LocalView>
    </div>
    <FocusView>
      <>
      
      <SourceVideo style={{
    height: "100%",
    objectFit: "cover"

      }}></SourceVideo>

      </>
    </FocusView>    
  </div>
}

