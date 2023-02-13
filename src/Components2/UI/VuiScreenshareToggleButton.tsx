
import { ReactElement } from "react";
import { useCamera, useMicrophone, useScreenshare } from "../Core/Room";
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
export function VuiScreenshareToggleButton({ onChange, onEnabled, onDisabled, enabledElement, disabledElement, containerStyle, enabledButtonStyle, disabledButtonStyle} : VuiMicrophoneProps){
    const screenshare = useScreenshare();

    const checkedElement = enabledElement ||<ScreenshareEnabled style={enabledButtonStyle}></ScreenshareEnabled>;
    const uncheckedElement = disabledElement || <ScreenshareDisabled style={disabledButtonStyle}></ScreenshareDisabled>;


    const onCheckedEvent = () => {
        screenshare.enable!();
        onChange && onChange(true);
        onEnabled && onEnabled();
    }    
    
    const onUncheckedEvent = () => {
        screenshare.disable!();
        onChange && onChange(false);
        onDisabled && onDisabled();
    }

    return <VuiToggleButton checkedElement={checkedElement} uncheckedElement={uncheckedElement} containerStyle={containerStyle} checked={screenshare.isEnabled || false} onChecked={onCheckedEvent} onUnchecked={onUncheckedEvent} useLocalState={false}></VuiToggleButton>
}

function ScreenshareDisabled({ style } : { style? : VuiThemeStyle}){
    const theme = useVuiTheme();
    return <VuiRoundButton size={64} style={{ backgroundColor :  theme.colors.main, color : theme.colors.mainInverse}} title="Share screen"><ScreenshareDisabledIcon></ScreenshareDisabledIcon></VuiRoundButton>
}

function ScreenshareEnabled({ style } : { style? : VuiThemeStyle}){
    const theme = useVuiTheme();
    return <VuiRoundButton size={64} style={{ backgroundColor :  theme.colors.positive, color : theme.colors.positiveInverse}} title="Stop share screen"><ScreenshareEnabledIcon></ScreenshareEnabledIcon></VuiRoundButton>
}


function ScreenshareDisabledIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 64 64"><g fill="#ffffff"><path d="M4.669,26.944A1.023,1.023,0,0,0,5,27a1,1,0,0,0,.707-.293l6.586-6.586,8.293,8.293a2,2,0,0,0,2.828-2.828l-8.293-8.293,6.586-6.586a1,1,0,0,0-.6-1.7l-18-2a1,1,0,0,0-1.1,1.1l2,18A1,1,0,0,0,4.669,26.944Z"></path><path d="M13,55a2,2,0,0,0,2,2H49a2,2,0,0,0,2-2V53H13Z" fill="#ffffff"></path><path d="M60,7H25a1,1,0,0,0,0,2H59a1,1,0,0,1,1,1V44a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V30a1,1,0,0,0-2,0V49a2,2,0,0,0,2,2H60a2,2,0,0,0,2-2V9A2,2,0,0,0,60,7Z" fill="#ffffff"></path></g></svg>
}

function ScreenshareEnabledIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 64 64"><g fill="#ffffff"><path d="M4.669,26.944A1.023,1.023,0,0,0,5,27a1,1,0,0,0,.707-.293l6.586-6.586,8.293,8.293a2,2,0,0,0,2.828-2.828l-8.293-8.293,6.586-6.586a1,1,0,0,0-.6-1.7l-18-2a1,1,0,0,0-1.1,1.1l2,18A1,1,0,0,0,4.669,26.944Z"></path><path d="M13,55a2,2,0,0,0,2,2H49a2,2,0,0,0,2-2V53H13Z" fill="#ffffff"></path><path d="M60,7H58.242l-2,2H59a1,1,0,0,1,1,1V44a1,1,0,0,1-1,1H20.242l-6,6H60a2,2,0,0,0,2-2V9A2,2,0,0,0,60,7Z" fill="#ffffff"></path><path d="M58.707,2.293a1,1,0,0,0-1.414,0L52.586,7H25a1,1,0,0,0,0,2H50.586l-36,36H5a1,1,0,0,1-1-1V30a1,1,0,0,0-2,0V49a2,2,0,0,0,2,2H8.586L3.293,56.293a1,1,0,1,0,1.414,1.414l54-54A1,1,0,0,0,58.707,2.293Z" fill="#ffffff"></path></g></svg>
    


}