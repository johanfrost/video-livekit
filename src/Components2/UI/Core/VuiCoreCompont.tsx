import { ReactElement } from "react"
import styled, { CSSProp, CSSProperties } from "styled-components"
import { VuiThemeStyle } from "../VuiTheme"


export interface VuiCoreComponentProps{
    tagName? : "div"
    base? : CSSProperties
    hover? : CSSProperties
    children? :  string | JSX.Element | JSX.Element[] 
    onClick? : () => void
    style? : VuiThemeStyle
    title? : string
}
export function ViuCoreComponent({ base, hover, tagName = "div", children, onClick, style, title} : VuiCoreComponentProps){
    

    const {_hover, ...restStyle} = style || {};
    const baseStyle = {
        ...base, 
        ...restStyle
    }
    const hoverStyle = {
        ...hover, 
        ..._hover
    }


    const baseStyleCSS = styleToCss(baseStyle)
    const hoverStyleCSS = styleToCss(hoverStyle || {})
    
    return <VuiCoreComponentElement baseStyle={baseStyleCSS} hoverStyle={hoverStyleCSS} onClick={onClick} title={title}>{children}</VuiCoreComponentElement>

}

const VuiCoreComponentElement = styled.div<{ baseStyle : string, hoverStyle : string}>`
        ${props=>props.baseStyle}
        ${props=>props.hoverStyle && `&:hover{${props.hoverStyle}}`}
`

function styleToCss(style : CSSProperties){
   return Object.keys(style).map(k=>{
        const key = k.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
        //@ts-ignore
        const value = style[k];
        return `${key} : ${value};`
    }).join("\n")
}

