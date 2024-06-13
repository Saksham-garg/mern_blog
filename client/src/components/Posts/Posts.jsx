import useGetPosts from "../../hooks/useGetPosts.jsx"
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom'

const Posts = () => {
  const [getPosts,currentUser] = useGetPosts()
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      
         {
             currentUser.isAdmin && getPosts?.posts?.length > 0 ? 
                (
                  <Table hoverable className='shadow-md'>
                  <Table.Head>
                     <Table.HeadCell> Date </Table.HeadCell>
                     <Table.HeadCell> Photo </Table.HeadCell>
                     <Table.HeadCell> Title </Table.HeadCell>
                     <Table.HeadCell> Delete </Table.HeadCell>
                     <Table.HeadCell> Edit </Table.HeadCell>
                  </Table.Head>

                { 
                  getPosts.posts.map((post) => {
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
    </div>
  )
}

export default Posts