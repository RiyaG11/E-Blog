import React, { useState } from 'react';
const AddBlog = () => {
    const [name, setName] = useState("");
    const [blog, setBlog] = useState("");

    const UserId = JSON.parse(localStorage.getItem('user'))._id;
    const blogData = async () => {
        console.warn(name, blog, UserId)

        let result = await fetch('http://localhost:3000/add', {
            method: "post",
            body: JSON.stringify({ name, blog, UserId }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json();
        console.warn(result)


    }
    return (
        <div className='register'>
            <h1>Add Blog</h1>
            <input type='text' className='inStyle' placeholder='Blog Heading' value={name} onChange={(e) => { setName(e.target.value) }} />
            <textarea className='inStyle' placeholder='Enter the Blog' value={blog} onChange={(e) => { setBlog(e.target.value) }} ></textarea>
            <button className='btn' onClick={blogData}>Add Blog</button>

        </div>
    );
}

export default AddBlog;