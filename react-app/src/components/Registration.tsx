import {useRef, useState, useEffect} from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import axios from "../api/Axios.tsx";

const USER_REGEX = /^[\p{L}][\p{L}\p{N}_-]{2,30}$/u;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REGISTER_URL = "/api/v1/auth/register"
function Registration() {

    const userRef = useRef()
    const errRef =  useRef()

    const [firstName, setFirstName] = useState('')
    const [validFirstName, setValidFirstName] = useState(false)
    const [firstNameFocus , setFirstNameFocus ] = useState(false)

    const [lastName, setLastName] = useState('')
    const [validLastName, setValidLastName] = useState(false)
    const [lastNameFocus , setlastNameFocus ] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus , setEmailFocus ] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus , setPasswordFocus ] = useState(false)


    const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
    const [lastNameErrMsg, setLastNameErrMsg] = useState('');
    const [emailErrMsg, setEmailErrMsg] = useState('');
    const [passwordErrMsg, setPasswordErrMsg] = useState('');
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        const result = USER_REGEX.test(firstName)
        console.log(result)
        console.log(firstName)
        setValidFirstName(result)
    }, [firstName]);
    useEffect(() => {
        const result = USER_REGEX.test(lastName)
        console.log(result)
        console.log(lastName)
        setValidLastName(result)
    }, [lastName]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        console.log(result)
        console.log(email)
        setValidEmail(result)
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(password)
        console.log(result)
        console.log(password)
        setValidPassword(result)
    }, [password]);

    const handleSubmit = async (e) => {

        // Check each input individually and set specific error messages
        if (!validFirstName) {
            setFirstNameErrMsg("First name is not valid. Try more then three characters.");
        } else {
            setFirstNameErrMsg('');
        }

        if (!validLastName) {
            setLastNameErrMsg("Last name is not valid. Try more then three characters.");
        } else {
            setLastNameErrMsg('');
        }

        if (!validEmail) {
            setEmailErrMsg("E mail is not valid.");
        } else {
            setEmailErrMsg('');
        }

        if (!validPassword) {
            setPasswordErrMsg("Password is not valid.");
        } else {
            setPasswordErrMsg('');
        }
                e.preventDefault()


            try {
                const response = await axios.post(REGISTER_URL,
                    JSON.stringify({ firstName, lastName, email, password }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: false
                    }
                );
                console.log(response.data)
                console.log(JSON.stringify(response))
                setSuccess(true)
            }
            catch (err) {

                if(!err?.response) {
                    console.log('No server response')
                }
                else if ( err.response?.status == 409) {
                    console.log('UserName taken')
                }
            }

    }

    useEffect( () => {
        setFirstNameErrMsg('')
        setLastNameErrMsg('')
        setEmailErrMsg('')
        setPasswordErrMsg('')
    },[firstName,lastName,email,password])

    return <section>
        <div className={"registration-property"}>

            {/* Two input elements, one for the username with the id "my-input" and a placeholder "username". */}
            <input className={"first-name-input"}
                   id={"my-input"}
                   placeholder={"FIRST NAME"}
                   onChange={(e) => setFirstName(e.target.value)}
                   value={firstName}
            />
            <p className={firstNameErrMsg ? "first-name-errMsg" : "offscreen"}
               aria-live={"assertive"}>
                {firstNameErrMsg}
            </p>
            <input className={"last-name-input"}
                   id={"my-input"}
                   placeholder={"LAST NAME"}
                   onChange={(e) => setLastName(e.target.value)}
                   value={lastName}
            />
            <p className={lastNameErrMsg ? "last-name-errMsg" : "offscreen"}
               aria-live={"assertive"}>
                {lastNameErrMsg}
            </p>
            <input className={"email-input"}
                   id={"my-input"}
                   placeholder={"EMAIL"}
                   onChange={(e) => setEmail(e.target.value)}
                   value={email}
            />
            <p className={emailErrMsg ? "email-errMsg" : "offscreen"}
               aria-live={"assertive"}>
                {emailErrMsg}
            </p>
            <input className={"password-input"}
                   id={"my-input"}
                   type={"password"}
                   placeholder={"PASSWORD"}
                   onChange={ (e) => setPassword(e.target.value)}
                   value={password}
            />
            <p className={passwordErrMsg ? "pwd-errMsg" : "offscreen"}
               aria-live={"assertive"}>
                {passwordErrMsg}
            </p>
            <button onClick={handleSubmit}> CREATE AN ACCOUNT </button>
            <p className={"par"}>
                Already have an account?
                <span className={"line"}>
                    {/* ROUTER LINK */}
                    <a  href={"/log-in"} className={"sign-in"}> Sign IN! </a>
                </span>
            </p>

        </div>


    </section>
}


export default Registration