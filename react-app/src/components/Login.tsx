import {useRef, useEffect, useState, useContext} from "react";
import axios from "../api/Axios.tsx";
import AuthContext from "../context/AuthProvider.tsx";
import {useLocation, useNavigate} from "react-router-dom";

const LOGIN_URL = "api/v1/auth/authenticate"

function Login() {

    const { setAuth } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const userRef = useRef();
    const errRef = useRef();

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[errMsg, setErrMsg] = useState('')


    useEffect(() => {
        userRef.current
    }, []);


    useEffect(() => {
        setErrMsg(' ')
    }, [email,password]);

    const handleSubmit  = async (e) => {
        e.preventDefault()
        console.log(email,password)

            try {
                const response = await axios.post(LOGIN_URL,
                    JSON.stringify({ email ,password}),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: false
                    }
                );
                console.log(response.data)
                console.log(JSON.stringify(response))

                const accessToken = response?.data?.token;
                console.log(accessToken)
                setAuth({email, password, accessToken})
                navigate(from, { replace: true})
            }catch (err) {

                if(!err?.response) {
                    console.log('No server response')
                }
                else if ( err.response?.status == 409) {
                    console.log('UserName taken')
                }
            }
    }

    return (
        <div className={"log-in-property"}>
            {/* A paragraph element with a class name "errMsg" if errMsg is truthy, otherwise "offscreen". */}
            <p className={errMsg ? "errMsg" : "offscreen"} aria-live={"assertive"}>
                {errMsg}
            </p>

            {/* Two input elements, one for the username with the id "my-input" and a placeholder "username". */}
            <input className={"log-in-username"}
                   id={"my-input"}
                   placeholder={"E-MAIL"}
                   onChange={(e) => setEmail(e.target.value)}
                   value={email}
            />
            <input className={"log-in-password"}
                   type={"password"}
                   id={"my-input"}
                   placeholder={"PASSWORD"}
                   onChange={ (e) => setPassword(e.target.value)}
                   value={password}
            />
            <button onClick={handleSubmit}>  LOG IN</button>
            <p className={"par"}>
                Don't have account?
                <span className={"line"}>
                    {/* ROUTER LINK */}
                    <a  href={"/registration"} className={"sign-up"}> Sign UP! </a>
                </span>
            </p>
        </div>
    )
}


export default Login;