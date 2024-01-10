import { useState, useRef, useEffect } from "react";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const matchResult = pwd === matchPwd;
    setValidMatch(matchResult);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry!");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setSuccess(true);
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response!");
      } else if (err.response?.status === 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registeration failed!");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        <section>
          {" "}
          <h1>Success!</h1>
        </section>
      ) : (
        <section className="min-w-screen min-h-screen bg-slate-400 flex ">
          <div className=" h-fit max-h-screen w-1/2  mx-auto bg-slate-600  px-10 py-8 rounded-lg text-white max-md:w-4/5 mt-5 space-y-1">
            <p className={errMsg ? "text-red-700" : "hidden"} ref={errRef}>
              {errMsg}
            </p>
            <h1 className="text-4xl mb-5">Register</h1>
            <form className="flex flex-col gap-y-2 " onSubmit={handleSubmit}>
              <label htmlFor="username" className="flex gap-x-2 items-center">
                Username:
                <span
                  className={!validName ? "hidden" : " text-green-300 text-xl"}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validName || !user ? "hidden" : " text-red-300 text-xl"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="username"
                className="w-100 h-10 bg-slate-100 focus: outline-none focus:ring-2 focus:opacity-90 border-slate-800 text-black
        px-4 py-2 rounded-xl"
                placeholder="Username"
                ref={userRef}
                autoComplete="off"
                required
                onChange={(e) => setUser(e.target.value)}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? "bg-black text-white rounded-lg px-3 py-1"
                    : "hidden"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                4 to 24 chars <br />
                Must begin with a letter <br />
                Letters, hyphens, underscores, nums allowed
              </p>
              {/* Password  */}
              <label htmlFor="password" className="flex gap-x-2 items-center">
                Password:
                <span
                  className={!validPwd ? "hidden" : " text-green-300 text-xl"}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validPwd || !pwd ? "hidden" : " text-red-300 text-xl"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="password"
                className="w-100 h-10 bg-slate-100 focus: outline-none focus:ring-2 focus:opacity-90 border-slate-800 text-black
        px-4 py-2 rounded-xl"
                placeholder="Password"
                required
                onChange={(e) => setPwd(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
              />
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPwd
                    ? "bg-black text-white rounded-lg px-3 py-1"
                    : "hidden"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                8 to 24 chars <br />
                Must include uppercase, lowercase, a number and a special
                character{" "}
              </p>
              {/* Confirm Password  */}
              <label htmlFor="confirm" className="flex gap-x-2 items-center">
                Confirm Password:
                <span
                  className={
                    validMatch && matchPwd
                      ? " text-green-300 text-xl"
                      : "hidden"
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validMatch || !matchPwd ? "hidden" : " text-red-300 text-xl"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="confirm"
                className="w-100 h-10 bg-slate-100 focus: outline-none focus:ring-2 focus:opacity-90 border-slate-800 text-black
        px-4 py-2 rounded-xl"
                placeholder="Confirm Password"
                required
                onChange={(e) => setMatchPwd(e.target.value)}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch
                    ? "bg-black text-white rounded-lg px-3 py-1"
                    : "hidden"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                Must must password field
              </p>
              <button
                disabled={!validName || !validPwd || !validMatch ? true : false}
                className="bg-slate-50 text-black py-2 rounded-lg mt-4 hover:bg-slate-200 disabled:opacity-40"
              >
                Signup
              </button>
              <p className="mt-3">
                Already Registered? <br />
                <span className="underline">Sign In</span>
              </p>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
