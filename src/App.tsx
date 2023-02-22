import { Button, ChakraProvider, Input, theme, VStack } from "@chakra-ui/react";
import "./App.css";
import { LocalView } from "./Components2/Core/LocalView";
import { Room } from "./Components2/Core/Room";
import { SourceVideo } from "./Components2/Core/SourceVideo";
import { VuiConnected, VuiDisconnected } from "./Components2/UI/VuiConnected";
import { VuiToolbar } from "./Components2/UI/VuiToolbar";

import { useState } from "react";
import { VuiFocusCard } from "./Components2/UI/VuiFocusCard";
import { VuiParticipantGrid } from "./Components2/UI/VuiParticipantGrid";
import { VuiMirror } from "./Components2/UI/VuiMirror";








export const App = () => {

  const [viewMode, setViewMode] = useState<"grid" | "focus">("grid");
  const [token, setToken] = useState<string>("");

  return <ChakraProvider theme={theme}>

    {token ? <Room token={token} url="wss://lk.aquro.com">
      <>
      {viewMode ===  "grid" && <div style={{height: "100vh"}}>
        <VuiParticipantGrid sizeMode="cover" includeSelf={false} includeScreenshare={false} mode="multiview" screenshareSizeMode="contain" clickToSwitcFocusview={true} onClick={()=>{
          setViewMode("focus");
        }} ></VuiParticipantGrid>
      </div>
      }
      {viewMode ===  "focus" && <div style={{height: "100vh"}}>
        <VuiFocusCard sizeMode="cover" screenShareSizeMode="contain" mode="multiview" onClick={()=>{
          setViewMode("grid");
        }}></VuiFocusCard>
      </div>
      }
      <div style={{position : "fixed", right : "10px", top : "10px" }} >
        <VuiMirror mode="multiview" ></VuiMirror>
      </div>
      
      
      <div style={{position : "fixed", bottom : "20px", left : "50%", transform : "translateX(-50%)", zIndex : 1000}}>
        
        <VuiConnected>
          <VuiToolbar ></VuiToolbar>
        </VuiConnected>
        <VuiDisconnected>
          Call is disconnected
        </VuiDisconnected>

      </div>

      </>

     
    </Room> :<ShowToken updateToken={setToken}></ShowToken> }
    
  </ChakraProvider>
}


const ShowToken = ({updateToken} : { updateToken : (token : string)=>void}) => {
  const [token, setToken] = useState<string>("");

  return <VStack>
    <Input value={token} onChange={(ev)=>setToken(ev.currentTarget.value)} placeholder="Token"/>
    <Button onClick={()=>{
      updateToken(token)
    }}>Set token</Button>
  </VStack>

}

const SimpleCall = () => {
  return <div style={{ position : "fixed", left : "0px", top : "0px", right : "0px", bottom : "0px", backgroundColor : "#000"}}>
    <div style={{ position : "absolute", right : "10px", top : "10px", width : "150px", overflow : "hidden", borderRadius : "3px"}}>
    <LocalView>
        <SourceVideo></SourceVideo>
      </LocalView>
    </div>
    
  </div>
}

