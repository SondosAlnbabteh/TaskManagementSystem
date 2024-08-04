// src/components/AddTask.js

import  { useState } from 'react';
import axios from 'axios';

const AddTask = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [idDlete, setIdDlete] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5002/addTask', {
                name,
                description,
                idDlete,
            });
            alert('add task successful');
        } catch (err) {
            setError('add task failed');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                {/* <div>
                    <label>date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div> */}
                <div>
                    <label>description:</label>
                    <textarea
                        
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddTask;
