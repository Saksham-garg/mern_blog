import axios from "axios";
import { Button, Textarea, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import Comment from '../Comment/Comment.jsx'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const CommentSection = ({postId}) => {                                                                                                          
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [ comments,setComments ]  = useState([])
  const [showModal, setShowModal ] = useState(false)
  const [ commentIdToDelete, setCommentIdToDelete ] = useState(null) 
  const navigate = useNavigate()
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

  const handleLikeComment = async(comment_id) => {
        if(!currentUser){
          navigate('/sign-in')
          return
        }
        try {
            const res = await axios.put(`/api/v1/comment/likeComment/${comment_id}`)
            if(res){
                setComments([...comments.map((comment) => {
                    return comment._id == comment_id ? {
                        ...comment,
                        likes:[...res.data.data.likes],
                        numberOfLikes: res.data.data.numberOfLikes
                    } : comment
                })])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (editedComment,comment_id) => {
      setComments([...comments.map((comment) => {
        return comment._id == comment_id ? {
            ...comment,
            comment:editedComment
        } : comment
    })])
    }

    const handleDelete = async(comment_id) => {
      if(!currentUser){
        navigate('/sign-in')
        return
      }
      try {
        const res = await axios.delete(`/api/v1/comment/delete-comment/${comment_id}`)
        if(res){
          setComments(comments.filter((comment) => comment._id !== comment_id))
          setShowModal(false)
        }
      } catch (error) {
        console.log(error)
      }
    }

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
            return <Comment comment={comment} onLike={handleLikeComment} onEdit={handleEdit} onDelete={() => {
              setShowModal(true)
              setCommentIdToDelete(comment._id)
            }} key={comment._id}/>
        })
      }
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header/>
          <Modal.Body>
            <div className="text-center">
              {/* <div className="w-full mx-auto"> */}
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />

              {/* </div> */}
              <p className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete the comment?</p>
            </div>
            <div className="flex justify-between">
              <Button color="failure" onClick={() => handleDelete(commentIdToDelete)}>Yes,I'm sure</Button>
              <Button color="gray" onClick={() => setShowModal(false)}>No, cancel</Button>
            </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CommentSection;
