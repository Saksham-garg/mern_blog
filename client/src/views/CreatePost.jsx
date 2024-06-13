import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../components/firebase.js'
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import useCreatePost from '../hooks/useCreatePost.jsx';

const CreatePost = () => {

    const [file, setFile ] = useState(null)
    const [imageUploadProgress, setImageUploadProgress ] = useState(null)   
    const [imageUplaodError, setImageUploadError ] = useState(null)
    const [formData, setFormData ] = useState({})

    const handleCreatePost = useCreatePost()
    
    const handleUploadedImage = async() => {
        try {
            if(!file){
                setImageUploadError('Please select an image to upload')
                return
            }
            setImageUploadError(null)
            console.log(file)
            const storage = getStorage(app)
            const fileName = new Date().getTime() + '-' + file.name
            const storageRef = ref(storage,fileName)
            const uploadTask = uploadBytesResumable(storageRef,file)
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setImageUploadProgress(progress.toFixed(0))
                },
                (error) => {
                    setImageUploadError('Image Upload failed')
                    setImageUploadProgress(null)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null)
                        setImageUploadError(null)
                        setFormData({...formData,image:downloadURL})
                    })
                }
            )
        } catch (error) {
            setImageUploadError(error.message)
            setImageUploadProgress(null)
            console.log(error)
        }
    }
  return (
    <div className='min-h-screen max-w-3xl mx-auto p-3'>
        <h1 className='my-7 text-3xl font-semibold text-center'>Create Post</h1>
        <form>
            <div className="flex flex-col gap-6 ">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <TextInput placeholder='Title'  className='flex-1' onChange={(e) => setFormData({...formData,title:e.target.value})}></TextInput>
                    <Select onChange={(e) => setFormData({...formData, category:e.target.value})}>
                        <option value="uncategorized">Select a category</option>
                        <option value="Javascript">Javascript.js</option>
                            <option value="Python">Python</option>
                            <option value="Ruby on Rails">Ruby on Rails</option>
                    </Select>
                </div>
                <div className="flex gap-4 justify-between items-center border-2 border-teal-500 border-dotted p-3">
                    <FileInput type="file" accept='image/*' onChange={(e) => setFile(e.target.files[0])}/>
                    {
                        imageUploadProgress ?
                        <div className="w-16 h-16">
                             <CircularProgressbar  value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>   
                        </div> : 
                        <Button gradientDuoTone="purpleToPink" outline onClick={handleUploadedImage}>Upload Image</Button>
                    }
                </div>
                {
                    imageUplaodError && 
                        <Alert color="failure">{ imageUplaodError }</Alert>
                }
                {
                    formData.image && 
                            <img src={formData.image} alt="post_image" className="w-full h-72 object-cover"></img>
                }
                <ReactQuill theme="snow" placeholder='Write something...' onChange={(value) => setFormData({...formData,content: value})} className='h-72 mb-12' required/>
                <Button type="submit" gradientDuoTone="purpleToPink" onClick={(e) => handleCreatePost(e, formData,setFormData)}>Publish</Button>
            </div>
        </form>
    </div>
  )
}

export default CreatePost