import {createElement} from "../utils/utils.js";

export class AbstractComponent {
    constructor() {
        if (new.target === AbstractComponent) {
            throw new Error('We cant create instance for this class')
        }

        this._element = null
    }

    _getTemplate() {
        throw new Error('Abstract component doesnt have template!')
    }

    getElement() {
        if (!this._element) {
            this._element = createElement(this._getTemplate());
            this._afterCreateElement();
        }
        return this._element;
    }

    _afterCreateElement() {
    }

    _afterRemoveElement() {
    }
}