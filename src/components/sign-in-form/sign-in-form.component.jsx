import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (ex) {
            if (ex.code == 'auth/wrong-password' || ex.code == 'auth/user-not-found') {
                alert ('Email or password are incorrect!');
            } else {
                console.error('Error on user authentication.', ex);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value});
    };

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <label>Sign in with your email and password</label>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}/>

                <FormInput
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}/>

                <div className="buttons-container">
                    <Button type="submit">SIGN IN</Button>
                    <Button type="button" onClick={signInWithGoogle} buttonType={'google'}>GOOGLE SIGN IN</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;