const express = require("express");
const UserModel = require("../src/models/user.model");

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "src/views");

// Middleware para log de requisições
app.use((req, res, next) => {
    console.log(`Request Type: ${req.method}`);
    console.log(`Content Type: ${req.headers["content-type"]}`);
    console.log(`Date: ${new Date()}`);

    next();
});

// Rota raiz que redireciona para /views/users
app.get("/", (req, res) => {
    res.redirect("/views/users");
});

// Rota para renderizar a página de usuários
app.get("/views/users", async (req, res) => {
    const users = await UserModel.find({});

    res.render("index", { users });
});

// Rota para listar todos os usuários em formato JSON
app.get("/users", async (req, res) => {
    try {
      const users = await UserModel.find({});

      res.status(200).json(users);
    } catch (error) {
      return res.status(500).send(error.message);
    }
});

// Rota para obter um usuário específico por ID
app.get("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const user = await UserModel.findById(id);

        return res.status(200).json(user);
    } catch {
        return res.status(500).send(error.message);
    }
});

// Rota para criar um novo usuário
app.post("/users", async (req, res) => {
    try {
      const user = await UserModel.create(req.body);

      res.status(201).json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
});

// Rota para atualizar um usuário por ID
app.patch("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Rota para deletar um usuário por ID
app.delete("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const user = await UserModel.findByIdAndDelete(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const port = 8080;

app.listen(port, () => console.log(`Rodando com Express na porta ${port}!`));

