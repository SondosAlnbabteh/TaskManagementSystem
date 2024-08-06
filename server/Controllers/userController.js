const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
   res.status(200).json(req.body);
  const { email, password, name } = req.body;
  const user = await User.createUser(email, password, name);  
  res.status(201).json({ message: 'User created', user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id }, 'wesam123456789');
    res.json({ token ,userId: user.id});
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.view = async (req, res) => {
  
      res.status(200).json({ message: 'You can see data :)' });
    
  };

  exports.AddTask = async (req, res) =>{
   
    const { name, date, description} = req.body;
    const task = await User.createTask(  name, date, description);
    res.status(201).json({message: 'task created', task})
  }


  exports.DeleteTask = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await User.deleteTask(id);
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete task' });
    }
  };
  

 // Backend controller method
exports.Update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await User.updateTaske(id, req.body); // Pass req.body to updateTaske
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Update error:', error); // Log error details
    res.status(500).json({ message: 'Failed to update task' });
  }
};

  
  exports.selectTasks = async (req, res) =>{
    // const {userId} = req.body;
    try{
        const tasks = await User.findTasks();
        if(tasks.length === 0){
            return res.status(404).json({ message: 'No tasks found' });
        }
        res.status(200).json( tasks)

    }catch(error){
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
  }