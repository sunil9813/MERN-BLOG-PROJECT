import React, { useContext, useRef } from "react"
import "./login.css"
import back from "../../assets/images/my-account.jpg"
import { Link } from "react-router-dom"
import { Context } from "../../context/Context"
import axios from "axios"

export const Login = () => {
  const userRef = useRef()
  const passRef = useRef()
  const { dispatch, FetchData } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGINSTART" })
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passRef.current.value,
      })
      dispatch({ type: "LOGINSUCC", payload: res.data })
    } catch (error) {
      dispatch({ type: "LOGINFAILED" })
    }
    window.location.replace("/")
  }
  //console.log(user)
  console.log(FetchData)
  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            <div className='text'>
              <h3>Login</h3>
              <h1>My account</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <span>Username or email address *</span>
            <input type='text' required ref={userRef} />
            <span>Password *</span>
            <input type='password' required ref={passRef} />
            <button className='button' type='submit' disabled={FetchData}>
              Log in
            </button>

            <Link to='/register' className='link'>
              Register
            </Link>
          </form>
        </div>
      </section>
    </>
  )
}
