import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
const [value, setValue] = useState('');
  return (
    <div className='min-h-screen max-w-3xl mx-auto p-3'>
        <h1 className='my-7 text-3xl font-semibold text-center'>Create Post</h1>
        <form>
            <div className="flex flex-col gap-6 ">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <TextInput placeholder='Title' required className='flex-1'></TextInput>
                    <Select>
                        <option value="uncategorized">Select a category</option>
                        <option value="Javascript">Javascript.js</option>
                            <option value="Python">Python</option>
                            <option value="Ruby on Rails">Ruby on Rails</option>
                    </Select>
                </div>
                <div className="flex gap-4 justify-between items-center border-2 border-teal-500 border-dotted p-3">
                    <FileInput type="file" accept='image/*'/>
                    <Button type='submit' gradientDuoTone="purpleToPink" outline>Upload Image</Button>
                </div>
                <ReactQuill theme="snow" value={value} onChange={setValue} className='h-72 mb-12' required/>
                <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>
            </div>
        </form>
    </div>
  )
}

export default CreatePost