import {AbstractComponent} from "./abstract.component.js";
import {renderElement} from "../utils/utils.js";
import {ModalWindowComponent} from "./modal.window.component.js";

export class TaskComponent extends AbstractComponent {
    constructor(task, idx) {
        super();

        this._taskTitle = task.title;
        this._taskId = task.id;
        this._taskIndex = idx;
        this._taskCreate = task.create;
        this._taskDeadline = task.deadline;
        this._taskChecked = task.checked;
        this.task = task;
    }

    _getTemplate() {
        return (`<div class="card ${this._taskChecked ? 'check' : ''}">
<input type="checkbox" id="checkbox" class="checkbox" value="${this._taskId}" ${this._taskChecked ? 'checked' : ''}>
<p class="task-index">${this._taskIndex}</p>
<p class="task-title">${this._taskTitle}</p>
<p class="task-create">Date of Creation: ${this._taskCreate.toLocaleDateString()}</p>
<p class="task-deadline">Deadline: ${this._taskDeadline.toLocaleDateString()}</p>
<button class="task-edit"></button>
<button class="task-close"></button>
</div>`)
    }

    _afterCreateElement() {
        const inputBtn = this._element.querySelector('.checkbox');

        inputBtn.addEventListener('input', () => {
            window.taskService.changeTaskStatusById(this._taskId)
        });

        const modal = document.querySelector('.modal');
        const deleteButton = this._element.querySelector('.task-close');

        deleteButton.addEventListener('click', () => {
            const modalWindow = document.querySelector('.modal');

            const modalWindowComponent = new ModalWindowComponent();
            const modalWindowElement = modalWindowComponent.getElement();
            renderElement(modalWindow, modalWindowElement);
            modal.style.display = "block";
            window.taskId = this._taskId;
        });

        const modalEdit = document.querySelector('.modal-edit');
        const editButton = this._element.querySelector('.task-edit');
        window.taskCreate = this._taskCreate;

        editButton.addEventListener('click', () => {
            window.taskId = this._taskId;
            window.taskService.openModalEdit(this.task);
        });
    }
}