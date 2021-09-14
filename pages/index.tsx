import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import CreatePost from "@components/CreatePost";
import firebaseConfig from "@config/fire-conf";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

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
  }, []);
  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      <h1>Blog</h1>
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
