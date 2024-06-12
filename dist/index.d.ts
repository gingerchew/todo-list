interface ITodoList extends HTMLElement {
    _input: HTMLInputElement;
    _submit: HTMLButtonElement;
    _list: ITodoListElement;
    _todos: WeakMap<ITodoItem, string>;
    _useLocal: boolean;
    get _lastItem(): ITodoItem;
    set _todosLocal(todo: string | string[]);
    get _todosLocal(): string[];
    add(todo: string, shouldStore: boolean): void;
    delete(todo: ITodoItem): void;
    handleEvent(e: MouseEvent): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
interface ITodoListElement extends HTMLUListElement {
    children: HTMLCollectionOf<ITodoItem>;
}
interface ITodoItem extends HTMLElement {
    _listParent: ITodoList;
    _removeSelf(): void;
    handleEvent(e: MouseEvent): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare class TodoList extends HTMLElement implements ITodoList {
    _todos: WeakMap<object, any>;
    _input: HTMLInputElement;
    _submit: HTMLButtonElement;
    _list: ITodoListElement;
    _useLocal: boolean;
    constructor();
    get _lastItem(): ITodoItem;
    set _todosLocal(todo: string | string[]);
    get _todosLocal(): string[];
    add(todo: string, shouldStore?: boolean): void;
    delete(todoElement: ITodoItem): void;
    handleEvent({ type, target }: {
        type: any;
        target: any;
    }): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare class TodoItem extends HTMLElement implements ITodoItem {
    _listParent: ITodoList;
    constructor();
    static observedAttributes(): string[];
    render(title: string): void;
    attributeChangedCallback(name: string, _oldValue: unknown, newValue: string): void;
    _removeSelf(): void;
    handleEvent({ type, target }: {
        type: any;
        target: any;
    }): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
