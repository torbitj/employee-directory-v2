import express from 'express';
import employees, { addEmployee } from "#db/employees";

const employeeRouter = express.Router();

employeeRouter.use(express.json())

employeeRouter.get("/", (req, res) => {
  res.send(employees);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
employeeRouter.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

employeeRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

employeeRouter.post("/", (req, res, next) => {
  if (!req.body || !req.body.name) {
    res.status(400).send("Something went wrong")
  } else {
    const newEmployee = addEmployee(req.body.name)
    res.status(201).send(newEmployee);
  }
  
}) 

export default employeeRouter;