const express = require("express");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

// Create server
const app = express();
app.use(bodyParser.json());

// Create database instance and start server
const adapter = new FileAsync("db.json");
low(adapter)
  .then(db => {
    /**
     * Get a user by email
     * /GET: /users/:email
     */
    app.get("/users/:email", (req, res) => {
      const user = db
        .get("users")
        .find({ email: req.params.email })
        .value();

      res.send(user);
    });

    /**
     * Get all the users
     * /GET: /users
     */
    app.get("/users", (req, res) => {
      const users = db.get("users").value();
      res.send(users);
    });

    /**
     * Create a user in the database
     * /POST: /users
     */
    app.post("/users", (req, res) => {
      db.get("users")
        .push(req.body)
        .then(user => res.send(user));
    });

    /**
     * Get a roadmap by id
     * /GET: /roadmaps/:id
     */
    app.get("/roadmaps/:id", (req, res) => {
      const roadmap = db
        .get("roadmaps")
        .find({ id: req.params.id })
        .value();

      res.send(roadmap);
    });

    /**
     * Get a roadmap by the user id
     * This route looks contrived, but we can't have the same routes in an
     * express application. The router would not know if we were retrieving
     * a roadmap by it's id or by the userid if the route were:
     *            /roadmaps/:userid
     *
     * /GET: /user/:userid/roadmaps
     */
    app.get("/user/:userid/roadmaps", (req, res) => {
      const roadmaps = db
        .get("roadmaps")
        .find({ userid: req.params.userid })
        .value();

      res.send(roadmaps);
    });

    /**
     * Get all the roadmaps
     * /GET: /roadmaps
     */
    app.get("/roadmaps", (req, res) => {
      const roadmaps = db.get("roadmaps").value();
      res.send(roadmaps);
    });

    /**
     * Create a new roadmap in the database
     * /POST: /roadmaps
     */
    app.post("/roadmaps", (req, res) => {
      db.get("roadmaps")
        .push(req.body)
        .then(roadmap => res.send(roadmap));
    });

    /**
     * Update the roadmap in the database
     * /PUT: /roadmaps
     */
    app.post("/roadmaps", (req, res) => {
      db.get("roadmaps")
        .find({ id: req.body.id })
        .assign({ ...req.body })
        .then(roadmap => res.send(roadmap));
    });

    // Set db default values
    return db.defaults({ users: [], roadmaps: [] }).write();
  })
  .then(() => {
    app.listen(1337, () => console.log("listening on port 1337"));
  });
