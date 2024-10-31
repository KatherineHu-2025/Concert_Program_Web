"use client";
import { FunctionComponent, useCallback, useState } from 'react';
import styles from '../styles/NavBar.module.css';

const NavBar: FunctionComponent = () => {
    const [active, setActive] = useState<'dashboard' | 'database'>('dashboard'); // Set default active button

    const handleDashboardClick = useCallback(() => {
        setActive('dashboard');
    }, []);

    const handleDatabaseClick = useCallback(() => {
        setActive('database');
    }, []);
    
    return (
        <div className={styles.navbar}>
            <div className={styles.interactiveConcertProgramContainer}>
                <p className={styles.interactive}>Interactive</p>
                <p className={styles.interactive}>Concert</p>
                <p className={styles.interactive}>Program</p>
            </div>
            
            <div className={styles.databaseParent}>
                {/* Dashboard Button */}
                <div
                    className={`${styles.dashboard} ${active === 'dashboard' ? styles.activeButton : ''}`}
                    onClick={handleDashboardClick}
                >
                    <img
                        className={styles.icon}
                        alt=""
                        src={active === 'dashboard' ? '/home_active.svg' : '/home.svg'} // Change icon based on active state
                    />
                    <b className={styles.dashboardText}>Dashboard</b>
                </div>
                
                {/* Database Button */}
                <div
                    className={`${styles.database} ${active === 'database' ? styles.activeButton : ''}`}
                    onClick={handleDatabaseClick}
                >
                    <img
                        className={styles.server02Icon}
                        alt=""
                        src={active === 'database' ? '/database_active.svg' : '/database.svg'} // Change icon based on active state
                    />
                    <b className={styles.databaseText}>Database</b>
                </div>
                
                {/* Active Bar */}
                <div
                    className={styles.activeBar}
                    style={{ transform: active === 'dashboard' ? 'translateY(0)' : 'translateY(60px)' }}
                />
            </div>
            
            <div className={styles.account} onClick={handleDatabaseClick}>
                <div className={styles.avatar} />
                <div className={styles.signUp}>Sign Up</div>
            </div>
        </div>
    );
};

export default NavBar;
