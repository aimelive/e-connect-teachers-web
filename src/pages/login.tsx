import Logo from "../components/ui/logo";
import { useState } from "react";
import useGlobalCtx from "../providers/GlobalContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/config";

export default function Login() {
  const { setNotificationHandler } = useGlobalCtx();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    setLoading(false);
    if (loginData.email == "" || loginData.password == "") {
      setNotificationHandler({ message: "Invalid credentials", type: "error" });
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
    } catch (error: any) {
      setNotificationHandler({
        message: error.message || "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl min-h-screen flex flex-col  items-center justify-around px-4 py-16 sm:px-6 lg:px-8">
      <Logo />
      <div className="mx-auto mb-0 mt-8 w-[400px] space-y-4 bg-white border border-slate-200 p-6  rounded-lg">
        <div className="mx-auto max-w-lg ">
          <h1 className="text-2xl font-bold sm:text-3xl">Login</h1>

          <p className="mt-4 text-sm text-gray-500">
            Welcome back, login to continue
          </p>
        </div>

        <div>
          <label htmlFor="email" className="text-sm text-gray-500">
            Email
          </label>

          <div className="relative">
            <input
              autoComplete="off"
              type="email"
              className="w-full rounded-lg border-gray-200 mb-2 bg-gray-50 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter email"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value.trim() })
              }
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="text-sm text-gray-500">
            Password
          </label>

          <div className="relative">
            <input
              autoComplete="off"
              type="password"
              className="w-full rounded-lg border-gray-600  outline-none  p-4 mb-2 bg-gray-50  pe-12 text-sm shadow-sm autofill:none"
              placeholder="Enter password"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value.trim() })
              }
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleLogin}
            className="inline-block rounded-lg bg-brand px-5 py-3 text-sm font-medium w-full text-white"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
