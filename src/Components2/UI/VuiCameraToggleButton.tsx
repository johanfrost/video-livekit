import { ReactElement } from "react";
import { useCamera, useMicrophone } from "../Core/Room";
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
export function VuiCameraToggleButton({ onChange, onEnabled, onDisabled, enabledElement, disabledElement, containerStyle, enabledButtonStyle, disabledButtonStyle} : VuiMicrophoneProps){
    const camera = useCamera();

    const checkedElement = enabledElement ||<CameraEnabled style={enabledButtonStyle}></CameraEnabled>;
    const uncheckedElement = disabledElement || <CameraDisabled style={disabledButtonStyle}></CameraDisabled>;


    const onCheckedEvent = () => {
        camera.enable!();
        onChange && onChange(true);
        onEnabled && onEnabled();
    }    
    
    const onUncheckedEvent = () => {
        camera.disable!();
        onChange && onChange(false);
        onDisabled && onDisabled();
    }

    return <VuiToggleButton checkedElement={checkedElement} uncheckedElement={uncheckedElement} containerStyle={containerStyle} checked={camera.isEnabled || false} onChecked={onCheckedEvent} onUnchecked={onUncheckedEvent} useLocalState={false} hotKey={"c"}></VuiToggleButton>
}

function CameraEnabled({ style } : { style? : VuiThemeStyle}){
    const theme = useVuiTheme();
    return <VuiRoundButton size={64} style={{ backgroundColor :  theme.colors.main, color : theme.colors.mainInverse}} title="Turn camera off"><CameraEnabledIcon></CameraEnabledIcon></VuiRoundButton>
}

function CameraDisabled({ style } : { style? : VuiThemeStyle}){
    const theme = useVuiTheme();
    return <VuiRoundButton size={64} style={{ backgroundColor :  theme.colors.negative, color : theme.colors.negativeInverse}} title="Turn camera on"><CameraDisabledIcon></CameraDisabledIcon></VuiRoundButton>
}


function CameraEnabledIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 64 64"><g fill="#ffffff"><path d="M62.489,17.128a1,1,0,0,0-1.01.018L46,26.606V39.394l15.479,9.46A1,1,0,0,0,62,49a1,1,0,0,0,1-1V18A1,1,0,0,0,62.489,17.128Z"></path><path d="M38,11H7a6.006,6.006,0,0,0-6,6V49a6.006,6.006,0,0,0,6,6H38a6.006,6.006,0,0,0,6-6V17A6.006,6.006,0,0,0,38,11ZM11,24a3,3,0,1,1,3-3A3,3,0,0,1,11,24Z" fill="#ffffff"></path></g></svg>
}

function CameraDisabledIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 64 64"><g fill="#ffffff"><path d="M62.489,16.128a1,1,0,0,0-1.01.018L46,25.606V38.394l15.479,9.46A1,1,0,0,0,63,47V17A1,1,0,0,0,62.489,16.128Z"></path><path d="M58.707,5.293a1,1,0,0,0-1.414,0L44,18.586V16a6.006,6.006,0,0,0-6-6H7a6.006,6.006,0,0,0-6,6V48a6.006,6.006,0,0,0,6,6H8.586L5.293,57.293a1,1,0,1,0,1.414,1.414l52-52A1,1,0,0,0,58.707,5.293ZM11,17a3,3,0,1,1-3,3A3,3,0,0,1,11,17Z" fill="#ffffff"></path><path d="M14.126,54H38a6.006,6.006,0,0,0,6-6V24.126Z" fill="#ffffff"></path></g></svg>
}