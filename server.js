import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const API_URL = "http://localhost:4000";
const API_KEY_WEATHER = ""


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const locationQuery = req.query.location || "Prague";
  try {
      const response = await axios.get(`${API_URL}/tasks`);
      const response_1 = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY_WEATHER}&q=${locationQuery}`);
      console.log(response.data);  
      res.render("index.ejs", { 
        tasks: response.data,
        location: response_1.data.location.name,
        country: response_1.data.location.country,
        temp: response_1.data.current.temp_c,
        wind: response_1.data.current.wind_kph,
      }); 
  } catch (error) {
      console.error(error); 
      res.status(500).json({ message: "Error fetching tasks" });
  }
});

app.get("/new", (req, res) => {
    res.render("modify.ejs", { heading: "New Task", submit: "Create Task" });
});

app.get("/edit/:id", async (req, res) => {
    try {
      const response = await axios.get(`${API_URL}/tasks/${req.params.id}`);
      res.render("modify.ejs", {
        heading: "Edit Task",
        submit: "Update Task",
        task: response.data,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching post" });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, req.body);
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
});

app.post("/api/tasks/:id", async (req, res) => {
  try {
      const response = await axios.patch(`${API_URL}/tasks/${req.params.id}`, req.body);
      console.log(response.data);
      res.redirect("/");
  } catch (error) {
      res.status(500).json({ message: "Error updating task" });
  }
});

app.get("/api/tasks/delete/:id", async (req, res) => {
    try {
      await axios.delete(`${API_URL}/tasks/${req.params.id}`);
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ message: "Error deleting post" });
    }
  });

app.listen(3000, () => {
    console.log("Server running on port 3000!");
});