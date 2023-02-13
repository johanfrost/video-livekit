import { useRoom } from "../Core/Room";

export function VuiConnected({  children} : {     children? :  string | JSX.Element | JSX.Element[]  }){
    const { context } = useRoom();
    return <>{context?.connected ? children : null}</>
    
}



export function VuiDisconnected({  children} : {     children? :  string | JSX.Element | JSX.Element[]  }){
    const { context } = useRoom();
    return <>{context?.connected ? null : children}</>
}