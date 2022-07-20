import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = () => {
    const emailRef = useRef();
    const pwdRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const getEmailData = localStorage.getItem('emailData');
    const getPwdData = localStorage.getItem('pwdData');

    const navigate = useNavigate();

    useEffect(() => {
        (getEmailData&&getPwdData) ? 
        navigate("/") :
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email === 'abc@gmail.com' && pwd === 'password') {
            localStorage.setItem('emailData', email);
            localStorage.setItem('pwdData', pwd);
            navigate("/");
        } else {
            setEmail('');
            setPwd('');
            setErrMsg('Invalid Username/ Password!')
            errRef.current.focus();
        }
    }

    return (
        <div className="fullScreen">
            <section className="loginWrapper">
                <div className="loginForm">
                    <h1>Contact Manager</h1>
                    <p ref={errRef} className="errmsg">{errMsg}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            <label htmlFor='email'>Email</label>
                            <input type='email'
                            placeholder='Enter your email'
                            id="email"
                            autoComplete="off"
                            ref={emailRef}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required/>
                        </div>
                        <div className="inputContainer">
                            <label htmlFor='password'>Password</label>
                            <input type='password'
                            placeholder='Enter your password'
                            id="password"
                            ref={pwdRef}
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required />
                        </div>
                        <div className="signupContainer">
                            <p>Recover Password</p>
                            <p>Sign-Up</p>
                        </div>
                        <div className="submitButton">
                            <button className={`${email&&pwd ? '' : 'disabled'}`}>Login</button>
                        </div>
                    </form>
                    <p className='note'><small>Login Note: Email-abc@gmail.com; Password-password</small></p>
                </div>
            </section>
        </div>
    );
}

export default Login;
