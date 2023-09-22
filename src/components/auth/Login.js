import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager";
import "./Auth.css";

export const Login = ({ setIsStaff, setToken }) => {
    const username = useRef();
    const password = useRef();
    const invalidDialog = useRef();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const user = {
            username: username.current.value,
            password: password.current.value,
        };
        loginUser(user)
            .then((res) => {
                if ("valid" in res && res.valid && "token" in res) {
                    setToken(res.token);
                    setIsStaff(res.is_staff);
                    // Navigate to the events page
                    navigate("/events");
                } else {
                    invalidDialog.current.showModal();
                }
            });
    };

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>The Vibe Tribe</h1>
                    <h2>Sign-in: Let's Get The Party Started!</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username/ Email Address: </label>
                        <input ref={username} type="username" id="username" className="form-control" placeholder="Username address" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password: </label>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign: "center"
                    }}>
                        <button className="btn btn-1 btn-sep icon-send custom-button" type="submit">Let's Party</button>
                    </fieldset>
                </form>
                <section className="link--register">
                    <Link to="/register">Not in The Vibe Tribe yet?</Link>
                </section>
            </section>
        </main>
    );
};
