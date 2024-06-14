import { Table, Modal, Button } from 'flowbite-react'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck, FaTimes } from 'react-icons/fa'

const Users = () => {
  const { currentUser } = useSelector(state => state.user) 
  const [ showMore, setShowMore ] = useState(true)
  const [ users,setUsers ] = useState([])
  const [ showModal, setShowModal ] = useState(false)
  const [ deleteUserId,setDeleteUserId ] = useState('')
  useEffect(() => {
    try {
        const fetchUsers = async() => {
            const users = await axios.get(`/api/v1/user/getUsers`)
            if(!users){
              console.log(users.data.message)
              return
            }
            setUsers([...users.data.data.users])
            if(users.data.data.users.length < 9){
              setShowMore(false)
            }else{
              setShowMore(true)
            }
        }
        fetchUsers()  
    } catch (error) {
        console.log(error)
    }
  },[])



  const handleShowMore = async() => {
    try {
      const fetchUsers = async() => {
        const users = await axios.get(`/api/v1/user/getUsers`,{
          startIndex: userPosts.posts.length - 1
        })
        if(!users){
          console.log(users)
          return
        }
        setUsers([...users,users.data.data.users])
        if(users.users.length < 9){
          setShowMore(false)
        }else{
          setShowMore(true)
        }
    }
    fetchUsers() 
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteUser = async() => {
    setShowModal(false)
    try {
      const res = axios.delete(`/api/v1/user/delete/${deleteUserId}`)
      if(!res){
        console.log("some error occured")
        return 
      }
      setUsers((prev) => prev.filter((user) => user._id != deleteUserId))

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      
         {
           currentUser.isAdmin && users?.length > 0 ? 
           (
             <Table hoverable className='shadow-md'>
                  <Table.Head>
                     <Table.HeadCell> Date Created </Table.HeadCell>
                     <Table.HeadCell> User Image </Table.HeadCell>
                     <Table.HeadCell> Username </Table.HeadCell>
                     <Table.HeadCell> Email </Table.HeadCell>
                     <Table.HeadCell> Admin </Table.HeadCell>
                     <Table.HeadCell> Delete </Table.HeadCell>
                  </Table.Head>

                { 
                  users.map((user) => {
                    return (
                      <Table.Body className='divide-y' key={user._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>{  new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                              <img src={user.profilePicture} alt="post_img" className='w-10 h-10 rounded-full object-cover bg-gray-500' />
                        </Table.Cell>
                        <Table.Cell>
                          <span className='font-medium text-gray-900 dark:text-white'>{ user.username }</span>
                        </Table.Cell>
                        <Table.Cell>
                          { user.email }
                        </Table.Cell>
                        <Table.Cell>
                          { user.isAdmin ? <FaCheck className='text-green-500' /> : <FaTimes className='text-red-500' /> }
                        </Table.Cell>
                        <Table.Cell>
                          <span className="font-medium text-red-500 hover:underline cursor-pointer" onClick={() => {
                            setShowModal(true)
                            setDeleteUserId(user._id)
                          }}>Delete</span>
                        </Table.Cell>
                    </Table.Row>
            </Table.Body>
                  )
                }) 
              }
        </Table>
      ) : (
        <p>You don't have any users yet.</p>
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
            <Button color="failure" onClick={() => handleDeleteUser()}>Yes,I'm sure</Button>
            <Button color="gray" onClick={() => setShowModal(false)}>No, cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Users