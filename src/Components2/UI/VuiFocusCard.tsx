import { CSSProperties } from "styled-components";
import { FocusView } from "../Core/FocusView";
import { useParticipant, useVideoSource } from "../Core/ParticipantManager";
import { ViuCoreComponent } from "./Core/VuiCoreCompont";
import { VuiMultiviewProps } from "./VuiMultiview";
import { VuiParticipantCard } from "./VuiParticipantCard";
import { getComponentVariant, useVuiTheme } from "./VuiTheme";


export interface VuiFocusCardProps{
    mode?: "standard" | "multiview";
    multiviewSettings? : VuiMultiviewProps;
    sizeMode? : "cover" | "contain";
    onClick? : () => void;
    screenShareSizeMode? : "cover" | "contain";
    style? : CSSProperties
  
}
export function VuiFocusCard( props : VuiFocusCardProps){
    return <FocusView>
        <VuiFocusCardInner {...props}></VuiFocusCardInner>
    </FocusView>
}

export function VuiFocusCardInner({ mode, multiviewSettings, sizeMode,screenShareSizeMode, onClick, style} : VuiFocusCardProps){

    const theme = useVuiTheme();
    
    const participant = useParticipant();
    const videoSource = useVideoSource();
    if(!participant || !videoSource) return null;

    let selectedSizeMode = videoSource === "camera" ? sizeMode : screenShareSizeMode ? screenShareSizeMode : sizeMode;

    const themeNode = getComponentVariant(theme.components.focusCard)


    return <ViuCoreComponent base={themeNode} style={ {...style}}>
        <VuiParticipantCard participant={participant} videoSource={videoSource} mode={mode} sizeMode={selectedSizeMode} multiviewSettings={multiviewSettings} onClick={onClick}></VuiParticipantCard>
        </ViuCoreComponent>
}