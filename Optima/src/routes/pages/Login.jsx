import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [Visible, setVisible] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const { user } = useAuthContext();
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await login(emailOrUserName, password);
    await login(email, password).finally(() => {});
  };

  const handlePasswordVisible = () => {
    if (Visible == "password") {
      setVisible("text");
    } else {
      setVisible("password");
    }
  };

  if (user) {
    console.log(user);
    return <Navigate to={"/"} />;
  }

  return (
    <div className="h-screen w-screen items-center flex">
      <div className=" h-3/4 w-96  shadow-2xl  rounded-xl mx-auto ">
        <div className=" items-center flex  flex-col h-full justify-center space-y-4">
          <h1 className="text-4xl mb-2">Welcome Back</h1>
          <form
            action=""
            className="flex flex-col space-y-2 font-medium"
            onSubmit={handleSubmit}
          >
            <label htmlFor="">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="input input-bordered"
            />
            <label htmlFor="password">Password</label>
            <div className="flex">
              <input
                type={Visible}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input input-bordered"
              />

              <div
                onClick={handlePasswordVisible}
                className="  cursor-pointer  flex items-center -mx-6"
              >
                {Visible == "text" ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <div>
              {error && (
                <div role="alert" className="alert alert-warning p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-accent">
              {isLoading ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div>
            Dont have an account?{" "}
            <Link to={"/signup"} className="link">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
