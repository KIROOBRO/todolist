import {Actions} from "../utils/utils.js";
import {getCreateDate} from "../utils/utils.js";
import {getDeadlineDate} from "../utils/utils.js";

export class TaskService {

    _tasks = [
        {id: this.generatorUniqId(), title: 'Find exit from tilt', create: getCreateDate(), deadline: getDeadlineDate(), checked: true},
        {id: this.generatorUniqId(), title: 'Test task', create: getCreateDate(), deadline: getDeadlineDate(), checked: false},
        {id: this.generatorUniqId(), title: 'Learn Angular', create: new Date(2015, 10, 19), deadline: getDeadlineDate(), checked: false}
    ];

    _filterTasks = this._tasks;

    generatorUniqId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    getAllTasks() {
        return this._tasks;
    }

    showAllTasks() {
        const allTasks = this._tasks;
        this._emitEvent(Actions.FILTER, {detail: allTasks})
    }

    getActiveTasks() {
        const activeTasks = this._tasks.filter(el => !el.checked);
        this._emitEvent(Actions.FILTER, {detail: activeTasks});
    }

    getFinishedTasks() {
        const finishedTasks = this._tasks.filter(el => el.checked);
        this._emitEvent(Actions.FILTER, {detail: finishedTasks});
    }

    deleteTask(id) {
        this._tasks = this._tasks.filter(task => task.id !== id);
        this._emitEvent(Actions.DELETE);
    }

    changeTask(id, title, date) {
        this._tasks = this._tasks.map(task => {

            if (task.id === id) {
                if (!title) {
                    alert('Please, enter task name or date');
                    return task
                }
                task.title = title;
                task.deadline = date;
            } else if (date <= getCreateDate() || !date) {
                task.deadline = getCreateDate();
            }
            return task
        });
        this._emitEvent(Actions.CHANGE_TITLE)
    }

    sortTasksByName() {
        const sortByName = this._tasks.sort((a, b) => {
            if(a.title < b.title) { return -1; }
            if(a.title > b.title) { return 1; }
            return 0;
        });
        this._emitEvent(Actions.SORTED, {detail: sortByName});
    }

    sortTasksByDate() {
        const sortByDate = this._tasks.sort((a, b) => {
            return a.create - b.create;
        });

        this._emitEvent(Actions.SORTED, {detail: sortByDate});
    }

    getFilterTasksByActive() {
        this._filterTasks = this._tasks.filter(el => !el.checked);
        this._emitEvent(Actions.FILTER, {detail:this._filterTasks});
    }

    getFilterTasksByFinished() {
        this._filterTasks = this._tasks.filter(el => el.checked);
        this._emitEvent(Actions.FILTER, {detail:this._filterTasks});
    }

    sortFilterTasksByName() {
        const sortFilterTasks = this._filterTasks.sort((a, b) => {
            if(a.title < b.title) { return -1; }
            if(a.title > b.title) { return 1; }
            return 0;
        });
        this._emitEvent(Actions.SORTED, {detail: sortFilterTasks});
    }

    sortFilterTasksByDate() {
        const sortFilterTasks = this._filterTasks.sort((a, b) => {
            return a.create - b.create;
        });
        this._emitEvent(Actions.SORTED, {detail: sortFilterTasks});
    }

    sortTasks(event) {
        switch (event.target.value) {
            case ('All'):
                if (!this._filterTasks) {
                    return window.taskService.getAllTasks();
                }
                return window.taskService.showAllTasks();
            case ('Text'):
                if (!this._filterTasks) {
                    return window.taskService.sortTasksByName();
                } else {
                    return window.taskService.sortFilterTasksByName();
                }
            case ('Date'):
                if (!this._filterTasks) {
                    return window.taskService.sortTasksByDate();
                } else {
                    return window.taskService.sortFilterTasksByDate();
                }
        }
    }

    setNewTask(title) {
        const newTask = {
            id: this.generatorUniqId(),
            title: title,
            create: getCreateDate(),
            deadline: getDeadlineDate(),
            checked: false,
        };

        if (!title) {
            alert('Create task name!');
        } else {
            this._tasks.push(newTask);
        }
        this._emitEvent(Actions.TASK_CREATED, newTask);
    }

    changeTaskStatusById(id) {
        this._tasks = this._tasks.map(task => {
            if (task.id === id) {
                task.checked = !task.checked
            }
            return task
        });
        this._emitEvent(Actions.TASK_UPDATED)
    }

    openModalEdit(task) {
        this._emitEvent(Actions.CREATE_MODAL, {detail: task});
    }

    _emitEvent(type, data) {
        window.dispatchEvent(new CustomEvent(type, data));
    }
}

