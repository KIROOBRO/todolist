import {AbstractComponent} from "./abstract.component.js";

export class ModalWindowComponent extends AbstractComponent {
    constructor() {
        super();
    }


    _getTemplate() {
        return (`<div class="modal-container">
<p class="modal-text">Are you sure you want to delete?</p>
<div class="modal-info">
<button class="btn cancel">Cancel</button>
<button class="btn okay">Okay</button>
</div></div>`)
    }

    _afterCreateElement() {
        const btnCancel = this._element.querySelector('.btn.cancel');
        const modal = document.querySelector('.modal');

        btnCancel.addEventListener('click', () => {
            modal.style.display = "none"
        });

        const btnOkay = this._element.querySelector('.btn.okay');

        btnOkay.addEventListener('click', () => {
            window.taskService.deleteTask(window.taskId);
            modal.style.display = "none";
        });
    }
}
