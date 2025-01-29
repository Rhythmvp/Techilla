const express = require("express");
const path = require("path");
const axios = require("axios"); // Import axios for HTTP requests
const app = express();
const hbs = require("hbs");
const LogInCollection = require("./mongo");
const port = process.env.PORT || 3000;

const LLM_BASE_URL = "http://172.28.40.162:1234";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const tempelatePath = path.join(__dirname, "../tempelates");
const publicPath = path.join(__dirname, "../public");
console.log(publicPath);

app.set("view engine", "hbs");
app.set("views", tempelatePath);

app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.render("login");
});
app.get("/home", (req, res) => {
    res.render("home");
});
app.get("/signup", (req, res) => {
    res.render("signup");
});

// Proxy Route to Forward Requests to LLM API
app.post("/proxy", async (req, res) => {
    try {
        const response = await axios.post(`${LLM_BASE_URL}${req.body.endpoint}`, req.body.data, {
            headers: { "Content-Type": "application/json" }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error forwarding request:", error);
        res.status(500).json({ error: "Failed to fetch data from LLM service" });
    }
});

// Signup Route
app.post("/signup", async (req, res) => {
    console.log("Received data:", req.body);
    try {
        const existingUser = await LogInCollection.findOne({ name: req.body.name });
        if (existingUser) {
            return res.send("User details already exist");
        }
        const data = new LogInCollection({
            name: req.body.name,
            password: req.body.password
        });
        await data.save();
        res.status(201).render("home", { naming: req.body.name });
    } catch (e) {
        console.log("Error during signup:", e);
        res.status(500).send("An error occurred during signup");
    }
});

// Login Route
app.post("/login", async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });
        if (!check) {
            return res.send("Incorrect details");
        }
        if (check.password !== req.body.password) {
            return res.send("Incorrect password");
        }
        res.status(201).render("home", { naming: `${req.body.name}` });
    } catch (e) {
        res.status(500).send("An error occurred during login");
    }
});

app.listen(port, () => {
    console.log("Port connected");
});
