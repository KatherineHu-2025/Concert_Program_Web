import React from 'react';
import styles from '../styles/ConcertCard.module.css';

interface ConcertCardProps {
    title: string;
    time: string;
    location: string;
    onDelete: () => void; // Delete function prop
}

const ConcertCard: React.FC<ConcertCardProps> = ({ title, time, location, onDelete }) => {
    return (
        <div className={styles.concertCard}>
            <div className={styles.cardHeader}>
                <h3 className={styles.title}>{title}</h3>
                <img src="/delete.svg" alt="Delete" className={styles.deleteIcon} onClick={onDelete} />
            </div>
            <div className={styles.details}>
                <div className={styles.infoRow}>
                    <img src="/calendar.svg" alt="Calendar" className={styles.icon} />
                    <span className={styles.text}>{time}</span>
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
