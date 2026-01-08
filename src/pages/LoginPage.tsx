import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuthContext();
    const navigate = useNavigate();

    const handleLogin = async () => {

        const data = await login(email, password)

        if(!data.error){
            navigate("/")
            return
        }
        //TODO: UI
        alert(data.error)
    }

    return (
        <>
            <h1 className="flex items-center justify-center">LoginPage</h1>

            <form action="" className="flex flex-col space-y-3 items-center justify-center">
                <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="border" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="border" />
                <button onClick={() => handleLogin()} type="button" className="border">Login</button>
            </form>
        </>
    )
}

export default LoginPage