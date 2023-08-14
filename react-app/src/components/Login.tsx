import {Form, Formik, Field} from "formik";
import axios from "../api/Axios.tsx";
import {useContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthProvider.tsx";
import useTokenStore from "./UseTokenStore.tsx";
import Swal from "sweetalert2";

const LOG_IN_URL = "/api/v1/auth/authenticate"

const Login = () => {

    const {setAuth} = useContext(AuthContext)
    const setToken = useTokenStore(state => state.setToken);

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const showSuccessfulLogIn = () => {
        Swal.fire( {
            icon: "success",
            title: "SUCCESSFULLY LOGGED IN!"
        })

    }

    const showLogInFailed = () => {
        Swal.fire( {
            icon: "error",
            title: "Log in failed, check your credentials again."
        })
    }


    return (
        <Formik initialValues={{email : '', password : ''}} onSubmit={async values => {
                try {
                    const response = await axios.post(LOG_IN_URL,
                        JSON.stringify({email: values.email,password: values.password}),
                        {
                            headers : { 'Content-Type': 'application/json'},
                            withCredentials : false
                            }
                        );

                    const accessToken = response?.data?.token

                    if(accessToken != null)
                        showSuccessfulLogIn()

                    setToken(accessToken)
                    setAuth(values.email,values.password,accessToken)
                    navigate(from, { replace: true });
                }catch(error) {
                    showLogInFailed()
                }
            }
        }
        >
                <Form className={"form-property"}>
                    <Field
                        className={"input"}
                        type={"email"}
                        name={"email"}
                        placeholder={"E-MAIL"}
                    />
                    <Field
                        className={"input"}
                        type={"password"}
                        name={"password"}
                        placeholder={"PASSWORD"}
                    />
                    <button className={"form-button"} type={"submit"}> LOG IN</button>
                    <p className={"info"}>
                        Don't have any account?
                        <span className={"line"}>
                            {/* ROUTER LINK */}
                            <a href={"/registration"} className={"sign-up"}>
                                {" "}
                                Sign UP!{" "}
                            </a>
                        </span>
                    </p>
                </Form>
        </Formik>
    )
}


export default Login