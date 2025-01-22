//  Purpose: Defines the schema and model for tasks.
// Contents: Use Mongoose to define the structure of a task
//  (e.g., title, description, due date, priority, etc.) and export the task model

const mongoose = require('mongoose');
const { schema } = require('../auth/userModel');

const taskSchema = new mongoose.Schema ({
    title:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    dueDate:{
        type: Date,
        required: true

    },
    priority:{
        type: String,
        enum:['Low', 'Medium', 'High'],
        required: true
    }
});

// Create the model for tasks
 const Task = mongoose.model(Task,taskSchema);
// Export Task model
module.exports = Task; 

