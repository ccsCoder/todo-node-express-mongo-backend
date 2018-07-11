
const taskDomain = (function(Task){
    function _fetchById(id) {
        return Task.findById(id);
    };
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

        },
        fetchAll: ()=> {
            return Task.find();
        },
        fetchById: _fetchById,
        query: (queryObject)=> {
            return Task.find(queryObject);
        },
        update: (id, props)=> {
           return _fetchById(id).then((task) => {
                //merge props into task
                Object.assign(task, props);
                return task.save();
            }).catch(err => err);
        },
        delete: (id) => {
            return Task.remove({
                _id : id
            });
        }


    }
    
});

module.exports = taskDomain;