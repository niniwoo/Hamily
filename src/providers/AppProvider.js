import { createContext, useState } from "react"; 
export const appContext = createContext(); 

export default function AppProvider(props){ 
    const [chatName, setChatName] = useState(""); 

 const providerData = { chatName, setChatName };

  return ( 

  <appContext.Provider 
  value={providerData}> 
  {props.children} 
  </appContext.Provider> );

   }