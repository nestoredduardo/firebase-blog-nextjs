import {useState} from 'react'

import fire from '@config/fire-conf';

const CreatePost = ()=>{
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()

    fire.firestore()
      .collection('blog')
      .add({
        title: title,
        content: content,
      })

    setTitle('')
    setContent('')
  }

  return <div>
    <h2>Add Blog</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" value={title} onChange={({target})=> setTitle(target.value)} />
      <label htmlFor="content">Content</label>
      <textarea name="content" value={content} onChange={({target})=> setContent(target.value)} id="1" cols={30} rows={10}></textarea>
      <button type='submit'>Create Blog</button>
    </form>
  </div>
}

export default CreatePost