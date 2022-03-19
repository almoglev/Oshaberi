import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'

function Contacts({ contacts, currentUser }) {

  console.log("contacts: ", contacts)
  console.log("current user: ", currentUser)

    const [currentUsername, setCurrentUsername] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined)

    useEffect(() => {
      console.log("contacts: ", contacts)
      console.log("current user: ", currentUser)

        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUsername(currentUser.username)
        }
    }, [currentUser, contacts])

    const changeCurrentChat = (index, contact) => {

    }
    

  return (
    <>
        {
            (
              currentUserImage && currentUsername) && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h3>Oshaberi</h3>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact, i) => (
                                <div className={`contact ${i === currentChat ? "selected" : ""}`} key={i}>
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"/>
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar"/>
                        </div>
                        <div className="username">
                            <h2>{currentUsername}</h2>
                        </div>
                    </div>
                </Container>
            )
        }
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.8rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      &:hover {
        //background-color: #4e0eff;
        background-color: #997af0;
      }

      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;

      //background-color: #4e0eff;
      //background-color: #997af0;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts