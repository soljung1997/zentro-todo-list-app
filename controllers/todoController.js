import Todo from '../models/todoModel.js';

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      createdBy: req.user.id, // Set from JWT
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create todo' });
  }
};

// Get all todos for the logged-in user
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ createdBy: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve todos' });
  }
};

// Update a todo by ID
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update todo' });
  }
};

// Delete a todo by ID
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete todo' });
  }
};
