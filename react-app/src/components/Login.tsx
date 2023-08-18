import {Form, Formik, Field} from "formik";
import axios from "../api/Axios.tsx";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth.tsx";
import useAuthStore from "../hooks/useAuthStore.tsx";

const LOG_IN_URL = "/api/v1/auth/authenticate"

const Login = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();

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

                    const email = values.email
                    const password = values.password
                    const accessToken = response?.data?.accessToken
                    setAuth({email, password, accessToken})
                    if(accessToken != null)
                        showSuccessfulLogIn()
                    navigate("/", { replace: true });
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