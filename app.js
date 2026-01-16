import express from "express";
const app = express();
export default app;


app.get("/", (req, res) => {
  res.send("Hello employees!");
});

import employeeRouter from "#api/employees";

app.use('/employees', employeeRouter)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send("Something went wrong...")
})