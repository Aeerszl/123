import  { createContext,useState} from "react";  
import runChat  from "../config/gemini";
export const Context = createContext();

const ContextProvider = (props) => {
        const [input,setInput] = useState("");//giriş verilerini kaydetmek için
        const[recentPrompt,setRecentPrompt] = useState("");//işlem  gozuken
        const [prevPrompts,setPrevPrompts] = useState([]);//tüm giriş gecmişi
        const [showResult,setShowResult] = useState(false);//son sekme 
        const [loading,setLoading] = useState(false);//dogruysa yukleeme ekranı
        const [resultData,setResultData] = useState("");
    
    const delaypara=(index,nextWord)=>{
      setTimeout(function(){
      setResultData(prev=>prev+nextWord);
     },75*index)
    
    }
    const newChat = () => {
setLoading(false);
setShowResult(false);
    }
    const onSent =async (prompt) => {

       setResultData("");
       setLoading(true);
       setShowResult(true);
       let response;
       if(prompt !== undefined)
       {
               response = await runChat(prompt);     
               setRecentPrompt(prompt); 
       }
       else{
           setPrevPrompts(prev=>[...prev,input]);
           setRecentPrompt(input);
           response = await runChat(input); 
       }
     
       
         let responseArray = response.split("**");
         let newResponse="";
         for(let i = 0; i < responseArray.length; i++)
         {
             if(i === 0 || i%2 !== 1)
             {newResponse += responseArray[i];
             }
             else{
                newResponse +="<b>"+responseArray[i]+"</b>";
             }
        }
         let newResponse2 = newResponse.split("*").join("</br>")
           let newResponseArray = newResponse2.split(" ");
           for(let i = 0; i < newResponseArray.length; i++)
           {
               const nextWord = newResponseArray[i];
                       delaypara(i,nextWord+" ");
            
           }
      setLoading(false);
      setInput("");
      
    }
    

    const contextValue = {
          prevPrompts,
          setPrevPrompts,
          onSent,
          setRecentPrompt,
          recentPrompt,
          showResult,
          loading,
          resultData,
          input,
          setInput,
          newChat,
        



    }
    return(
    <Context.Provider value={contextValue}>
        {props.children}    
        </Context.Provider>
        )
    } 
    export default ContextProvider;

import PropTypes from "prop-types";

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

