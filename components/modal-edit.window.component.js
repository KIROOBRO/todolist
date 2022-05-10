import {AbstractComponent} from "./abstract.component.js";

export class ModalEditWindowComponent extends AbstractComponent {
    _currentEdit;
    constructor(task) {
        super();

        this._currentEdit = task;
    }

    set setCurrentEdit(task) {
        this._currentEdit = task;
        console.log(this._currentEdit)

    }

    get getCurrentEdit() {
        return this._currentEdit;
    }

    _getTemplate() {
        return (`<div class="modal-edit">
<div class="modal-edit-container">
<div class="modal-edit-nameAndDate">
<input type="text" class="changeName" placeholder="Write here new name of task..." value="${this._currentEdit.title}">
<div class="modal-date">
<label for="start">Set new date: </label>
<input type="date" class="changeDate" value="${this._currentEdit.create.toISOString().split("T")[0]}" min="${this._currentEdit.create.toISOString().split("T")[0]}" max="">
</div></div>
<div class="modal-edit-info">
<button class="btn cancelAll">Cancel</button>
<button class="btn saveChanges">Save</button>
</div></div></div>`)
    }

    _afterCreateElement() {
        const modalEditWindow = document.querySelector('.modal-view-wrapper');
        const btnCancel = this._element.querySelector('.btn.cancelAll');

        btnCancel.addEventListener('click', () => {
            modalEditWindow.innerHTML = '';
        });

        const btnSave = this._element.querySelector('.btn.saveChanges');

        btnSave.addEventListener('click', () => {
            const inputName = this._element.querySelector('.changeName');
            const inputDate = this._element.querySelector('.changeDate');

            window.taskService.changeTask(window.taskId, inputName.value, new Date(inputDate.value));
            modalEditWindow.innerHTML = '';
        });
    }
}