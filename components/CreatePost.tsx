//Documentation : https://firebase.google.com/docs/firestore/quickstart#web-v9_2
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import firebaseConfig from "@config/fire-conf";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const firebaseApp = initializeApp(firebaseConfig);
      const db = getFirestore(firebaseApp);

      const docRef = await addDoc(collection(db, "blog"), {
        title,
        content,
      });

      setTitle("");
      setContent("");

      setNotification("Blogpost created with id " + docRef.id);

      setTimeout(() => {
        setNotification("");
      }, 2000);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  };

  return (
    <div>
      <h2>Add Blog</h2>
      {notification}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          value={content}
          onChange={({ target }) => setContent(target.value)}
          id="1"
          cols={30}
          rows={10}
        ></textarea>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default CreatePost;
