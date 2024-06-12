interface ITodoList extends HTMLElement {
    _input: HTMLInputElement;
    _submit: HTMLButtonElement;
    _list: HTMLUListElement;
    _todos: WeakMap<HTMLLIElement, string>;
    _useLocal: boolean;
    get _lastItem(): HTMLLIElement;
    set _todosLocal(todo: string|string[]);
    get _todosLocal():string[];
    add(todo: string, shouldStore: boolean): void;
    delete(todo: HTMLLIElement): void;
    handleEvent(e: MouseEvent): void;
    connectedCallback():void;
    disconnectedCallback():void;
}

interface ITodoUList extends HTMLUListElement {
    children: HTMLCollectionOf<HTMLLIElement>;
}

class TodoList extends HTMLElement implements ITodoList {
    _todos = new WeakMap();
    _input = this.querySelector<HTMLInputElement>('[ref="input"]')!;
    _submit = this.querySelector<HTMLButtonElement>('[ref="submit"]')!;
    _list = this.querySelector<ITodoUList>('[ref="list"]')!;
    _useLocal = this.hasAttribute('use-local');
    static i = 1;
    static getId() {
        return this.i++
    }
    constructor() {
        super();
    }

    get _lastItem() {
        return this._list.children[this._list.children.length - 1];
    }

    set _todosLocal(todo: string|string[]) {
        if (typeof todo === 'string') {
            const data = JSON.parse(localStorage.getItem('todos') || '[]');
            data.push(todo);
            localStorage.setItem('todos', JSON.stringify(data));
        } else if (Array.isArray(todo)) {
            localStorage.setItem('todos', JSON.stringify(todo));
        }
    }

    get _todosLocal(): string[] {
        return JSON.parse(localStorage.getItem('todos') || '[]');
    }

    add(todo: string, shouldStore = this._useLocal) {
        /*
        const li = document.createElement('li', { is: 'todo-item' });
        li.setAttribute('title', todo);
        */
        this._list.insertAdjacentHTML('beforeend', `<li>
            <span>${todo}</span>
            <button type="button">&times; Clear</button>
        </li>`)

        this._todos.set(this._lastItem, todo);
        this._input.value = '';
        if (shouldStore) {
            this._todosLocal = todo;
        }
    }

    delete(todoElement: HTMLLIElement) {
        if (this._todos.has(todoElement)) {
            this._todos.delete(todoElement);
            if (this._useLocal) {
                const data = this._todosLocal;
                const indexOfTodo = data.indexOf(todoElement.getAttribute('title')!);
                data.splice(indexOfTodo, 1);
                this._todosLocal = data;
            }

            todoElement.remove();
        }
    }

    handleEvent({ target }) {
        switch(true) {
            case target.closest('[ref="submit"]') && this._input.value !== '':
                this.add(this._input.value);
                break;
            case target.closest('li > button'):
                this.delete(target.closest('li'));
                break;
        }
    }

    connectedCallback() {
        this._useLocal &&
            this._todosLocal
                .forEach(todo => this.add(todo, false));

        this._submit.addEventListener('click', this);
    }

    disconnectedCallback() {
        this._submit.removeEventListener('click', this);
    }
}

window.customElements.define('todo-list', TodoList);