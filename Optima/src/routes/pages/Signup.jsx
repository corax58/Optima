import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function checkPasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) {
    strength += 1;
  }

  if (password.match(/[a-z]/)) {
    strength += 1;
  }

  if (password.match(/[A-Z]/)) {
    strength += 1;
  }

  if (password.match(/[0-9]/)) {
    strength += 1;
  }

  if (password.match(/[^a-zA-Z0-9]/)) {
    strength += 1;
  }

  let strengthMessage = "";

  switch (strength) {
    case 0:
    case 1:
      strengthMessage = "Very Weak";
      break;
    case 2:
      strengthMessage = "Weak";
      break;
    case 3:
      strengthMessage = "Moderate";
      break;
    case 4:
      strengthMessage = "Strong";
      break;
    case 5:
      strengthMessage = "Very Strong";
      break;
  }

  let color = "";

  switch (strength) {
    case 0:
    case 1:
      color = "text-red-500";
      break;
    case 2:
      color = "text-red-500";
      break;
    case 3:
      color = "text-yellow-500";
      break;
    case 4:
      color = "text-green-500";
      break;
    case 5:
      color = "text-green-500";
      break;
  }

  return { strengthMessage, strength, color };
}

const Signup = () => {
  const [Visible, setVisible] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [strength, setStrength] = useState({});
  const { signup, error, isLoading } = useSignup();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (strength.strength < 3) {
      setPasswordError("Password is too weak");
      return;
    }
    await signup(email, password);
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
      <div className=" h-full md:h-3/4 w-96 shadow-2xl  rounded-xl mx-auto ">
        <div className=" items-center flex  flex-col h-full justify-center space-y-4">
          <h1 className=" text-4xl mb-2 transition-all duration-900 ease-in-out">
            Create an Account
          </h1>
          <form
            action=""
            className="flex flex-col space-y-2 font-medium"
            onSubmit={handleSubmit}
          >
            <label htmlFor="">Email</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="input input-bordered"
            />
            <label htmlFor="password">Password</label>
            <div className="flex">
              <input
                required
                minLength={6}
                maxLength={23}
                type={Visible}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setStrength(checkPasswordStrength(e.target.value));
                }}
                className="input input-bordered"
              />
              <div
                onClick={handlePasswordVisible}
                className="  cursor-pointer  flex items-center -mx-6"
              >
                {Visible == "text" ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>{" "}
            <div className={"text-sm " + strength.color}>
              {strength.strengthMessage}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmpassword">Confirm password</label>
              <input
                required
                id="confirmpassword"
                minLength={6}
                maxLength={23}
                type={Visible}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input input-bordered"
              />
              {passwordError && (
                <div className="text-sm text-red-500">{passwordError}</div>
              )}
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
            <button type="submit" className="btn btn-accent ">
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div>
            Already have an account?{" "}
            <Link to={"/login"} className="link  ">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
