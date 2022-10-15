import React, { useEffect } from "react"
import "./create.css"
import { IoIosAddCircleOutline } from "react-icons/io"
import { useState } from "react"
import { useContext } from "react"
import { Context } from "../../context/Context"
import axios from "axios"
import { useLocation } from "react-router-dom"

export const Create = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const { user } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPost = {
      username: user.username,
      title,
      desc,
      file,
    }

    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("name", filename)
      data.append("file", file)
      newPost.photo = filename

      try {
        await axios.post("/upload", data)
      } catch (error) {
        console.log(error)
      }
    }
    try {
      const res = await axios.post("/posts", newPost)
      window.location.replace("/post/" + res.data._id)
    } catch (error) {}
  }

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <div className='img '>{file && <img src={URL.createObjectURL(file)} alt='images' />}</div>
          <form onSubmit={handleSubmit}>
            <div className='inputfile flexCenter'>
              <label htmlFor='inputfile'>
                <IoIosAddCircleOutline />
              </label>
              <input type='file' id='inputfile' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <input type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
            <textarea name='' id='' cols='30' rows='10' onChange={(e) => setDesc(e.target.value)}></textarea>
            <button className='button'>Create Post</button>
          </form>
        </div>
      </section>
    </>
  )
}
