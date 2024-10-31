"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '../styles/Dashboard.module.css';
import ConcertCard from './ConcertCard';

// Define the structure of an event
interface EventData {
    title: string;
    time: string;
    location: string;
}

const Dashboard = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [upcomingEvents, setUpcomingEvents] = useState<EventData[]>([]);
    const [formData, setFormData] = useState<EventData>({ title: '', time: '', location: '' });
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setUpcomingEvents([...upcomingEvents, formData]);
        setFormData({ title: '', time: '', location: '' }); // Reset form
        closeForm();
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
                        <button className={styles.addButton} onClick={openForm}>+</button>
                    </div>
                    
                    {/* Render each event card */}
                    {upcomingEvents.map((event, index) => (
                        <ConcertCard
                            key={index}
                            title={event.title}
                            time={event.time}
                            location={event.location}
                            onDelete={() => openDeleteConfirm(index)}
                        />
                    ))}
                </div>

                <div className={styles.past}>
                    <h2 className={styles.sectionTitle}>Past</h2>
                </div>
            </div>

            {/* Modal Form for Adding Event */}
            {isFormOpen && (
                <div className={styles.modal}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <label>
                            Title:
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Time:
                            <input
                                type="text"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Location:
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <button type="submit" className={styles.submitButton}>Add Event</button>
                        <button type="button" onClick={closeForm} className={styles.cancelButton}>Cancel</button>
                    </form>
                </div>
            )}

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
