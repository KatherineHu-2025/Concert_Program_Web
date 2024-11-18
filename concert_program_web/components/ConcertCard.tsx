import React from 'react';
import styles from '../styles/ConcertCard.module.css';
import { Timestamp } from 'firebase/firestore';

interface ConcertCardProps {
    title: string;
    time: Timestamp | string;  // Accept both Timestamp and string
    location: string;
    onDelete: () => void;
}

const ConcertCard: React.FC<ConcertCardProps> = ({ title, time, location, onDelete }) => {
    // Convert `time` to Date based on its type
    let date: string;
    let formattedTime: string;

    if (time instanceof Timestamp) {
        // If `time` is a Firestore Timestamp
        date = time.toDate().toLocaleDateString();
        formattedTime = time.toDate().toLocaleTimeString();
    } else {
        // If `time` is a string, create a Date object
        const dateObj = new Date(time);
        date = dateObj.toLocaleDateString();
        formattedTime = dateObj.toLocaleTimeString();
    }

    return (
        <div className={styles.concertCard}>
            <div className={styles.cardHeader}>
                <h3 className={styles.title}>{title}</h3>
                <img src="/delete.svg" alt="Delete" className={styles.deleteIcon} onClick={onDelete} />
            </div>
            <div className={styles.details}>
                <div className={styles.infoRow}>
                    <img src="/calendar.svg" alt="Calendar" className={styles.icon} />
                    <span className={styles.text}>{date} {formattedTime}</span>
                </div>
                <div className={styles.infoRow}>
                    <img src="/location.svg" alt="Location" className={styles.icon} />
                    <span className={styles.text}>{location}</span>
                </div>
            </div>
            <button className={styles.updateButton}>UPDATES</button>
        </div>
    );
};

export default ConcertCard;
