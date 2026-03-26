import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";
import { useNotification } from "../../context/NotificationProvider";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleError = (error: string) => {
    if (error === "500") return "Network error";
    if (error === "401") return "Wrong e-mail or password";
    return "";
  };

  const handleLogin = async () => {
    const data = await login(email, password);

    if (!data.error) {
      navigate("/");
      return;
    }
    addNotification(handleError(data.error), "error");
  };

  return (
    <>
      <div className="justify-centre flex flex-1 flex-col items-center p-4">
        <section className="mx-auto w-full max-w-md space-y-10 rounded-4xl border bg-white p-10 shadow-xl">
          <div className="relative z-0">
            <input
              autoComplete="off"
              type="text"
              id="email"
              className="focus:border-primary-green-400 text-heading border-default-medium focus:border-brand peer block w-full appearance-none border-0 border-b bg-transparent px-0 py-2.5 text-sm focus:border-b-2 focus:ring-0 focus:outline-none"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="firstName"
              className="text-body peer-focus:text-fg-brand absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              E-mail
            </label>
          </div>
          <div className="relative z-0">
            <input
              autoComplete="off"
              type="password"
              id="password"
              className="focus:border-primary-green-400 text-heading border-default-medium focus:border-brand peer block w-full appearance-none border-0 border-b bg-transparent px-0 py-2.5 text-sm focus:border-b-2 focus:ring-0 focus:outline-none"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="firstName"
              className="text-body peer-focus:text-fg-brand absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              Password
            </label>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleLogin}
              className="bg-primary-green-400 hover:bg-primary-green-500 active:bg-primary-green-600 flex items-center justify-center rounded-full px-8 py-1.5 font-medium tracking-tight text-white transition duration-350"
            >
              Login
            </button>
          </div>
        </section>
      </div>
    </>
  );
};
export default LoginForm;
