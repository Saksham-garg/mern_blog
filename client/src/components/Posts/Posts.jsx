import useGetPosts from "../../hooks/useGetPosts.jsx"
import { Table, Modal, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const Posts = () => {
  const { currentUser } = useSelector(state => state.user) 
  const [ showMore, setShowMore ] = useState(true)
  const [ getPosts,setPosts ] = useState({})
  const [ showModal, setShowModal ] = useState(false)
  const [ deletePostId,setDeletePostId ] = useState('')

  useEffect(() => {
    try {
        const fetchPosts = async() => {
            const posts = await axios.get(`/api/v1/post/getAllPosts`)
            if(!posts){
              console.log(posts.data.message)
              return
            }
            setPosts([...posts.data.data.posts])
            if(posts.data.data.posts.length < 9){
              setShowMore(false)
            }else{
              setShowMore(true)
            }
        }
        fetchPosts()  
    } catch (error) {
        console.log(error)
    }
  },[])


  const handleShowMore = async() => {
    try {
      const fetchPosts = async() => {
        const posts = await axios.get(`/api/v1/post/getAllPosts`,{
          startIndex: getPosts.length - 1
        })
        if(!posts){
          console.log(posts)
          return
        }
        setPosts([...getPosts,posts.data.data.posts])
        if(posts.data.data.posts.length < 9){
          setShowMore(false)
        }else{
          setShowMore(true)
        }
    }
    fetchPosts() 
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeletePost = async() => {
    setShowModal(false)
    try {
      const res = axios.delete(`/api/v1/post/delete-post/${deletePostId}/${currentUser._id}`)
      if(!res){
        console.log("some error occured")
        return 
      }
      setPosts((prev) => prev.filter((post) => post._id != deletePostId))

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      
         {
           currentUser.isAdmin && getPosts?.length > 0 ? 
           (
             <Table hoverable className='shadow-md'>
                  <Table.Head>
                     <Table.HeadCell> Date </Table.HeadCell>
                     <Table.HeadCell> Post Image </Table.HeadCell>
                     <Table.HeadCell> Post Title </Table.HeadCell>
                     <Table.HeadCell> Category </Table.HeadCell>
                     <Table.HeadCell> Delete </Table.HeadCell>
                     <Table.HeadCell> Edit </Table.HeadCell>
                  </Table.Head>

                { 
                  getPosts.map((post) => {
                    return (
                      <Table.Body className='divide-y' key={post._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>{  new Date(post.createdAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                            <Link to={`/post/${post.slug}`}>
                               <img src={post.imageUrl} alt="post_img" className='w-20 h-10 object-cover bg-gray-500' />
                            </Link>
                          </Table.Cell>
                        <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <span className='font-medium text-gray-900 dark:text-white'>{ post.title }</span>
                        </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <span className='font-medium text-gray-900 dark:text-white'>{ post.category }</span>
                        </Table.Cell>
                        <Table.Cell>
                          <span className="font-medium text-red-500 hover:underline cursor-pointer" onClick={() => {
                            setShowModal(true)
                            setDeletePostId(post._id)
                          }}>Delete</span>
                        </Table.Cell>
                        <Table.Cell>
                        <Link to={`/update-post/${post._id}`}>
                          <span className="font-medium text-teal-500 hover:underline cursor-pointer">Edit</span>
                        </Link>
                        </Table.Cell>
                    </Table.Row>
            </Table.Body>
                  )
                }) 
              }
        </Table>
      ) : (
        <p>You don't have any posts yet.</p>
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

            <p className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this post?</p>
          </div>
          <div className="flex justify-between">
            <Button color="failure" onClick={() => handleDeletePost()}>Yes,I'm sure</Button>
            <Button color="gray" onClick={() => setShowModal(false)}>No, cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Posts