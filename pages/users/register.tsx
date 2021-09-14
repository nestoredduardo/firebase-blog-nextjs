import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

import firebaseConfig from "@config/fire-conf";

const Register = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passconf, setPassconf] = useState("");

  const [notification, setNotification] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passconf) {
      setNotification("Password does not match");

      setTimeout(() => {
        setNotification("");
      }, 2000);

      return null;
    }

    try {
      const firebaseApp = initializeApp(firebaseConfig);
      const auth = getAuth(firebaseApp);
      const userCredential = createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = (await userCredential).user;
      console.log(user);

      router.push("/");
    } catch (error) {
      let code,
        message = { error };
      console.log(code, message);
    }
  };

  return (
    <div>
      <h1>Create new user</h1>
      {notification}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
        />
        <input
          type="password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
        <input
          type="password"
          value={passconf}
          onChange={({ target }) => {
            setPassconf(target.value);
          }}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Register;
