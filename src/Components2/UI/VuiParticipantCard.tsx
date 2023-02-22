import { Participant } from "livekit-client";
import { CSSProperties } from "styled-components";
import { ParticipantManager } from "../Core/ParticipantManager";
import { SourceVideo } from "../Core/SourceVideo";
import { videoSource } from "../schemas/videoSource";
import { ViuCoreComponent } from "./Core/VuiCoreCompont";
import { VuiMultiview, VuiMultiviewProps } from "./VuiMultiview";
import { getComponentVariant, useVuiTheme } from "./VuiTheme";

export interface VuiParticipantCardProps {
  participant: Participant;
  videoSource?: videoSource;
  showParticipantName?: boolean;
  onParticipantNameClick? : () => void;
  participantNameStyle?: CSSProperties;
  mode?: "standard" | "multiview";
  multiviewSettings?: VuiMultiviewProps;
  videoStyle?: React.CSSProperties;
  videoContainerStyle? : React.CSSProperties,
  variant?: string;
  containerStyle?: CSSProperties;
  onClick?: () => void;
  sizeMode? : "cover" | "contain"
  screenShareSizeMode? : "cover" | "contain"
}

export function VuiParticipantCard({ participant, showParticipantName = false,videoContainerStyle, participantNameStyle,onParticipantNameClick,  mode="standard", multiviewSettings, videoStyle, variant, containerStyle, onClick, videoSource = "camera", sizeMode = "contain", screenShareSizeMode }: VuiParticipantCardProps) {
  const theme = useVuiTheme();

  const themeNode = getComponentVariant(theme.components.participantCard, variant);
  const nameThemeNode = getComponentVariant(theme.components.participantCard, "name" );
  const videoContainerThemeNode = getComponentVariant(theme.components.participantCard, "video" );

  let selectedSizeMode = videoSource === "camera" ? sizeMode : screenShareSizeMode ? screenShareSizeMode : sizeMode;


  let multiviewSettingsMerged  : VuiMultiviewProps ={
    ...multiviewSettings,
    containerStyle : {
        height : selectedSizeMode === "contain" ? undefined : "100%",
        ...multiviewSettings?.containerStyle
      },
      primaryVideoStyle : {
        height : selectedSizeMode === "contain" ? undefined : "100%",
        objectFit : selectedSizeMode === "contain" ? undefined : "cover" ,
        ...multiviewSettings?.primaryVideoStyle
      },
      primaryContainerStyle : {
        height : "100%",
        ...multiviewSettings?.primaryContainerStyle
      }
  }
  
  const cs : CSSProperties = {
    height : selectedSizeMode === "contain" ? "100%" : "100%",
    ...containerStyle
  }
  const vcs : CSSProperties = {
    height : selectedSizeMode === "contain" ? "100%" : "100%",
    ...videoContainerStyle
  }
  const vs : CSSProperties = {
    width: selectedSizeMode === "contain" ? undefined : "100%",
    height: selectedSizeMode === "contain" ? "100%" : "100%",
    objectFit : selectedSizeMode === "contain" ? "contain" : "cover"
  }

  return (
    
    <ViuCoreComponent base={themeNode} hover={themeNode._hover} style={cs} onClick={()=>{
      if(mode === "multiview") return;
      onClick && onClick();
    }}> 
      <ParticipantManager participant={participant} videoSource={videoSource}>
      <>
      <ViuCoreComponent base={videoContainerThemeNode} hover={videoContainerThemeNode._hover} style={vcs}> 
        <>
          {mode === "standard" && <SourceVideo style={vs}></SourceVideo>}
          {mode === "multiview" && <VuiMultiview {...multiviewSettingsMerged} onPrimaryClick={()=>{
            onClick && onClick();
          }}></VuiMultiview>}
        </>
        </ViuCoreComponent>
        <ViuCoreComponent base={nameThemeNode} hover={nameThemeNode._hover} style={participantNameStyle} onClick={onParticipantNameClick}>{participant.name || "Name"}</ViuCoreComponent>
        </>
      </ParticipantManager>
      
    </ViuCoreComponent>
  );
}

