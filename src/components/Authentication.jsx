import { useState } from "react";
import { useAuth } from "../context/AuthContext";


export default function Authentication({handleCloseModal}) {
    // determine if the user is signing up or logging in
    const [isRegistration, setIsRegistration] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authenticating, setAuthenticating] = useState(false);

    const {signup, login } = useAuth();

    async function handleAuthenticate() {
        // validate the email and password
        if (!email || !email.includes('@') || !password ||  password.length < 6 || authenticating) {
            return;
        }
        
        try {
            setAuthenticating(true);
            if (isRegistration) {
                // register a user
                await signup(email, password);
            } else {
                // login a user
                await login(email, password);
            }
            handleCloseModal();
        } catch (err) {
            console.log(err.message);
        } finally {
            setAuthenticating(false);
        }

    }

    return (
        <>
            <h2 className="sign-up-text">{isRegistration ? 'Sign Up' :  'Login' } </h2>
            <p>{isRegistration ? 'Create an account!' : 'Login to your account!' }  </p>
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="Email" />
            <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" />
            <button onClick={handleAuthenticate}><p>{authenticating ? 'Authenticating...' : 'Submit'}</p></button>
            <hr />
            <div className="register-content">
                <p>{isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                <button onClick={() => { setIsRegistration(!isRegistration) }}><p>{isRegistration ? 'log in' : 'Sign up'}</p></button>
            </div>
        </>
    )
}
