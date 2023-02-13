
import { ReactElement } from "react";
import { useCamera, useMicrophone, useRoom, useScreenshare } from "../Core/Room";
import { VuiButton, VuiRoundButton } from "./Core/VuiButton";
import { VuiToggleButton } from "./Core/VuiToggleButton";

import { useVuiTheme, VuiThemeStyle } from "./VuiTheme";


export interface VuiMicrophoneProps {
    onHangup? : () => void;
    buttonElement? : ReactElement;
    containerStyle? : React.CSSProperties;
    buttonStyle? : VuiThemeStyle;
    
}
export function VuiHangupButton({ onHangup, buttonElement, containerStyle, buttonStyle } : VuiMicrophoneProps){
    const theme = useVuiTheme();
    const { room } = useRoom();
    
    const element = buttonElement || <VuiRoundButton size={64} style={{ backgroundColor :  theme.colors.negative, color : theme.colors.negativeInverse}} title="Hang up and leave call"><PhoneIcon></PhoneIcon></VuiRoundButton>;

    const style = {
        ...containerStyle
    }

    return <div style={style} onClick={()=>{
        room?.disconnect();
        onHangup && onHangup();
    }}>
        {element}
    </div>
}


function PhoneIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><g fill="#ffffff"><path d="M31.376,29.175,27.79,33.658A37.827,37.827,0,0,1,14.343,20.212l4.482-3.586a3.044,3.044,0,0,0,.88-3.614l-4.086-9.2A3.047,3.047,0,0,0,12.067,2.1L4.29,4.116A3.063,3.063,0,0,0,2.029,7.5,45.2,45.2,0,0,0,40.5,45.972a3.064,3.064,0,0,0,3.384-2.261L45.9,35.932a3.049,3.049,0,0,0-1.712-3.551L34.99,28.3A3.046,3.046,0,0,0,31.376,29.175Z" fill="#ffffff"></path></g></svg>
}

