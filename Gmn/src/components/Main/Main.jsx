import './Main.css'
import { useContext } from 'react'
import { assets } from '../../assets/assets'    
import { Context } from '../../context/Context' 
const Main = () => {
const{ onSent,recentPrompt,showResult, loading,resultData,setInput, input, }=useContext(Context);

  return (
    <div className='main'>
        <div className="nav">
            <p> Aliee AI</p>
          <img src={assets.Anka_kus} alt="" />
        </div>
    <div className="main-container">
    
    {
    !showResult
  ?<>
   <div className="greet">
        <p> <span>Hello, dear user</span></p>
        <p>How can I help you today?</p>
        </div>
        <div className="cards">

            <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
            </div>
            
            <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
                <p>Brainstrom team bonding activitieas for our work retreat</p>
                <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
            </div>
        </div>
  </>
:<div className='result'>
      <div className="result-title">
        <img src={assets.Anka_kus} alt="" className="" />
        <p>{recentPrompt}</p>
      </div>
      <div className="result-data">
        <img src={assets.Kum_saat} alt="" className="" />
{loading
? <div className='loader'>
<hr/>
<hr/>
<hr/>

</div>
: <p dangerouslySetInnerHTML={{__html: resultData}}></p>   /* <p>{resultData}</p>  //"bunu da yapabilirz" */
           }
        
     </div>
  </div>
}
       
              <div className="main-bottom">
                       <div className="search-box">
                            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Ask me anything" />
                              <div>
                                 <img src={assets.gallery_icon} alt="" />
                                 <img src={assets.mic_icon} alt="" />
                                 <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                              </div>
                       </div>
                    <p className="bottom-info">
                    This is a clone of &quot;Gemini&quot;. &quot;GeminiAPI&quot; has been utilized in this website.
                    </p>
              </div>
      </div>
    </div>
  )
}

export default Main