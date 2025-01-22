// Purpose: Handles the logic for various task-related operations.
// Contents: Define functions to handle creating, reading, updating, and deleting tasks.
// These functions should interact with the task model.

const Task = require('./taskModel');

//Create task:
const createTask = async(taskData, res) => {
    // Extract the necessary fields from taskData
    const {title, description, dueDate, priority} = taskData;
    try {
        // Extract the necessary fields from taskData
        const newTask = newTask ({
            title,
            description,
            dueDate,
            priority
        });
        // Save the task to the database
        await newTask.save();
        // Send a success response
        res.status(201).json({message: 'Task created successfully', task: newTask});
    }catch (error) {
        // Handle errors and send an appropriate response
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

module.exports = {
    createTask
};


