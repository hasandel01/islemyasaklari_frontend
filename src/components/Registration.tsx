import axios from "../api/Axios.tsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const USER_REGEX = /^[\p{L}\p{N}]{3,31}$/u;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const REGISTER_URL = "/api/v1/auth/register"

function Registration() {

    const navigate = useNavigate()


    const registrationSchema = Yup.object().shape( {
        firstName: Yup.string()
            .matches(USER_REGEX,'Invalid first name')
            .required('First name is required'),
        lastName: Yup.string()
            .matches(USER_REGEX, 'Invalid last name')
            .required('Last name is required'),
        email: Yup.string()
            .email('Invalid email').required('Email is required'),
        password: Yup.string()
            .matches(PWD_REGEX,'Invalid password')
            .required('Password is required')
    })

    const showSwalError = () => {
        Swal.fire( {
            icon: "info",
            title: "SERVER IS NOT RESPONDING!"

        })
    }

    const showRegistrationValidation = () => {

        Swal.fire(
            {
                icon: "success",
                title: "REGISTRATION IS SUCCESSFUL, GOING TO LOG IN PAGE"
            }
        )
    }

    const showUserAlreadyExists = () => {

        Swal.fire(
            {
                icon: "warning",
                title: "USER WITH GIVEN E-MAIL ALREADY EXISTS"
            }
        )
    }

    return (
        <Formik
                initialValues={ {firstName: '', lastName: '', email : '', password: ''}}
                validationSchema={registrationSchema}
                onSubmit={async values  => {

                    try {

                        const response = await axios.post(REGISTER_URL,
                            JSON.stringify({firstName: values.firstName,
                                                  lastName: values.lastName,
                                                  email: values.email,
                                                  password: values.password }),
                            {
                                headers: { 'Content-Type': 'application/json' },
                                withCredentials: false
                            }
                        );

                        if (response?.data?.token === "USER ALREADY EXISTS") {
                            showUserAlreadyExists();
                        } else {
                            showRegistrationValidation();
                            console.log(response?.data?.token);
                        }

                            navigate("/log-in", { replace: true })

                    }
                    catch (err) {
                        showSwalError()
                    }
                }}
            >
            <div>
            {/* Two input elements, one for the username with the id "my-input" and a placeholder "username". */}
            <Form className={"form-property"} >
                <Field
                    className={"input"}
                    name={"firstName"}
                    placeholder={"FIRST NAME"}/>
                <ErrorMessage name={"firstName"} component="label" className={"error-label"} />
                <Field
                    className={"input"}
                    name={"lastName"}
                    placeholder={"LAST NAME"}/>
                <ErrorMessage name={"lastName"} component="label" className={"error-label"} />
                <Field
                    className={"input"}
                    name={"email"}
                    type={"email"}
                    placeholder={"E-MAIL"}/>
                <ErrorMessage name={"email"} component="label" className={"error-label"} />
                <Field
                    className={"input"}
                    name={"password"}
                    type= {"password"}
                    placeholder={"PASSWORD"} />
                <ErrorMessage name={"password"} component="label" className={"error-label"} />
                <button className={"form-button"} type={"submit"}> CREATE AN ACCOUNT </button>
                <p className={"info"}>
                    Already have an account?
                    <span className={"line"}>
                    {/* ROUTER LINK */}
                        <a  href={"/log-in"} className={"sign-in"}> Sign IN! </a>
                </span>
                </p>
            </Form>
            </div>
        </Formik>
    )
}


export default Registration