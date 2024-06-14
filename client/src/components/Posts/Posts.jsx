import useGetPosts from "../../hooks/useGetPosts.jsx"
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Posts = () => {
  const { currentUser } = useSelector(state => state.user) 
  const [fetchPosts,getPosts] = useGetPosts()
  const [ showMore, setShowMore ] = useState(true)
  const [ userPosts,setUserPosts ] = useState([])
  useEffect(() => {
    fetchPosts(setShowMore,{    
      userId:currentUser._id
  })
  },[])

  useEffect(() => {
    setUserPosts((prev) => [...prev,...getPosts.posts])
  },[getPosts])

  const handleShowMore = async() => {
    try {
      fetchPosts(setShowMore,{    
        userId:currentUser._id,
        startIndex: userPosts.posts.length - 1
    })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      
         {
             currentUser.isAdmin && userPosts?.posts?.length > 0 ? 
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
                  userPosts.posts.map((post) => {
                    return (
                    <Table.Body className='divide-y'>
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
                          <span className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
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
  )
}

export default Posts