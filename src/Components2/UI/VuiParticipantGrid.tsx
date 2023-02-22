import { CSSProperties } from "styled-components";
import { useFocusView, useParticipants, useRoom } from "../Core/Room";

import { VuiMultiviewProps } from "./VuiMultiview";
import { getComponentVariant, useVuiTheme } from "./VuiTheme";

import { Participant, Track } from "livekit-client";
import { videoSource } from "../schemas/videoSource";
import { VuiParticipantCard } from "./VuiParticipantCard";
import { ViuCoreComponent } from "./Core/VuiCoreCompont";





export interface VuiParticipantGridProps{
    containerStyle? : CSSProperties,
    itemStyle? : CSSProperties,
    cellStyle? : CSSProperties,
    mode?: "standard" | "multiview";
    multiviewSettings? : VuiMultiviewProps;
    includeSelf? : boolean;
    includeScreenshare? : boolean;
    sizeMode? : "cover" | "contain";
    screenshareSizeMode? : "cover" | "contain";
    onClick? : (participantId : string, videoSource : videoSource) => void;
    clickToSwitcFocusview? : boolean;
  }
  
  interface ParticipantGridElement{
    participant : Participant,
    videoSource : videoSource
  }
export function VuiParticipantGrid({containerStyle, itemStyle, cellStyle,  mode="standard", multiviewSettings, includeSelf = true, includeScreenshare = true, sizeMode = "contain", clickToSwitcFocusview = false, onClick, screenshareSizeMode } : VuiParticipantGridProps){
    
    const { room } = useRoom();
    const participants = useParticipants();
    const focusView =  useFocusView();
  
  
  
    const theme = useVuiTheme();
  
    if(!room){
      console.log("Room is null")
      return <></>
    }
  
    let items : ParticipantGridElement[] = []
    if(includeSelf){
      items.push({ participant : room.localParticipant,videoSource : "camera"});
      if(includeScreenshare &&  !!room.localParticipant.getTrack(Track.Source.ScreenShare)){
        items.push({ participant : room.localParticipant,videoSource : "screen_share"});
      }
    }
  
    participants?.forEach(part=>{
      items.push({ participant : part,videoSource : "camera"});
      if(includeScreenshare &&  !!part.getTrack(Track.Source.ScreenShare)){
        items.push({ participant : part,videoSource : "screen_share"});
      }
    })
    
  
    let template = [
       { width : "100%", height : "100%"},
       { width : "50%", height : "100%"},
       { width : "50%", height : "50%"},
       { width : "50%", height : "50%"},
       { width : "33%", height : "50%"},
       { width : "33%", height : "50%"},
       { width : "33%", height : "33%"},
       { width : "33%", height : "33%"},
       { width : "33%", height : "33%"},
       { width : "25%", height : "33%"},
       { width : "25%", height : "33%"},
       { width : "25%", height : "33%"},
       { width : "25%", height : "25%"},
       { width : "25%", height : "25%"},
       { width : "25%", height : "25%"},
       { width : "25%", height : "25%"},
       { width : "20%", height : "25%"},
       { width : "20%", height : "25%"},
       { width : "20%", height : "25%"},
       { width : "20%", height : "25%"},
       { width : "20%", height : "20%"},
       { width : "20%", height : "20%"},
       { width : "20%", height : "20%"},
       { width : "20%", height : "20%"},
       { width : "20%", height : "20%"},
       { width : "15%", height : "20%"},
       { width : "15%", height : "20%"},
       { width : "15%", height : "20%"},
       { width : "15%", height : "20%"},
       { width : "15%", height : "20%"},
       { width : "15%", height : "15%"},
       { width : "15%", height : "15%"},
       { width : "15%", height : "15%"},
       { width : "15%", height : "15%"},
       { width : "15%", height : "15%"},
       { width : "15%", height : "15%"},
    ]
  
    let wh = template[items.length-1];
  
    
  
    const gridThemeNode = getComponentVariant(theme.components.participantGrid, "container")
    const gridCellThemeNode = getComponentVariant(theme.components.participantGrid, "cell")
    const gridItemThemeNode = getComponentVariant(theme.components.participantGrid, "item")
  
    
    
  
  
    return <ViuCoreComponent base={gridThemeNode} hover={{}} style={{ ...containerStyle }}>{
      items.map((cell, cellindex)=>{
        return <ViuCoreComponent key={`row_${cellindex}`} base={gridCellThemeNode} style={ {...wh,...cellStyle}}>
  
          <ViuCoreComponent key={`row_${cellindex}`} base={gridItemThemeNode} style={ {...itemStyle}}>
            <VuiParticipantCard participant={cell.participant} videoSource={cell.videoSource} mode={mode} sizeMode={sizeMode} screenShareSizeMode={screenshareSizeMode} onClick={()=>{
                if(clickToSwitcFocusview){
                  focusView?.setFocusView(cell.participant.identity, cell.videoSource)
                }
                onClick && onClick(cell.participant.identity, cell.videoSource )
            }}></VuiParticipantCard>
            
          </ViuCoreComponent>
          
          </ViuCoreComponent>
    })
  }</ViuCoreComponent>
  
  
  
  
  }