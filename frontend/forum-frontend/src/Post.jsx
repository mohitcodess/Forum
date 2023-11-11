import React, { useState } from 'react'
import Comment from './Comment';
import axios from 'axios';
function Post(props) {
  const [commentActive,setCommentActive] = useState(false); 
  const [comment,setComment] = useState("");
  const handleCommentOnClick = ()=>{
    setCommentActive(true);
    
  }
  const handleCommentPost=(id)=>{
    console.log(id)
    const POST_COMMMENT_URL = `http://127.0.0.1:5000/comment/${id}`
     axios.post(POST_COMMMENT_URL,{
      text:comment,
      createdBy:props.createdBy
     })
     setCommentActive(false);
  }
  return (
    <div className="p-6  rounded-lg w-3/4 bg-white m-auto mt-2 shadow-xl">
      <div className="flex gap-4 items-center">
        <div className="h-12 w-12 bg-slate-500 rounded-full"></div>
        <span className='text-2xl'>{props.createdBy}</span>
      </div>
        <div className='bg-slate-300 p-4 rounded-lg my-4'>
            
            <span className='text-lg'>{props.text}</span>
        </div>
        <div className="flex justify-end items-center gap-10  " 
          style={{display:!commentActive?"flex":"none"}}
          
        >
            <button className='bg-[#e3ac2b]  text-lg p-2 rounded-md w-32' onClick={()=>{handleCommentOnClick(props.ids)}} value={comment} onChange={(e)=>{setComment(e.target.value)}}>Comment</button>
            <button className='bg-[#e3ac2b]    text-lg p-2 rounded-md w-32'>Like</button>
             
        </div>
        <div className="flex justify-around p-4 bg-slate-300" style={{display:commentActive?"block":"none"}}>
           <input className='border-2 border-black p-2 h-16 w-full text-lg' type="text"  />   
            <button className=' block bg-slate-900 text-white p-4 rounded-md ml-auto mt-2'
              onClick={handleCommentPost}
            >Post </button>
                       
            {props.comments.map((elem)=>{
                return <Comment text={elem.text} createdBy={elem.createdBy}/>
            })}
        </div>


    </div>

  )
}
export default Post;