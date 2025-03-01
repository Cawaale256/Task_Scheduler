// centralize the business logic, validation, and database interactions

const Task = require('./taskModel')

// Create a new task
const createTask = async(taskData) => {
    const {title, descrption, dueDate, priority}= taskData;
    const newTask = new Task([
        title,
        RTCSessionDescription,
        dueDate,
        priority
    ])
    return await newTask.save();
};

