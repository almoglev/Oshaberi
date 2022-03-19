import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Loader from '../assets/loader.gif'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { setAvatarRoute } from '../utils/ApiRoutes'
import ToastOptions from '../utils/ToastOptions'
import { Buffer } from 'buffer'

const SELECT_AVATAR_ERR = "Please select an avatar"
const SET_AVATAR_ERROR = "Cannot set avatar, please try again"

function SetAvatar() {
    // Free avatar generator api
    const api = 'https://api.multiavatar.com/45678945'
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!localStorage.getItem('oshaberi-user')) {
            navigate('/login')
        }
      }, [navigate])
    
    useEffect(() => {
        const fetchingAvatars = async () => {
            const data = []
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
                const buffer = new Buffer(image.data)
                data.push(buffer.toString("base64"))
            }
            setAvatars(data)
            setIsLoading(false)
        }

        fetchingAvatars()
    }, [])

    const setProfilePicture = async () => {
        try {
            if (selectedAvatar === undefined) {
                toast.error(SELECT_AVATAR_ERR, ToastOptions)
            } else {
                const user = await JSON.parse(localStorage.getItem('oshaberi-user'))
                const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                    image: avatars[selectedAvatar]
                })

                user.isAvatarImageSet = true
                user.avatarImage = data.image
                localStorage.setItem('oshaberi-user', JSON.stringify(user))
                navigate('/')
            }
        } catch (err) {
            toast.error(SET_AVATAR_ERROR, {ToastOptions})
        }
    }

  return (
      <>
      {
          isLoading ? 
          (
            <Container>
                <img src={Loader} alt="loader" className='loader' />
            </Container>
          ) : 
          (
            <Container>
                <div className="title-container">
                    <h1>
                        Pick an avatar as your profile picture
                    </h1>

                    <div className="avatars">
                        {
                            avatars.map((avatar, i) => (
                                <div key={i} className= {`avatar ${selectedAvatar === i ? "selected" : ""}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>setSelectedAvatar(i)}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
            </Container>
        )
      }
        <ToastContainer />
      </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.35s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar