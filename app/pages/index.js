import React, {useState, useEffect} from 'react'
import Link from 'next/link'

import {messagesRef} from "../plugins/firebase"

const Index = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [newUsername, setNewUsername] = useState('')

  messagesRef.onSnapshot(doc => {
    if (doc.docs.length !== messages.length) getMessages()
  })

  useEffect(() => {
    getMessages()
  }, [])

  const onChangeInput = (e, setState) => {
    setState(e.target.value)
  }

  const setMessage = () => {
    messagesRef.doc().set({
      datetime: new Date(),
      user: newUsername,
      content: newMessage
    })
    setNewMessage('')
    setNewUsername('')
  }

  const getMessages = () => {
    messagesRef.orderBy('datetime', 'desc').get()
      .then(snapshot => {
        let tmp = []
        snapshot.forEach(doc => tmp.push({id: doc.id, ...doc.data()}))
        setMessages(tmp)
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
  }

  const renderMessages = () => (
    <div>
      <h3>メッセージ一覧</h3>
      {messages.map(m => (
        <div key={m.id}>
          <p>投稿者: {m.user} - {new Date(m.datetime.seconds * 1000).toLocaleString('ja-JP')}</p>
          <p>{m.content}</p>
          <hr/>
        </div>
      ))}
    </div>
  )

  return (
    <>
      <h1>
        Index
      </h1>
      <Link href="/about">
        <a>to about page</a>
      </Link>
      <div style={{display: 'flex', flexDirection: 'column', width: '30%', marginBottom: '50px'}}>
        <h3>メッセージを投稿する</h3>
        <label htmlFor="name">なまえ</label>
        <input name="name" value={newUsername} style={{marginBottom: '20px'}}
               onChange={(e) => onChangeInput(e, setNewUsername)}/>
        <label htmlFor="message">本文</label>
        <textarea name="message" value={newMessage} style={{marginBottom: '20px'}}
                  onChange={(e) => onChangeInput(e, setNewMessage)}/>
        <button onClick={setMessage} style={{width: '50px'}}>投稿</button>
      </div>
      {renderMessages()}
    </>
  )
}

export default Index