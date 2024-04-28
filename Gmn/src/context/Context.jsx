//Aliee AI
import  { createContext,useState} from "react";  
import runChat  from "../config/gemini";
export const Context = createContext();// createContext fonksiyonu ile bir Context oluşturulur

const ContextProvider = (props) => {
    const [input, setInput] = useState(""); // Kullanıcının giriş verisini saklar
    const [recentPrompt, setRecentPrompt] = useState(""); // Son işlemi gösterir
    const [prevPrompts, setPrevPrompts] = useState([]); // Tüm giriş geçmişini saklar
    const [showResult, setShowResult] = useState(false); // Sonuç sekmesini gösterir
    const [loading, setLoading] = useState(false); // Yüklenme durumunu saklar
    const [resultData, setResultData] = useState(""); // Yanıt verisini saklar

    const delaypara=(index,nextWord)=>{ // Kullanıcının girdiğini tek tek gönderir ve aralıklı olarak ekrana yazdırır
      setTimeout(function(){
      setResultData(prev=>prev+nextWord);
     },75*index)
    
    }
    const newChat = () => { // Yeni bir sohbet başlatır
setLoading(false);
setShowResult(false);
    }
    const onSent =async (prompt) => { // Kullanıcının girdisini veya belirtilen bir promptu gönderir ve yanıtı işler

       setResultData("");
       setLoading(true);
       setShowResult(true);
       let response;
       if(prompt !== undefined)   // Eğer belirtilen bir prompt varsa, onu kullanarak yanıt alır
       {
               response = await runChat(prompt);     
               setRecentPrompt(prompt); 
       }
       else{ // Yoksa, kullanıcının girdisini kullanarak yanıt alır
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
    // Enter tuşuna basıldığında girdiyi almak için olay dinleyicisi ekle
/*document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        // Enter tuşuna basıldığında girdiyi al ve işle
        onSent();
    }
});*/
    
  // Context'e değerlerin atanması
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
        



    }  // Context.Provider ile sağlanan değerlerin çocuk bileşenlere aktarılması
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

