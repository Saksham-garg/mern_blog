import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal, Table, Button, Spinner } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Comments = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ showMore, setShowMore ] = useState(true)
  const [ deleteCommentId,setDeleteCommentId ] = useState(null)
  const [ showModal,setShowModal ] = useState(false)
  const [recentPosts, setRecentPosts] = useState([]);
  useEffect(() => {
    try {
      const fetchComments = async () => {
        setLoading(true);
        setError(null);
        const comments = await axios.get(`/api/v1/comment/getAllComments`);
        if (!comments) {
          setError(comments.data.message);
          setLoading(false);
          console.log(comments.data.message);
          return;
        }
        if(comments.data.data.comments.length < 9){
          setShowMore(false)
        }else{
          setShowMore(true)
        }
        setLoading(false);
        setError(null);
        setComments(comments.data.data.comments);
      };
      fetchComments();
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  },[]);

  const handleShowMore = async() => {
   try {
     const res = await axios.get(`/api/v1/comment/getAllComments`,{
       params:{
         startIndex: comments.length - 1
       }
     })
     if(res.data.data.comments >= 9){
       setShowMore(true)
     }else{
       setShowMore(false)
     }
     setComments([...comments,res.data.data.comments])
   } catch (error) {
      console.log(error)
   }
  }
  const handleDeleteComment = async() => {
    if(!currentUser){
      navigate('/sign-in')
      return
    }
    try {
      const res = await axios.delete(`/api/v1/comment/delete-comment/${deleteCommentId}`)
      if(res){
        setComments(comments.filter((comment) => comment._id !== deleteCommentId))
        setShowModal(false)
      }
    } catch (error) {
      console.log(error)
    }
  }


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }
  return (
    <>
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      
         {
           currentUser.isAdmin && comments?.length > 0 ? 
           (
             <Table hoverable className='shadow-md'>
                  <Table.Head>
                     <Table.HeadCell> Date created</Table.HeadCell>
                     <Table.HeadCell> Comment content </Table.HeadCell>
                     <Table.HeadCell> Number of likes </Table.HeadCell>
                     <Table.HeadCell> Post ID </Table.HeadCell>
                     <Table.HeadCell> User ID </Table.HeadCell>
                     <Table.HeadCell> Delete </Table.HeadCell>
                  </Table.Head>

                { 
                  comments.map((comment) => {
                    return (
                      <Table.Body className='divide-y' key={comment._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>{  new Date(comment.createdAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                          <span className='font-medium text-gray-900 dark:text-white'>{ comment.comment }</span>
                        </Table.Cell>
                        <Table.Cell>
                          <span className='font-medium text-gray-900 dark:text-white'>{ comment.numberOfLikes }</span>
                        </Table.Cell>
                        <Table.Cell>
                          <span className='font-medium text-gray-900 dark:text-white'>{ comment.postId }</span>
                        </Table.Cell>
                        <Table.Cell>
                          <span className='font-medium text-gray-900 dark:text-white'>{ comment.userId }</span>
                        </Table.Cell>
                        <Table.Cell>
                          <span className="font-medium text-red-500 hover:underline cursor-pointer" onClick={() => {
                            setShowModal(true)
                            setDeleteCommentId(comment._id)
                          }}>Delete</span>
                        </Table.Cell>
                    </Table.Row>
            </Table.Body>
                  )
                }) 
              }
        </Table>
      ) : (
        <p>You don't have any Comments yet.</p>
        ) 
      }
    {
      showMore &&
      <p className="font-medium text-red-500 hover:underline cursor-pointer" onClick={handleShowMore}>Show more</p>
    }
    </div>
    <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />

            <p className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this comment?</p>
          </div>
          <div className="flex justify-between">
            <Button color="failure" onClick={() => handleDeleteComment()}>Yes,I'm sure</Button>
            <Button color="gray" onClick={() => setShowModal(false)}>No, cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Comments