const router = require('express').Router();
const Task = require('../../models/task');
//Handlers para los endpoints de la API de Tasks

//pedir una tarea
router.get('/:id', (req, res, next) => {
    Task.getTaskById(req.params.id)
        .then(task => {
            res.json({
                task,
            });
        })
        .catch(err => {
            next(err);
        });
});

//pedir tareas
router.get('/', (req, res, next) => {
    Task.getAllTasks()
        .then(tasks => {
            res.json({
                tasks,
            });
        })
        .catch(err => {
            next(err);
        });
});

//agregar tarea
router.post('/', (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const newTask = new Task(0, name, description);
    newTask.save()
        .then(() => {
            res.send(`Has creado una tarea`)
        })
        .catch((err) => {
            console.log(err);
            next(err)
        })
})

//borrar una tarea
router.delete('/:id', (req, res, next) => {
    Task.deleteTaskById(req.params.id)
        .then(() => {
            res.send(`la tarea ${req.params.id} ha sido borrado`)
        })
        .catch((err) => {
            next(err)
        })
});

//modificar una tarea
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    Task.modifyTaskById(id, name, description)
        .then(() => {
            res.send(`modificaste la tarea`)
        })
        .catch((err) => {
            next(err)
        })
});

module.exports = router;