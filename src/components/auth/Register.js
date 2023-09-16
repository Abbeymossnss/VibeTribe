import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import "./Auth.css"

export const Register = ({ setToken }) => {
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const username = useRef();
    const imgUrl = useRef();
    const bio = useRef();
    const password = useRef();
    const verifyPassword = useRef();
    const passwordDialog = useRef();
    const isStaff = useRef();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "email": email.current.value,
                "bio": bio.current.value,
                "img_url": imgUrl.current.value,
                "is_staff": isStaff.current.checked,
                "password": password.current.value
            };

            registerUser(newUser)
                .then((res) => {
                    if ("valid" in res && res.valid) {
                        setToken(res.token);
                        // Set the user object after successful registration
                        // setUser(newUser);
                    }
                    navigate("/login");
                })
                .catch((error) => {
                    console.error("Error registering user:", error);
                });
        } else {
            passwordDialog.current.showModal();
        }
    };

    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={(e) => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                {/* ... Your form fields ... */}
                <fieldset>
                    <label htmlFor="isStaff"> IMPORTANT: Are you a volunteer? </label>
                    <input ref={isStaff} type="checkbox" name="isStaff" id="isStaff" />
                </fieldset>
                <fieldset style={{ textAlign: "center" }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    );
};
