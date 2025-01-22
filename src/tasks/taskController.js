// Purpose: Handles the logic for various task-related operations.
// Contents: Define functions to handle creating, reading, updating, and deleting tasks.
// These functions should interact with the task model.

const Task = require('./taskModel');

//Create task:
const createTask = async(taskData, res) => {
    
    try {
        const {title, description, dueDate, priority} = taskData;
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

// Reading
const readTask = async(taskData, res) =>{
    
    try{
        // If no specific criteria are provided, fetch all tasks
        if (!query){
            const tasks = awaits Task.find({});
            return res.status(200).json({ message: 'All tasks fetched successfully', tasks });
        } 
            // Extract criteria from the query
            const { title, description, dueDate, priority } = query;
            
            //  Build a search filter based on provided criteria
            let searchFilter = {};
            if (title) searchFilter.title = title;
            if (description) searchFilter.description = description;
            if (dueDate) searchFilter.dueDate = new Date(dueDate);
            if (priority) searchFilter.priority = priority;
            // Fetch tasks based on the search filter
        const tasks = await Task.find(searchFilter);
        res.status(200).json({ message: 'Tasks fetched successfully', tasks });
    } catch(error) {
        // Handle errors and send an appropriate response
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};

module.exports = {
    createTask
};

module.exports = {
    readTask
};