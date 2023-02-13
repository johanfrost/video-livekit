
import { createContext, ReactElement, useContext } from "react";
import { CSSProperties } from "styled-components";


export interface VuiThemeSettings  {
    colors : {
        positive : string;
        negative : string;
        [key : string] : string;
    },
    variables : {
        [key : string] : string;
    },

    components : {
        button : VuiThemeComponentSetting
    }    

}

interface VuiThemeComponentVariant extends Omit<VuiThemeComponentSetting, "_variants">{

}

interface VuiThemeComponentSetting extends CSSProperties{
    _hover? : CSSProperties;
    _variants? :  { [key : string] : VuiThemeComponentVariant}
}

export interface VuiThemeStyle extends CSSProperties{
    _hover? : CSSProperties;
}


const VuiDefaultTheme : VuiThemeSettings = generateTheme({
    colors : {
        positive : "#0f0",
        negative : "#f00",
        main : "#f00",
        mainForground : "#fff"
    },
    variables : {

    },
    components : {
        button : {
            borderRadius : "50%",
            backgroundColor : "{colors.main}",
            color : "{colors.mainForground}",
            cursor : "pointer",
            _hover : {
                opacity : 0.5
            },
            _variants : {
                "default" : {

                },
                "outline" : {
                    borderRadius : "0px",
                    borderWidth : "1px",
                    borderColor : "{colors.main}",
                    color : "{colors.main}",
                    backgroundColor : "transparent"
                }
            }
        },
    }
})

const VuiThemeContext = createContext<VuiThemeSettings>(VuiDefaultTheme)


export function useVuiTheme(){
    const context = useContext(VuiThemeContext);

    if (!context) {
        return VuiDefaultTheme
    }
    return context
}

export function VuiTheme({ theme, children }: { theme? : VuiThemeSettings, children? : ReactElement}){


    let themeValue = {
        ...VuiDefaultTheme,
    }


    if(theme){
        themeValue = {...themeValue,  ...generateTheme(theme)}
    }
    

    return <VuiThemeContext.Provider value={themeValue}>{children}</VuiThemeContext.Provider>

}

export function getComponentVariant(component : VuiThemeComponentSetting, variant? : string){
    if(!component._variants) return component;
    if(!variant){
        if(component._variants["default"]){
            return component._variants["default"];
        }else{
            return component;
        }
    }
    if(!component._variants[variant]){
        return component;  
    } 
    return component._variants[variant]
}


function generateTheme(theme : VuiThemeSettings) : VuiThemeSettings{
    
    let components = {...theme.components};
    
    //Replace colors
    Object.keys(components).forEach(comp=>{
        //@ts-ignore
        components[comp] = generateThemeReplaceKeywords(components[comp], theme.colors)
        //@ts-ignore
        if(components[comp]._variants){
            //@ts-ignore
            const { _variants, ...base} = components[comp]
            //@ts-ignore
            Object.keys(components[comp]._variants).forEach(variant => {

                //@ts-ignore
                components[comp]._variants[variant] = {
                    ...base,
                    //@ts-ignore
                    ...components[comp]._variants[variant]
                    
                }
            })
        }
    })

    const ret = {
        ...theme,
        //@ts-ignore
        components
    }
   
    //@ts-ignore
    return ret;
}

function generateThemeReplaceKeywords(node : any, colors : {[key : string] : string}){
    Object.keys(node).forEach(prop=>{

        if(prop === "_variants"){
            Object.keys(node[prop]).forEach(variant => {
                node[prop][variant] = generateThemeReplaceKeywords(node[prop][variant], colors)
            })
            return;
        }
        if(prop === "_hover"){
            node[prop] = generateThemeReplaceKeywords(node[prop], colors)
        }

        Object.keys(colors).forEach(color=>{
            //@ts-ignore
            if(node[prop] === `{colors.${color}}`){
                //@ts-ignore
                node[prop] = colors[color];
            }else{
              
            }
        })
        
    })
    return node
}
