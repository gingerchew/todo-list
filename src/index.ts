interface ITodoList extends HTMLElement {
    _input: HTMLInputElement;
    _submit: HTMLButtonElement;
    _list: ITodoListElement;
    _todos: WeakMap<ITodoItem, string>;
    _useLocal: boolean;
    get _lastItem(): ITodoItem;
    set _todosLocal(todo: string|string[]);
    get _todosLocal():string[];
    add(todo: string, shouldStore: boolean): void;
    delete(todo: ITodoItem): void;
    handleEvent(e: MouseEvent): void;
    connectedCallback():void;
    disconnectedCallback():void;
}

interface ITodoListElement extends HTMLUListElement {
    children: HTMLCollectionOf<ITodoItem>;
}

interface ITodoItem extends HTMLLIElement {
    _listParent: ITodoList;
    _removeSelf():void;
    handleEvent(e: MouseEvent):void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}

customElements.define('todo-list', class extends HTMLElement implements ITodoList {
    _todos = new WeakMap();
    _input = this.querySelector<HTMLInputElement>('[ref="input"]')!;
    _submit = this.querySelector<HTMLButtonElement>('[ref="submit"]')!;
    _list = this.querySelector<ITodoListElement>('[ref="list"]')!;
    _useLocal = this.hasAttribute('use-local');
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
        const li = document.createElement('li', { is: 'todo-item' });
        li.setAttribute('title', todo);
        this._list.insertAdjacentElement('beforeend', li)

        this._todos.set(this._lastItem, todo);
        this._input.value = '';
        if (shouldStore) {
            this._todosLocal = todo;
        }
    }

    delete(todoElement: ITodoItem) {
        if (this._todos.has(todoElement)) {
            this._todos.delete(todoElement);
            todoElement.remove();
            if (this._useLocal) {
                const data = this._todosLocal;
                const indexOfTodo = data.indexOf(todoElement.getAttribute('title')!);
                data.splice(indexOfTodo, 1);
                this._todosLocal = data;
            }
        }
    }

    handleEvent({ type, target }) {
        if (
            type === 'click' &&
            target.closest('[ref="submit"]') &&
            this._input.value !== ''
        ) {
            this.add(this._input.value);
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
})

customElements.define('todo-item', class extends HTMLLIElement implements ITodoItem {
    _listParent: ITodoList = this.closest('todo-list')!;
    constructor() {
        super();
        if (!this.hasAttribute('title')) {
            throw new Error('TodoItem must have a title attribute to be constructed');
        }
    }

    _removeSelf() {
        this._listParent.delete(this);
    }

    handleEvent({ type, target }) {
        if (type !== 'click') return;
        if (!(target as HTMLElement).closest('[type="button"]')) return;

        this._removeSelf();
    }

    connectedCallback() {
        this.innerHTML = `<span>${this.getAttribute('title')}</span><button type="button">&times; Clear</button>`
        this.addEventListener('click', this as unknown as EventListenerObject);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this as unknown as EventListenerObject);
    }
}, { extends: 'li' })