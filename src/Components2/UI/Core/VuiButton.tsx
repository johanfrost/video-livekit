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
}

export function VuiButton({children, style, onClick, leftElement, rightElement, variant } : VuiButtonProps ){
    const theme = useVuiTheme();

    const themeNode = getComponentVariant(theme.components.button, variant)

    return <ViuCoreComponent base={themeNode} hover={themeNode._hover} style={style} onClick={onClick}>{children}</ViuCoreComponent>
}

