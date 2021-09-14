import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import CreatePost from "@components/CreatePost";
import firebaseConfig from "@config/fire-conf";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [usermail, setUsermail] = useState("");
  const [notify, setNotify] = useState("");

  useEffect(async () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);

    const querySnapshot = await getDocs(collection(db, "blog"));
    const blogs = [];
    querySnapshot.forEach((doc) => {
      blogs.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setBlogs(blogs);

    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsermail(user.email);
      } else {
        console.log("No user");
      }
    });
  }, []);

  const handleLogout = async () => {
    const firebaseApp = initializeApp(firebaseConfig);
    await getAuth(firebaseApp).signOut();
    setUsermail("");
    setNotify("Logged out");
    setTimeout(() => {
      setNotify("");
    }, 2000);
  };

  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      <h1>Blog</h1>
      {notify}
      {!usermail ? (
        <div>
          <Link href="/users/register">
            <a>Sign up</a>
          </Link>
          <Link href="/users/login">
            <a>Login</a>
          </Link>
        </div>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      <ul>
        {blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>
                <a>{blog.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      <CreatePost />
    </div>
  );
}
