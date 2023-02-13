import { ReactElement } from "react";
import { useMicrophone } from "../Core/Room";
import { VuiButton } from "./Core/VuiButton";

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
export function VuiMicrophone({ onChange, onEnabled, onDisabled, enabledElement, disabledElement, containerStyle, enabledButtonStyle, disabledButtonStyle} : VuiMicrophoneProps){
    const microphone = useMicrophone();
    
    const element = microphone.isEnabled ? (enabledElement ||< MicrophoneEnabled style={enabledButtonStyle}></MicrophoneEnabled>) :  (disabledElement || <MicrophoneDisabled style={disabledButtonStyle}></MicrophoneDisabled>) 


    return <div style={containerStyle} onClick={()=>{
        if(microphone.isEnabled){
            microphone.disable!();
        }else{
            microphone.enable!();
        }
    }}>{element}</div>
}

function MicrophoneEnabled({ style } : { style? : VuiThemeStyle}){

    const elementStyle : React.CSSProperties = {
        color : "#fff",
        ...style
    }

    return <VuiButton style={elementStyle} variant={"outline"}><>Hello</></VuiButton>
}



function MicrophoneDisabled({ style } : { style? : VuiThemeStyle}){
    const theme = useVuiTheme();

    // const elementStyle : React.CSSProperties = {
    //     backgroundColor : theme.button.backgroundColor,
    //     color : theme.button.color,
    //     ...style
    // }


    return <div>
    Disabled
</div>
}