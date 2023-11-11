import React, { useEffect, useState } from 'react'
import Post from './Post'
import axios from 'axios';
function Dashboard() {
    const [text,setText] = useState("");
    const [posts,setPosts] = useState([])
    const handlePostClick = async ()=>{
        const CREATE_POST_URL="http://127.0.0.1:5000/create-post";
        const data={
            text,
            createdBy:"mohit",
            comments:[],
            likes:[]
        }
        try{
            await axios.post(CREATE_POST_URL,data);
        }catch(error){
            if(error.response.status==403){
                alert('You are un authorized');
            }else{
                alert('Something went Wrong!');
            }
        }
        setPosts([...posts,data]);
        setText("");

    }

    const getPosts =async ()=>{
        const GET_POSTS_URL="http://127.0.0.1:5000/posts"
        try{
            let  res = await axios.get(GET_POSTS_URL);
            setPosts([...posts,...res.data.posts]);
            console.log(posts)
            
            

        }catch(error){
            alert('Something went wrong');
        }

    }
    useEffect(()=>{
        getPosts();
    },[])
    
  return (
    <div className="min-h-full w-full bg-slate-200 p-4">
        <div className='w-3/4  mx-auto '>
            <div className="w-full mx-auto mb-8">
                <textarea type="textarea" className='block border border-black w-full  h-40 rounded-lg p-4 text-3xl' placeholder='Create a Post!'
                    value={text}
                    onChange={(e)=>{setText(e.target.value)}}
                />
                <button className='block bg-slate-900 text-white px-4 py-2 rounded-md ml-auto mt-2' onClick={handlePostClick}>Post</button>
            </div>

            {posts.map((elem)=>{
                console.log(elem)
                return <Post text={elem.text} like={0} createdBy={elem.createdBy} comments={elem.comments} ids={elem._id}/>
            })}
       
        </div>

    </div>
  )
}

export default Dashboard