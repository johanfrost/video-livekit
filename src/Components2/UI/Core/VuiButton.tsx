import { ReactElement } from "react";
import { CSSProperties } from "styled-components";
import { getComponentVariant, useVuiTheme, VuiThemeStyle } from "../VuiTheme";
import { ViuCoreComponent } from "./VuiCoreCompont";


export interface VuiButtonProps{
    children? :  string | JSX.Element | JSX.Element[];
    style? : VuiThemeStyle;
     onClick? : () => void ;
    variant? : string;
    leftElement? : JSX.Element;
    rightElement? : JSX.Element;
    title? : string
}

export function VuiButton({children, style, onClick, leftElement, rightElement, variant, title  } : VuiButtonProps ){
    const theme = useVuiTheme();

    const themeNode = getComponentVariant(theme.components.button, variant)

    return <ViuCoreComponent base={themeNode} hover={themeNode._hover} style={style} onClick={onClick} title={title}>{children}</ViuCoreComponent>
}




export interface VuiRoundButtonProps{
    children? :  string | JSX.Element | JSX.Element[];
    style? : VuiThemeStyle;
     onClick? : () => void ;
    variant? : string;
    size : number;
    title? : string;
}

export function VuiRoundButton( props : VuiRoundButtonProps ){

    const {size, style, children, ...genericProps} = props;
    const buttonStyle : CSSProperties = {
         width : `${size}px`,
          height : `${size}px`, 
          borderRadius : "50%", 
          display : "flex",
        alignItems : "center",
        justifyContent : "center",
          ...style};

   return <VuiButton {...genericProps} style={buttonStyle}>{children}</VuiButton>
}