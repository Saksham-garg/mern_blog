import axios from "axios";
import { Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import Comment from '../Comment/Comment.jsx'
const CommentSection = ({postId}) => {                                                                                                          
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [ comments,setComments ]  = useState([])
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (comment.length > 200) {
        return;
      }
    try {
        const res = await axios.post(`/api/v1/comment/create/${postId}/${currentUser._id}`,{
            comment
        })
        if(!res){
            console.log(error)
            return
        }else{
            setComments([res.data.data,...comments])
        }
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {
    try {
        const fetchComments = async() => {
            const res = await axios.get(`/api/v1/comment/getComments/${postId}`)
            if(!res){
                console.log(res)
                return
            }
            console.log(res.data.data)  
            setComments([...res.data.data])
        }   
        fetchComments()
    } catch (error) {
        console.log(error)
    }
  },[postId])
  return (
    <div className="max-w-3xl mx-auto mt-5">
      {currentUser ? (
        <p className="text-sm">
          You are signed in as{" "}
          <span className="text-teal-500 hover:underline">
            @{currentUser.username}
          </span>
        </p>
      ) : (
        <p className="text-teal-500 text-sm">
          Please sign in to add comment
          <Link to="/sign-in">
            <span className="hover:underline"> Sign in</span>
          </Link>
        </p>
      )}
      {
        currentUser && 
        (
            <form className="p-3 flex flex-col gap-5 w-full border border-teal-500 rounded-lg mt-5" onSubmit={(e) => handleSubmitComment(e)}>
                <Textarea
                placeholder="Write something..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                minLength="3"
                rows="3"
                maxLength="200"
                />
                <div className="flex justify-between items-center">
                <p className="text-xs">{200 - comment.length} text remaining</p>
                <Button
                    outline
                    gradientDuoTone="purpleToPink"
                    type="submit"
                >Submit</Button>
                </div>
            </form>
        )
      }
      {
        <div className="flex gap-1 items-center text-sm my-5">
            <p>Comments</p>
            <div className="py-1 px-2 rounded-sm border border-gray-400">
                {comments.length}
            </div>
        </div>
      }
      {
        comments.map((comment) => {
            return <Comment comment={comment} key={comment._id}/>
        })
      }
    </div>
  );
};

export default CommentSection;
