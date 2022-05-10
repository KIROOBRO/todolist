import {AbstractComponent} from "./abstract.component.js";
import {Actions} from "../utils/utils.js";
import {TaskComponent} from "./task.component.js";
import {renderElement} from "../utils/utils.js";
import {APPEND_POSITION} from "../utils/utils.js";

export class TaskCardComponent extends AbstractComponent {
    constructor() {
        super();

        this._tasksArray = window.taskService.getAllTasks();

    }

    _getTemplate() {
        return (`<div class="card-wrapper"></div>`)
    }

    _afterCreateElement() {
        window.addEventListener(Actions.TASK_CREATED, this._onTasksChanged.bind(this));
        window.addEventListener(Actions.TASK_UPDATED, this._onTasksChanged.bind(this));
        window.addEventListener(Actions.FILTER, this._onFilterChanged.bind(this));
        window.addEventListener(Actions.DELETE, this._onTasksChanged.bind(this));
        window.addEventListener(Actions.CHANGE_TITLE, this._onTasksChanged.bind(this));
        window.addEventListener(Actions.CHANGE_DEADLINE, this._onTasksChanged.bind(this));
        window.addEventListener(Actions.SORTED, this.onTasksSorted.bind(this));

        this._renderContent();
    }

    _onTasksChanged() {
        this._tasksArray = window.taskService.getAllTasks();
        this._renderContent();
    }

    onTasksSorted(data) {
        this._tasksArray = data.detail;
        this._renderContent();
    }

    _onFilterChanged(data) {
        this._tasksArray = data.detail;
        this._renderContent();
    }

    _renderContent() {
        this._element.innerHTML = '';

        this._tasksArray.forEach((task, idx) => {
            const taskComponent = new TaskComponent(task, idx + 1);
            const taskElement = taskComponent.getElement();

            renderElement(this._element, taskElement, APPEND_POSITION.IN_THE_END);
        });
    }
}