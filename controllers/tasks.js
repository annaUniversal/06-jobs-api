const getAllTasks = async (req, res) => {
    res.send('Get All Tasks')
}

const getTask = async (req, res) => {
    res.send('Get a Task')
}
const createTask = async (req, res) => {
    res.send('Create a Task')
}
const deleteTask = async (req, res) => {
    res.send('Delete the Task')
}
const updateTask = async (req, res) => {
    res.send('Update the Task')
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
}