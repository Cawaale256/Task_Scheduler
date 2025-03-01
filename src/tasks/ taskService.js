// centralize the business logic, validation, and database interactions

const Task = require('./taskModel')

// Create a new task
const createTask = async(taskData) => {
    const {title, description, dueDate, priority}= taskData;
    const newTask = new Task([
        title,
        description,
        dueDate,
        priority
    ])
    return await newTask.save();
};

// Read tasks based on criteria or get all tasks if no criteria

const readTask = async(criteria = {}) => {
    const {title, description, dueDate, priority} = criteria;
    let searchFilter = {};
    if(title) searchFilter.title = title;
    if(description) searchFilter.description = description;
    if(dueDate) searchFilter.dueDate = new Date(dueDate);
    if(priority) searchFilter.priority = priority;

    return await Task.find(searchFilter);
}

// Update an existing task by ID
const updateTask = async(id, updates)=>{
    const task = await Task.findById(id);
    if (!task) {
        throw new Error('Task not found');
    }
    Object.keys(updates).forEach((key) => {
        task[key] = updates[key];
    });
    return await task.save();
}

// Delete a task by ID
const deleteTask = async(id)=>{
    const task = await Task.findById(id);
    if (!task){
        throw new Error('Task not found');
    }
    return await Task.findByIdAndDelete(id);
};

module.exports = {
    createTask,
    readTasks,
    updateTask,
    deleteTask
};