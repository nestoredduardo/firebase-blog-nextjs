import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import firebaseConfig from "@config/fire-conf";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [notify, setNotify] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const firebaseApp = initializeApp(firebaseConfig);
      const auth = getAuth(firebaseApp);
      const userCredential = signInWithEmailAndPassword(auth, email, password);
      const user = (await userCredential).user;
      console.log(user);

      setEmail("");
      setPasword("");

      router.push("/");
    } catch (error) {
      const code = error.code;
      const message = error.message;
      setNotify(code + message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {notify}
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required={true}
        />
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPasword(target.value)}
          required={true}
        />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
