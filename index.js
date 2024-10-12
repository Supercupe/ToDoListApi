import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let tasks = [
   { id: 1,
    content:"Buy groceries"
}
];

let lastId = 1;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/tasks", (req, res)=>{
    console.log(tasks)
    res.json(tasks)
})

app.get("/tasks/:id", (req, res) => {
    const task = tasks.find((t)=> t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({message: "task not found"});
    res.json(task)
})

app.post("/tasks", (req, res) => {
    const newId = ++lastId;
    const task = {
        id: newId,
        content: req.body.content,
    };
    tasks.push(task);
    res.status(201).json(task);
});

app.patch("/tasks/:id", (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });
    
    if (req.body.content) task.content = req.body.content;
    
    res.json(task); 
});

app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Task not found" });
    lastId = lastId - 1;
    tasks.splice(index, 1);
    res.json({ message: "Task deleted" });
  });



app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });