import { useState } from "react";


export default function Authentication() {
    // determine if the user is signing up or logging in
    const [isRegistration, setIsRegistration] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authenticating, setAuthenticating] = useState(false);

    async function handleAuthenticate() {

    }

    return (
        <>
            <h2 className="sign-up-text">{isRegistration ? 'Sign Up' :  'Login' } </h2>
            <p>{isRegistration ? 'Sign up ' : 'Login to ' }  your account!</p>
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="Email" />
            <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" />
            <button onClick={handleAuthenticate}><p>Submit</p></button>
            <hr />
            <div className="register-content">
                <p>{isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                <button onClick={() => { setIsRegistration(!isRegistration) }}><p>{isRegistration ? 'log in' : 'Sign up'}</p></button>
            </div>
        </>
    )
}
