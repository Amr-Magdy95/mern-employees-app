import { useState, useRef, useEffect } from "react";
import axios from "../../../api/axios";
import { useAuthContext } from "../../context/AuthProvider";
import { useNavigate, useLocation, Link } from "react-router-dom";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, accessToken, roles });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Failed to connect to server");
      } else {
        setErrMsg(err?.response?.data?.message);
      }
      errRef.current.focus();
    }
  };
  return (
    <section className="min-w-screen min-h-screen bg-slate-400 flex ">
      <div className=" h-fit max-h-screen w-1/2  mx-auto bg-slate-600  px-10 py-8 rounded-lg text-white max-md:w-4/5 mt-5 space-y-1">
        <p ref={errRef} className={errMsg ? "text-red-700" : "hidden"}>
          {errMsg}
        </p>
        <h1 className="text-4xl mb-5">Login</h1>
        <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            ref={userRef}
            className="form-input"
            placeholder="Username"
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user || ""}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="Password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd || ""}
            required
          />
          <button
            className="form-button"
            disabled={!user || !pwd ? true : false}
          >
            Sign In
          </button>
        </form>
        <p className="mt-3">
          Need An Account? <br />
          <span className="underline">Sign Up</span>
        </p>
      </div>
    </section>
  );
};

export default Login;
