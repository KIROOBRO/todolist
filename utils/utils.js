export const APPEND_POSITION = {
    IN_THE_START: 'start',
    IN_THE_END: 'end'
};

export const Actions = {
    TASK_CREATED: 'task-created',
    TASK_UPDATED: 'task-updated',
    FILTER: 'filter',
    DELETE: 'delete',
    CHANGE_TITLE: 'change-title',
    SORTED: 'sorted',
    CREATE_MODAL: 'create-modal'
};

export function getCreateDate() {
        // const date = new Date();
        return new Date();
}

export function getDeadlineDate() {
    const deadLineDate = new Date();
    deadLineDate.setDate(deadLineDate.getDate() + 1);
    return deadLineDate
}

export function createElement(template) {
    const divElement = document.createElement('div');
    divElement.innerHTML = template;

    return divElement.firstChild;

}

export function renderElement(container, element, append_position = APPEND_POSITION.IN_THE_START) {
    switch (append_position) {
        case APPEND_POSITION.IN_THE_START: {
            container.prepend(element);
            break;
        }
        case APPEND_POSITION.IN_THE_END: {
            container.append(element);
            break;
        }
    }
}