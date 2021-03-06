const express = require('express');

let task = require('../models/task.js');
const taskDomain = require('../domain/task.js')(task);

/** ROUTE PLAN

Route 	                HTTP Verb 	        Description
---------------------------------------------------------------------------
/api/tasks 	            GET 	            Get all the tasks.
/api/tasks 	            POST 	            Create a task.
/api/tasks/:task_id 	GET 	            Get a single task.
/api/tasks/:task_id 	PUT 	            Update a task with new info.
/api/tasks/:task_id 	DELETE 	            Delete a task. 

**/


let router = express.Router();

//Common MIddleware ( will be called for EVERY route)
router.use((req, res, next)=> {
    //Ideal for Logging validations, jwt token checks etc.
    console.log(req.params);
    next();
});


//Ping
router.get('/ping', (req, res) => {
    res.json({ message: `Ping Received..` });
});

//on all routes that end with "/tasks"
router.route('/tasks')
    .post((req, res)=> {
        return taskDomain.create(req.body)
            .then(()=>res.json({message: 'Task Created'}))
            .catch(err=>res.send(err));
    })
    .get((req, res)=> {
        return taskDomain.fetchAll()
            .then(tasks=>res.json(tasks))
            .catch(err=>res.send(err));
    });

//on all the routes that end with /tasks/:taskId

router.route('/tasks/:taskId')
    .get((req, res)=>{
        return taskDomain.fetchById(req.params.taskId)
            .then(task => res.json(task))
            .catch(err => res.send(err));
    })
    .put((req, res)=> {
        return taskDomain.update(req.params.taskId, req.body)
            .then(() => res.json({message: 'Task Updated Successfully'}))
            .catch(err => res.send(err));
    })
    .delete((req, res)=> {
        return taskDomain.delete(req.params.taskId)
            .then(() => res.json({message: 'Task Deleted Successfully'}))
            .catch(err => res.send(err));
    })


module.exports = router;
