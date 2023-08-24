import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        getBlogs();
    }, [])
    const getBlogs = async () => {
        let result = await fetch('https://e-blog-lzgl.onrender.com/blogs');
        result = await result.json();
        setBlogs(result);
        //console.warn(result)
    }
    console.warn("blogs", blogs)

    const searchHandle = async (event) => {
        const key = event.target.value;

        if (key) {
            let result = await fetch(`https://e-blog-lzgl.onrender.com/search/${key}`);
            result = await result.json();
            if (result) {
                setBlogs(result);
            }
        } else {
            getBlogs();
        }
    }



    const DeleteData = async (id) => {


        let result = await fetch(`https://e-blog-lzgl.onrender.com/blogs/${id}`, {
            method: "Delete"

        })
        result = await result.json();

        if (result) {

            getBlogs();
        }

    }

    return (
        <div className="blog-list">
            <h3>Blogs</h3>
            <input className="search" type="text" placeholder="Search Blog" onChange={searchHandle} />
            <br />
            <br />
            {
                blogs.length > 0 ?
                    blogs.map((item) =>
                        <div className="innstylelist">
                            <h1>{item.name}</h1>
                            <p>{item.blog}</p>
                            <button className="delupd" onClick={() => DeleteData(item._id)}>
                                Delete
                            </button>
                            <button className="delupd">
                                <Link to="https://riyag11.github.io/sample-website/site.html">
                                    Read More
                                </Link>
                            </button>
                        </div>
                    )
                    : <h1>No Blog Found</h1>
            }
        </div>
    )
}

export default BlogList;