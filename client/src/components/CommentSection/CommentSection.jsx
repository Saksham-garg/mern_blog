import axios from "axios";
import { Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
const CommentSection = ({postId}) => {                                                                                                          
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post(`/api/v1/comment/create/${postId}/${currentUser._id}`,{
            comment
        })
        if(!res){
            console.log(error)
            return
        }
    } catch (error) {
        console.log(error)
    }

  };
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
    </div>
  );
};

export default CommentSection;
