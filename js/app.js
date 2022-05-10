import {HeaderComponent} from "../components/header.component.js";
import {renderElement} from "../utils/utils.js";
import {TaskCardComponent} from "../components/task-card.component.js";
import {TaskService} from "../services/task.service.js";
import {ModalEditWindowComponent} from "../components/modal-edit.window.component.js";
import {Actions} from "../utils/utils.js";

export class App {
    constructor() {
        window.taskService = new TaskService();
    }

    init() {
        const containerElement = document.querySelector('.container');

        const headerComponent = new HeaderComponent('TO DO LIST');
        const headerTemplate = headerComponent.getElement();
        renderElement(containerElement, headerTemplate);

        const mainContainer = document.querySelector('.main');

        const taskCardComponent = new TaskCardComponent();
        const taskCardElement = taskCardComponent.getElement();
        renderElement(mainContainer, taskCardElement);


        window.addEventListener(Actions.CREATE_MODAL, this.isModalCreate.bind(this));
    }

    isModalCreate(task) {
        const modalEditWindow = document.querySelector('.modal-view-wrapper');
        modalEditWindow.innerHTML = '';
        const modalEditWindowComponent = new ModalEditWindowComponent(task.detail);
        const modalEditWindowElement = modalEditWindowComponent.getElement();
        renderElement(modalEditWindow, modalEditWindowElement);
    }
}