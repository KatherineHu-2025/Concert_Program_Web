"use client";

import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import styles from '../../styles/AddEvent.module.css';
import { collection, addDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

const AddEventForm = () => {
    const [programs, setPrograms] = useState([{ composer: '', piece: '', notes: '' }]);
    const [performers, setPerformer] = useState([{ name: '', role: ''}]);
    const [heading, setHeading] = useState("Input your title here...");
    const [isEditingHeading, setIsEditingHeading] = useState(false);
    const [isPerformanceGroup, setIsPerformanceGroup] = useState(false);
    const [performanceGroupName, setPerformanceGroupName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [location, setLocation] = useState('');
    const [concertType, setConcertType] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const eventData = {
            title: heading,
            date: Timestamp.fromDate(new Date(eventDate)), 
            location,
            concertType,
            programs,
            performers,
            performanceGroup: isPerformanceGroup ? performanceGroupName : null,
        };
    
        try {
            const docRef = await addDoc(collection(db, 'events'), eventData);
            console.log("Document written with ID: ", docRef.id);
            alert("Event successfully added!");
    
            // Reset form fields after successful submission
            setHeading("Input your title here...");
            setEventDate('');
            setLocation('');
            setConcertType('');
            setPrograms([{ composer: '', piece: '', notes: '' }]);
            setPerformer([{ name: '', role: '' }]);
            setIsPerformanceGroup(false);
            setPerformanceGroupName('');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Failed to add event. Please try again.");
        }
    };

    const handleCheckboxChange = () => {
        setIsPerformanceGroup(!isPerformanceGroup);
    };

    // Function to handle adding a new program piece
    const handleAddProgram = () => {
        setPrograms([...programs, { composer: '', piece: '', notes: '' }]);
    };

    const handleAddPerformer = () => {
        setPerformer([...performers, { name:'', role: '' }])
    }

    const handlePerformerChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newPerformers = [...performers];
        newPerformers[index] = {...newPerformers[index], [name]: value};
        setPerformer(newPerformers);
    }

    // Function to handle input changes for the program pieces
    const handleProgramChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newPrograms = [...programs];
        newPrograms[index] = { ...newPrograms[index], [name]: value };
        setPrograms(newPrograms);
    };

    const toggleEditHeading = () => {
        setIsEditingHeading(!isEditingHeading);
    };

    // Function to handle heading change
    const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeading(e.target.value);
    };

    // Function to save heading on blur or Enter key
    const handleHeadingBlurOrEnter = (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
        if (e.type === 'blur' || (e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Enter')) {
            setIsEditingHeading(false);
        }
    };
    

    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.formContent}>
                <button onClick={() => window.history.back()} className={styles.backButton}>← Back</button>
                {/* Editable heading */}
                {isEditingHeading ? (
                    <input
                        type="text"
                        value={heading}
                        onChange={handleHeadingChange}
                        onBlur={handleHeadingBlurOrEnter}
                        onKeyDown={handleHeadingBlurOrEnter}
                        autoFocus
                        className={styles.editableHeadingInput}
                    />
                ) : (
                    <h2 className={styles.heading} onClick={toggleEditHeading}>{heading}</h2>
                )}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>Time *</label>
                    <input
                        type="datetime-local"
                        name="time"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />

                    <label>Location *</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />

                    <label>Concert Type *</label>
                    <select
                        name="concertType"
                        value={concertType}
                        onChange={(e) => setConcertType(e.target.value)}
                        required
                    >
                        <option value="">Select item</option>
                        <option value="Recital">Recital</option>
                        <option value="Symphony">Symphony</option>
                        <option value="Chamber">Chamber</option>
                    </select>

                    <label>Performer(s) *</label>
                    <div className={styles.checkboxGroup}>
                        <input
                            type="checkbox"
                            name="performerGroup"
                            onChange={handleCheckboxChange}
                        />
                        <label>Performance Group</label>
                    </div>

                    {/* Conditionally render the Performance Group input field */}
                    {isPerformanceGroup && (
                        <input
                        type="text"
                        name="performanceGroupName"
                        placeholder="Performance Group Name"
                        value={performanceGroupName}
                        onChange={(e) => setPerformanceGroupName(e.target.value)}
                        className={styles.performanceGroupInput}
                        />
                    )}

                    <label>Individual Performer</label>
                    {performers.map((performer, index) => (
                        <div key = {index} className={styles.additionalPerformer}>
                            <input
                                type = "text"
                                name = "name"
                                placeholder={`Name ${index + 1}`}
                                value={performer.name}
                                onChange={(e) => handlePerformerChange(index, e)}
                            />
                            <input
                                type = "text"
                                name = "role"
                                placeholder={`Role ${index + 1}`}
                                value={performer.role}
                                onChange={(e) => handlePerformerChange(index, e)}
                            />
                        </div>
                    ))}
                    <button type="button" className={styles.addButton} onClick={handleAddPerformer}>Add Performer</button>

                    {/* <div className={styles.additionalPerformer}>
                        <input type="text" name="additionalPerformerName" placeholder="Name" />
                        <input type="text" name="additionalPerformerRole" placeholder="Role" />
                    </div> */}

                    <label>Program</label>
                    {programs.map((program, index) => (
                        <div key={index} className={styles.program}>
                            <input
                                type="text"
                                name="composer"
                                placeholder={`Composer ${index + 1}`}
                                value={program.composer}
                                onChange={(e) => handleProgramChange(index, e)}
                            />
                            <input
                                type="text"
                                name="piece"
                                placeholder={`Piece ${index + 1}`}
                                value={program.piece}
                                onChange={(e) => handleProgramChange(index, e)}
                            />
                            <textarea
                                name="notes"
                                placeholder={`Program Notes ${index + 1}`}
                                value={program.notes}
                                onChange={(e) => handleProgramChange(index, e)}
                            />
                        </div>
                    ))}
                    <button type="button" className={styles.addButton} onClick={handleAddProgram}>Add Piece</button>

                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddEventForm;
