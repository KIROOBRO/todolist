import {AbstractComponent} from "./abstract.component.js";

export class HeaderComponent extends AbstractComponent {
    constructor(headerTitle) {
        super();

        this._headerTitle = headerTitle;
    }

    _getTemplate() {
        return (`<header class="header">
<h1 class="header__title">${ this._headerTitle }</h1>
<div class="buttons">
<button class="rebtn all">ALL</button>
<button class="rebtn active">ACTIVE</button>
<button class="rebtn finish">FINISHED</button>
</div>
<div class="sort">
<select class="select">
<option value="All">All</option>
<option value="Text">Text</option>
<option value="Date">Date of Create</option>
</select>
</div>
<div class="create">
<p class="create__task">Create new task: </p>
<div class="create_info">
<input class="create__input" placeholder="Write here your task...">
<button class="btn">Create!</button>
</div>
</div>
</header>`)
    }

    _afterCreateElement() {
        const btnElement = this._element.querySelector('.btn');

        btnElement.addEventListener('click', () => {
            const inputEl = this._element.querySelector('input');

            window.taskService.setNewTask(inputEl.value);
            inputEl.value = '';
        });

        const btnAll = this._element.querySelector('.rebtn.all');

        btnAll.addEventListener('click', () => {
            btnActive.classList.remove('toggle');
            btnFinished.classList.remove('toggle');
            btnAll.classList.add('toggle');
            select.value = 'All';
            window.taskService.showAllTasks();
        });

        const btnActive = this._element.querySelector('.rebtn.active');

        btnActive.addEventListener('click', () => {
            btnAll.classList.remove('toggle');
            btnFinished.classList.remove('toggle');
            btnActive.classList.add('toggle');
            window.taskService.getFilterTasksByActive();
        });

        const btnFinished = this._element.querySelector('.rebtn.finish');

        btnFinished.addEventListener('click', () => {
            btnActive.classList.remove('toggle');
            btnAll.classList.remove('toggle');
            btnFinished.classList.add('toggle');
            window.taskService.getFilterTasksByFinished();
        });

        const select = this._element.querySelector('select');

        select.addEventListener('change', (event) => {
            window.taskService.sortTasks(event);
        });
    }
}