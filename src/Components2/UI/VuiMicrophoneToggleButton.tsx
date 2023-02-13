import { ReactElement } from "react";
import { useMicrophone } from "../Core/Room";
import { VuiButton, VuiRoundButton } from "./Core/VuiButton";
import { VuiToggleButton } from "./Core/VuiToggleButton";

import { useVuiTheme, VuiThemeStyle } from "./VuiTheme";


export interface VuiMicrophoneProps {
    onChange? : (enabled : boolean) => void;
    onEnabled? : () => void;
    onDisabled? : () =>  void;
    enabledElement? : ReactElement;
    disabledElement? : ReactElement;
    containerStyle? : React.CSSProperties;
    enabledButtonStyle? : VuiThemeStyle;
    disabledButtonStyle? : VuiThemeStyle;
    
}
export function VuiMicrophoneToggleButton({ onChange, onEnabled, onDisabled, enabledElement, disabledElement, containerStyle, enabledButtonStyle, disabledButtonStyle} : VuiMicrophoneProps){
    const microphone = useMicrophone();

    const checkedElement = enabledElement ||< MicrophoneEnabled style={enabledButtonStyle}></MicrophoneEnabled>;
    const uncheckedElement = disabledElement || <MicrophoneDisabled style={disabledButtonStyle}></MicrophoneDisabled>;


    const onCheckedEvent = () => {
        microphone.enable!();
        onChange && onChange(true);
        onEnabled && onEnabled();
    }    
    
    const onUncheckedEvent = () => {
        microphone.disable!();
        onChange && onChange(false);
        onDisabled && onDisabled();
    }

    return <VuiToggleButton checkedElement={checkedElement} uncheckedElement={uncheckedElement} containerStyle={containerStyle} checked={microphone.isEnabled || false} onChecked={onCheckedEvent} onUnchecked={onUncheckedEvent} useLocalState={false} hotKey={"m"}></VuiToggleButton>
}

function MicrophoneEnabled({ style } : { style? : VuiThemeStyle}){
    const theme = useVuiTheme();
    return <VuiRoundButton size={64} style={{ backgroundColor :  theme.colors.main, color : theme.colors.mainInverse}} title="Mute microphone"><MicrophoneIcon></MicrophoneIcon></VuiRoundButton>
}

function MicrophoneDisabled({ style } : { style? : VuiThemeStyle}){
    const theme = useVuiTheme();
    return <VuiRoundButton size={64} style={{ backgroundColor :  theme.colors.negative, color : theme.colors.negativeInverse}} title="Unmute microphone"><MicrophoneMutedIcon></MicrophoneMutedIcon></VuiRoundButton>
}


function MicrophoneIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 64 64"><g fill="currentColor"><path d="M32,45c8.271,0,15-6.729,15-15V16c0-8.271-6.729-15-15-15S17,7.729,17,16v14 C17,38.271,23.729,45,32,45z"></path> <path fill="#ffffff" d="M54,30c0-0.553-0.448-1-1-1s-1,0.447-1,1c0,11.028-8.972,20-20,20s-20-8.972-20-20c0-0.553-0.448-1-1-1 s-1,0.447-1,1c0,11.113,8.284,20.322,19,21.79V61H17c-0.552,0-1,0.447-1,1s0.448,1,1,1h30c0.552,0,1-0.447,1-1s-0.448-1-1-1H35 v-9.21C45.716,50.322,54,41.113,54,30z"></path></g></svg>
}

function MicrophoneMutedIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><g fill="#ffffff"><path d="M6,43a1,1,0,0,1-.707-1.707l36-36a1,1,0,1,1,1.414,1.414l-36,36A1,1,0,0,1,6,43Z" fill="#ffffff"></path><path d="M13.829,35.585l1.424-1.424A14.977,14.977,0,0,1,9,22a1,1,0,0,0-2,0A16.94,16.94,0,0,0,13.829,35.585Z" fill="#ffffff"></path><path d="M40,21a1,1,0,0,0-1,1A14.986,14.986,0,0,1,16.99,35.252l-1.456,1.457A16.907,16.907,0,0,0,23,38.949V45H14a1,1,0,0,0,0,2H34a1,1,0,0,0,0-2H25V38.949A17.007,17.007,0,0,0,41,22,1,1,0,0,0,40,21Z" fill="#ffffff"></path><path d="M18.129,31.286,35,14.414V12a11,11,0,0,0-22,0V22A10.993,10.993,0,0,0,18.129,31.286Z" fill="#ffffff"></path><path d="M20.005,32.238A10.977,10.977,0,0,0,35,22V17.242Z" fill="#ffffff"></path><path d="M6,43a1,1,0,0,1-.707-1.707l36-36a1,1,0,1,1,1.414,1.414l-36,36A1,1,0,0,1,6,43Z"></path></g></svg>
}