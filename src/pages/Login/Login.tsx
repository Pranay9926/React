import React, { useCallback, useEffect, useState } from "react";
import Input from "../components/CommonInput/Input";
import Button from "../components/CommonButton/Button";
import Logo from "../../assets/Logo1.png"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCookies } from 'react-cookie';
import Service from "../../Service/Service";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasDigit = /\d/;
    const hasSpecialChar = /[@$!%*?&]/;
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });

    const [errormsg, setErrormsg] = useState({
        emailError: "Email is required",
        passwordError: "",
    });

    const [error, setError] = useState<string[]>([]);
    const [show, setShow] = useState<boolean>(false)
    const [cookies, setCookie] = useCookies(['token']);
    const nav = useNavigate();

    // const [success, setSuccess] = useState<boolean>(false)


    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("this is name", e.target.name, e.target.value, error);
        if (error.includes(e.target.name)) {
            setError(error.filter((el) => el !== e.target.name))
        }

        setInputValue((inputValue) => {
            return {
                ...inputValue, [e.target.name]: e.target.value
            };
        })

    }, [error]);

    useEffect(() => {
        console.log("useEffect", inputValue);
        console.log("useEffect", errormsg);

    }, [errormsg])

    const CheckValidation = useCallback(() => {
        // console.log("hello",inputValue);
        let temp: string[] = [];

        if (inputValue.email === '') {
            temp.push("email")
            setErrormsg({ ...errormsg })

        }
        const isLengthValid = inputValue.password.length >= 6;
        if (inputValue.password === '') {
            temp.push("password")
            console.log("passwoord", inputValue.password);
            setErrormsg({ ...errormsg, passwordError: "Password is required" })
        }
        else if (inputValue.email.length > 0 && !isLengthValid) {
            temp.push("password")
            console.log("passwordk klsjdflkajs");
            setErrormsg({ ...errormsg, passwordError: "Password should be greater that 6" })
        }
        else if (inputValue.email.length > 0 && !hasUppercase.test(inputValue.password)) {
            temp.push("password")
            setErrormsg({ ...errormsg, passwordError: "Password requiring atleast one uppercase letter" })
        } else if (inputValue.email.length > 0 && !hasLowercase.test(inputValue.password)) {
            temp.push("password")
            setErrormsg({ ...errormsg, passwordError: "Password requiring atleast one lowercase letter" })
        } else if (inputValue.email.length > 0 && !hasDigit.test(inputValue.password)) {
            temp.push("password")
            setErrormsg({ ...errormsg, passwordError: "Password requiring atleast one digit letter" })
        } else if (inputValue.email.length > 0 && !hasSpecialChar.test(inputValue.password)) {
            temp.push("password")
            setErrormsg({ ...errormsg, passwordError: "Password requiring a special character" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (inputValue.email.length > 0 && !emailRegex.test(inputValue.email)) {
            temp.push("email")
            console.log("value for password", errormsg);

            setErrormsg({ ...errormsg, emailError: "Invalid Email " })

        }

        setError(temp)
        if (temp.length === 0)
            return true;
        else
            return false;

    }, [inputValue, errormsg])

    const HandleShow = () => {
        setShow(!show)
    }

    const OnSubmit = async () => {

        if (CheckValidation()) {
            console.log('this is your result :- ', inputValue);
            const respnse = await Service.post('login', inputValue);
            console.log('response from server : - ', respnse);

            if (respnse.status == 200) {
                setCookie("token", respnse.data.token, { path: '/' });
                console.log(respnse.data.token)
                nav('/dashboard');
            }

        }

    }

    return (

        <div className="h-[calc(100vh-80px)] flex justify-center items-center ">
            <div className=" p-4 lg:h-[70%] sm:w-[50%] flex justify-center flex-col items-center border-2 border-black ">
                <div className="">
                    <img src={Logo} className="mt-10 mb-6 p-2 " alt="" />
                    <h1 className="text-[30px] font-bold  text-center ">Login </h1>
                </div>
                <div className="mt-[30px]">
                    <Input type="text"
                        name='email'
                        label="Enter your Email*"
                        errormsg={errormsg && errormsg.emailError}
                        placeholder="Ex:- ***@gmail.com"
                        value={inputValue.email}
                        onChange={handleInputChange}
                        error={error}
                        className='w-full'

                    />
                </div>
                <div className="mt-[30px] relative">
                    <Input type={show ? "text" : "password"}
                        name='password'
                        label="Enter your password*"
                        errormsg={errormsg && errormsg.passwordError}
                        placeholder="Ex:- ******"
                        value={inputValue.password}
                        onChange={handleInputChange}
                        error={error}
                        className='w-full'

                    />
                    <span className=" absolute top-[36px] right-[15px] " onClick={HandleShow}>{show ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}</span>
                </div>
                <div>
                    <Button onClick={OnSubmit} title="Submit" className='border rounded-full mt-[30px] hover:bg-[gray] hover:text-white active:bg-[black] bg-gray-300 w-[300px]' />
                </div>
            </div>
        </div>

    )
}

export default Login;