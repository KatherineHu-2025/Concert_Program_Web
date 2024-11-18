"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import styles from '../styles/Dashboard.module.css';
import ConcertCard from './ConcertCard';

// Define the structure of an event
interface EventData {
    id: string;  // Document ID
    title: string;
    date: Timestamp | string;  // Accept both Timestamp and string for flexibility
    location: string;
}

const Dashboard = () => {
    const router = useRouter();
    const [upcomingEvents, setUpcomingEvents] = useState<EventData[]>([]);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);

    // Fetch events from Firestore when the component mounts
    useEffect(() => {
        const fetchEvents = async () => {
            const eventsCollection = collection(db, 'events');
            const eventSnapshot = await getDocs(eventsCollection);
            const eventList = eventSnapshot.docs.map(doc => {
                const data = doc.data() as Omit<EventData, 'id'>;  // Exclude 'id' from data
                return {
                    id: doc.id,   // Use Firestore document ID as 'id'
                    ...data       // Spread the rest of the fields
                };
            });
            setUpcomingEvents(eventList);
        };
        
        fetchEvents();
    }, []);

    // Navigate to the add-event form page
    const openAddEventForm = () => {
        router.push('/add-event');
    };

    // Handle opening the delete confirmation form
    const openDeleteConfirm = (index: number) => {
        setSelectedEventIndex(index);
        setIsDeleteConfirmOpen(true);
    };

    // Handle confirming the deletion
    const confirmDelete = () => {
        if (selectedEventIndex !== null) {
            setUpcomingEvents(prevEvents => prevEvents.filter((_, i) => i !== selectedEventIndex));
        }
        closeDeleteConfirm();
    };

    const closeDeleteConfirm = () => {
        setIsDeleteConfirmOpen(false);
        setSelectedEventIndex(null);
    };

    return (
        <div className={styles.background}>
            <h1 className={styles.dashboard}>Dashboard</h1>
            <div className={styles.section}>
                <div className={styles.upcoming}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Upcoming</h2>
                        <button className={styles.addButton} onClick={openAddEventForm}>+</button>
                    </div>
                    
                    {/* Render each event card */}
                    {upcomingEvents.map((event, index) => {
                        // Check if date is a Timestamp or a string, and format accordingly
                        let date = "";
                        let time = "";
                        if (event.date instanceof Timestamp) {
                            const dateObj = event.date.toDate();
                            date = dateObj.toLocaleDateString();
                            time = dateObj.toLocaleTimeString();
                        } else if (typeof event.date === "string") {
                            const dateObj = new Date(event.date);
                            date = dateObj.toLocaleDateString();
                            time = dateObj.toLocaleTimeString();
                        }

                        return (
                            <ConcertCard
                                key={event.id}
                                title={event.title}
                                time={`${date} ${time}`}  // Pass formatted date and time
                                location={event.location}
                                onDelete={() => openDeleteConfirm(index)}
                            />
                        );
                    })}
                </div>

                <div className={styles.past}>
                    <h2 className={styles.sectionTitle}>Past</h2>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteConfirmOpen && (
                <div className={styles.modal}>
                    <div className={styles.confirmation}>
                        <p>Are you sure you want to delete this event?</p>
                        <button onClick={confirmDelete} className={styles.confirmButton}>Yes, delete</button>
                        <button onClick={closeDeleteConfirm} className={styles.cancelButton}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
