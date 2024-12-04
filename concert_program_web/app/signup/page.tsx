"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebaseConfig';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app'; // Import FirebaseError type
import styles from '../../styles/SignUp.module.css';

const LoginOrSignUp = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isExistingUser, setIsExistingUser] = useState<boolean | null>(null); // Tracks if user exists
    const [showPasswordInput, setShowPasswordInput] = useState(false); // Show password only after email check

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
    
        try {
            const normalizedEmail = email.trim().toLowerCase();
            const signInMethods = await fetchSignInMethodsForEmail(auth, normalizedEmail);
            console.log("Sign-in methods for email:", signInMethods); // Debugging log
    
            if (signInMethods.includes("password")) {
                setIsExistingUser(true); // Email exists with password sign-in
            } else if (signInMethods.includes("google.com")) {
                setError("This email is registered with Google Sign-In. Please use that method.");
                setIsExistingUser(null); // Reset user flow
            } else {
                setIsExistingUser(false); // Email does not exist
            }
            setShowPasswordInput(true);
        } catch (err) {
            console.error("Error fetching sign-in methods:", err);
            if (err instanceof FirebaseError) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
    
        try {
            if (isExistingUser) {
                // Log in existing user
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                // Sign up new user
                await createUserWithEmailAndPassword(auth, email, password);
            }
            router.push('/'); // Redirect to home on success
        } catch (err) {
            if (err instanceof FirebaseError) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/'); // Redirect to home after Google sign-in
        } catch (err) {
            if (err instanceof FirebaseError) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>{isExistingUser === null ? "Log In / Sign Up" : isExistingUser ? "Log In" : "Sign Up"}</h2>
            <form onSubmit={showPasswordInput ? handlePasswordSubmit : handleEmailSubmit} className={styles.form}>
                <label>Email address</label>
                <input
                    type="email"
                    className={styles.inputField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    disabled={showPasswordInput}
                />
                
                {showPasswordInput && (
                    <>
                        <label>Password</label>
                        <input
                            type="password"
                            className={styles.inputField}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </>
                )}

                {error && <p className={styles.error}>{error}</p>}
                
                <button type="submit" className={styles.submitButton}>
                    {isExistingUser === null ? "Next" : isExistingUser ? "Log In" : "Sign Up"}
                </button>
            </form>

            <div className={styles.orContainer}>
                <span className={styles.orText}>Or</span>
            </div>
            
            <button onClick={handleGoogleSignIn} className={styles.googleButton}>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" />
                Continue with Google
            </button>
        </div>
    );
};

export default LoginOrSignUp;
