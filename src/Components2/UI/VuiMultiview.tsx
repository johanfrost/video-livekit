
import { ParticipantEvent, Track } from "livekit-client";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { CSSProperties } from "styled-components";

import { LocalView } from "../Core/LocalView";
import { ParticipantManager, useParticipant } from "../Core/ParticipantManager";
import { useCamera, useFocusView, useMicrophone, useRoom, useScreenshare } from "../Core/Room";
import { SourceVideo } from "../Core/SourceVideo";
import { videoSource } from "../schemas/videoSource";
import { VuiButton, VuiRoundButton } from "./Core/VuiButton";
import { ViuCoreComponent } from "./Core/VuiCoreCompont";
import { VuiToggleButton } from "./Core/VuiToggleButton";

import { getComponentVariant, useVuiTheme, VuiThemeStyle } from "./VuiTheme";

export interface VuiMultiviewProps {
    containerStyle?: CSSProperties;
    primaryContainerStyle?: CSSProperties;
    primaryVideoStyle?: CSSProperties;
    secondaryContainerStyle?: CSSProperties;
    secondaryVideoStyle?: CSSProperties;
    clickSecondaryToSwitchPrimary? :  boolean;
    clickPrimaryToSwitcFocusview? : boolean;
    onPrimaryClick? : () => void;
    onSeconradyClick? : () => void;
    automaticSwitchPrimaryToScreenshare? : boolean;
  }
  export function VuiMultiview({ containerStyle, primaryContainerStyle, primaryVideoStyle, secondaryContainerStyle, secondaryVideoStyle, clickSecondaryToSwitchPrimary = true, clickPrimaryToSwitcFocusview = true, onPrimaryClick, onSeconradyClick, automaticSwitchPrimaryToScreenshare = true }: VuiMultiviewProps) {
    const participant = useParticipant();
    const [primarySource, setPrimarySource] = useState<videoSource>("camera");
    const [secondarySource, setSecondarySource] = useState<videoSource | "">("screen_share");
    const theme = useVuiTheme();
    const focusView =  useFocusView();
    const containerThemeNode = getComponentVariant(theme.components.multiView, "container");
    const primaryContainerThemeNode = getComponentVariant(theme.components.multiView, "primaryContainer");
    const primaryVideoThemeNode = getComponentVariant(theme.components.multiView, "primaryVideo");
    const secondaryContainerThemeNode = getComponentVariant(theme.components.multiView, "secondadyContainer");
    const secondaryVideoThemeNode = getComponentVariant(theme.components.multiView, "secondaryVideo");
  
    const primaryVideoCompiledStyle = {
      ...primaryVideoThemeNode,
      ...primaryVideoStyle,
    };
  
    const secondaryVideoCompiledStyle = {
      ...secondaryVideoThemeNode,
      ...secondaryVideoStyle,
    };
  
  
    const setSources = useCallback(()=>{
  
      const hasCamera = !!participant?.getTrack(Track.Source.Camera);
      const hasScreenshare = !!participant?.getTrack(Track.Source.ScreenShare);
      
  
      
      if (hasCamera && hasScreenshare) {
          if(secondarySource==="" && automaticSwitchPrimaryToScreenshare){
              setPrimarySource("screen_share")
              setSecondarySource("camera")
              return;
          }
          if (primarySource === "camera") {
              if(secondarySource !== "screen_share"){
                  setSecondarySource("screen_share")
              }
          } else {
              if(secondarySource !== "camera"){
                  setSecondarySource("camera")
              }
          }
        } else {
          setSecondarySource("");
          if (hasCamera) {
              setPrimarySource("camera");
          }
          if (hasScreenshare) {
              setPrimarySource("screen_share");
          }
        }
      
  }, [primarySource, secondarySource, participant, automaticSwitchPrimaryToScreenshare])
  
  
    useEffect(()=>{
      if(!participant) return;
      participant.on(ParticipantEvent.TrackPublished, setSources)
      participant.on(ParticipantEvent.TrackUnpublished, setSources)
      participant.on(ParticipantEvent.LocalTrackPublished, setSources)
      participant.on(ParticipantEvent.LocalTrackUnpublished, setSources)
      return () => {
          participant.off(ParticipantEvent.TrackPublished, setSources)
          participant.off(ParticipantEvent.TrackUnpublished, setSources)
          participant.off(ParticipantEvent.LocalTrackPublished, setSources)
          participant.off(ParticipantEvent.LocalTrackUnpublished, setSources)
      }
    }, [participant, setSources])
  
  
  
  
  
    
  
  if (!participant) {
      
      return null;
    }
  
  
  
    const secondaryClicked = () => {
      if(clickSecondaryToSwitchPrimary){
          if(primarySource === "camera"){
              setPrimarySource("screen_share");
              setSecondarySource("camera");
          }else{
              setPrimarySource("camera");
              setSecondarySource("screen_share");
          }
      }
      onSeconradyClick && onSeconradyClick();
    }
    const primaryClicked = () => {
      onPrimaryClick && onPrimaryClick();
      
      
      if(clickPrimaryToSwitcFocusview){
          focusView?.setFocusView(participant.identity, primarySource)
      }
  
  
    }
  
    return (
      <ViuCoreComponent base={containerThemeNode} hover={containerThemeNode._hover} style={containerStyle}>
        <ViuCoreComponent base={primaryContainerThemeNode} hover={primaryContainerThemeNode._hover} style={primaryContainerStyle} onClick={primaryClicked}>
          <ParticipantManager participant={participant} videoSource={primarySource}>
            <SourceVideo style={primaryVideoCompiledStyle}></SourceVideo>
          </ParticipantManager>
        </ViuCoreComponent>
        {secondarySource !== "" ? (
          <ViuCoreComponent base={secondaryContainerThemeNode} hover={secondaryContainerThemeNode._hover} style={primaryContainerStyle} onClick={secondaryClicked}>
            <ParticipantManager participant={participant} videoSource={secondarySource}>
              <SourceVideo style={secondaryVideoCompiledStyle}></SourceVideo>
            </ParticipantManager>
          </ViuCoreComponent>
        ) : (
          <></>
        )}
      </ViuCoreComponent>
    );
  }