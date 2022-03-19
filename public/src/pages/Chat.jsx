import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { allUsersRoute } from '../utils/ApiRoutes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'

function Chat() {
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const localStorageUser = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)      
      if (!localStorageUser) {
        navigate('/login')
      } else {
        if (!currentUser || currentUser === undefined) {
          setCurrentUser(await JSON.parse(localStorageUser))
        }
      }
    }

    fetchCurrentUser()
  }, [currentUser, navigate])
  

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser || currentUser !== undefined) {
        if (currentUser.isAvatarImageSet) {
          const allUsers = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(allUsers.data)
        } else {
          navigate('/setAvatar')
        }
      }
    }

    fetchContacts()
  }, [currentUser, navigate])
  
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <Container>
      <div className='container'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        {
          currentChat === undefined ?
          <Welcome currentUser={currentUser} /> :
          <ChatContainer currentChat={currentChat} />
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat