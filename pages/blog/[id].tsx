import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Link from "next/link";

import firebaseConfig from "@config/fire-conf";

type BlogPageProps = {
  blog: BlogProps;
};

export const getServerSideProps = async ({ query }) => {
  let blogData = {};

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);

  const docRef = doc(db, "blog", query.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    blogData = {
      ...docSnap.data(),
    };
  } else {
    console.log("No such document");
  }

  return {
    props: {
      blog: blogData,
    },
  };
};

const Blog: React.FC<BlogPageProps> = ({ blog }) => {
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  );
};

export default Blog;
