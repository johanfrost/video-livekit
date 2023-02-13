import { ReactElement, useEffect, useState } from "react";



export interface VuiToggleButtonProps {
    onChange? : (checked : boolean) => void;
    onChecked? : () => void;
    onUnchecked? : () =>  void;
    checkedElement : ReactElement;
    uncheckedElement : ReactElement;
    containerStyle? : React.CSSProperties;
    useLocalState? : boolean
    checked : boolean;
    hotKey? : string;

}



export function VuiToggleButton({ onChange, onChecked, onUnchecked, checkedElement, uncheckedElement, containerStyle, checked, useLocalState = true, hotKey} : VuiToggleButtonProps){
    const [checkedValue, setCheckedValue] = useState<boolean>(checked);


    useEffect(()=>{
        if(!hotKey) return;

        const onKeydown = (ev : KeyboardEvent) => {
            if(ev.key !== hotKey) return;
            if(checkedValue){
                useLocalState && setCheckedValue(false);
                onChange && onChange(false)
                onUnchecked && onUnchecked();
            }else{
                useLocalState && setCheckedValue(true);
                onChange && onChange(true)
                onChecked && onChecked();
            }
        }

        document.addEventListener("keydown", onKeydown);

        return () => {
            document.removeEventListener("keydown", onKeydown)
        }
        
    }, [checkedValue, onChange, onChecked, useLocalState, onUnchecked, hotKey])

    useEffect(()=>{
        setCheckedValue(checked);
    }, [checked])
    
    const element = checkedValue ? checkedElement  :  uncheckedElement

    return <div style={containerStyle} onClick={()=>{
    
        if(checkedValue){
            useLocalState && setCheckedValue(false);
            onChange && onChange(false)
            onUnchecked && onUnchecked();
        }else{
            useLocalState && setCheckedValue(true);
            onChange && onChange(true)
            onChecked && onChecked();
        }


    }}>{element}</div>
}


