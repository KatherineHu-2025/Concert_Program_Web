"use client";

import { FunctionComponent, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebaseConfig';  // Import auth from firebaseConfig
import { User, signOut } from 'firebase/auth';
import styles from '../styles/NavBar.module.css';

const NavBar: FunctionComponent = () => {
    const [active, setActive] = useState<'dashboard' | 'database'>('dashboard');
    const [user, setUser] = useState<User | null>(null); // Type user as User | null
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser); // currentUser is of type User | null
        });
        return () => unsubscribe();
    }, []);

    const handleDashboardClick = useCallback(() => {
        setActive('dashboard');
    }, []);

    const handleDatabaseClick = useCallback(() => {
        setActive('database');
    }, []);

    const handleSignUpOrAvatarClick = () => {
        if (user) {
            // Optional: handle sign-out or navigate to profile page
            signOut(auth).then(() => {
                setUser(null);
                router.push('/');
            });
        } else {
            // Navigate to the signup page if the user is not logged in
            router.push('/signup');
        }
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.interactiveConcertProgramContainer}>
                <p className={styles.interactive}>Interactive</p>
                <p className={styles.interactive}>Concert</p>
                <p className={styles.interactive}>Program</p>
            </div>
            
            <div className={styles.databaseParent}>
                <div
                    className={`${styles.dashboard} ${active === 'dashboard' ? styles.activeButton : ''}`}
                    onClick={handleDashboardClick}
                >
                    <img
                        className={styles.icon}
                        alt=""
                        src={active === 'dashboard' ? '/home_active.svg' : '/home.svg'}
                    />
                    <b className={styles.dashboardText}>Dashboard</b>
                </div>
                
                <div
                    className={`${styles.database} ${active === 'database' ? styles.activeButton : ''}`}
                    onClick={handleDatabaseClick}
                >
                    <img
                        className={styles.server02Icon}
                        alt=""
                        src={active === 'database' ? '/database_active.svg' : '/database.svg'}
                    />
                    <b className={styles.databaseText}>Database</b>
                </div>
                
                <div
                    className={styles.activeBar}
                    style={{ transform: active === 'dashboard' ? 'translateY(0)' : 'translateY(60px)' }}
                />
            </div>
            
            <div className={styles.account} onClick={handleSignUpOrAvatarClick}>
                {user ? (
                    <>
                        <img src={user.photoURL || '/default-avatar.png'} alt="User Avatar" className={styles.avatar} />
                        <span className={styles.userName}>{user.displayName || "User"}</span>
                    </>
                ) : (
                    <div className={styles.signUp}>Sign Up</div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
