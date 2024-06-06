import React, { useState } from "react";
import useForgotPassword from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const forgotPassword = useForgotPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword.mutate({ email });
  };
  console.log();

  return (
    <div>
      {" "}
      <div className="h-screen w-screen items-center flex">
        <div className=" h-3/4 w-96  shadow-2xl  rounded-xl mx-auto ">
          <div className=" items-center flex  flex-col h-full justify-center space-y-4">
            <h1 className="text-4xl mb-2">Enter your email</h1>
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

              <div>
                {forgotPassword.isError && (
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
                    <span>{forgotPassword.error.response.data.error}</span>
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-accent">
                {forgotPassword.isPending ? (
                  <span className="loading loading-spinner loading-lg"></span>
                ) : (
                  "Reset"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
