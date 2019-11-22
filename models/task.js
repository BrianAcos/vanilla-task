const db = require('../services/db-connection');
const GET_TASK_BY_ID = 'SELECT * from tasks where id = ?';
const GET_ALL_TASKS = 'SELECT * from tasks';
const SAVE_TASK = 'INSERT INTO tasks VALUES(0,?,?)';
const DELETE_TASK = 'DELETE FROM tasks WHERE id = ?';
const MODIFY_TASK = 'UPDATE tasks SET name = ?, description = ? WHERE id = ?';

class Task {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static deleteTaskById(ID) {
        return new Promise((resolve, reject) => {
            db.query(DELETE_TASK, [ID], (error, result) => {
                if (error) {
                    reject(error)
                } else if (result[0] === undefined) {
                    resolve('404 not found')
                } else {
                    resolve('tarea borrada')
                }
            });
        });
    }

    static modifyTaskById(id, name, description) {
        return new Promise((resolve, reject) => {
            db.query(MODIFY_TASK, [name, description, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static getTaskById(id) {
        return new Promise(function (resolve, reject) {
            db.query(GET_TASK_BY_ID, [id], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    const { id, name, description } = results[0];
                    resolve(new Task(id, name, description));
                }
            });
        })
    }

    static getAllTasks() {
        return new Promise(function (resolve, reject) {
            db.query(GET_ALL_TASKS, function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        resolve(results.map((task) => {
                            const { id, name, description } = task;
                            return new Task(id, name, description);
                        }));
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        })
    }

    save() {
        const { name, description } = this;
        return new Promise((resolve, reject) => {
            db.query(SAVE_TASK, [name, description], (err, resp, fields) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            });
        });
    }

}

module.exports = Task;