
const taskDomain = (function(Task){

    return {
        create: (data)=> {
            let newTask = new Task();
            //set values
            newTask.title = data.title;
            newTask.description = data.description;
            newTask.color = data.color || '#ffb74d';
            newTask.complete = false;
            newTask.pinned = false;

            return newTask.save();

        }
    }
    
});

module.exports = taskDomain;