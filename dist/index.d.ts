interface ITodoList extends HTMLElement {
    _input: HTMLInputElement;
    _list: HTMLUListElement;
    _todos: WeakMap<HTMLLIElement, string>;
    _useLocal: boolean;
    get _lastItem(): HTMLLIElement;
    set _todosLocal(todo: string | string[]);
    get _todosLocal(): string[];
    add(todo: string, shouldStore: boolean): void;
    delete(todo: HTMLLIElement): void;
    handleEvent(e: MouseEvent): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
interface ITodoUList extends HTMLUListElement {
    children: HTMLCollectionOf<HTMLLIElement>;
}
declare class TodoList extends HTMLElement implements ITodoList {
    _todos: WeakMap<object, any>;
    _input: HTMLInputElement;
    _list: ITodoUList;
    _useLocal: boolean;
    static i: number;
    static getId(): number;
    constructor();
    get _lastItem(): HTMLLIElement;
    set _todosLocal(todo: string | string[]);
    get _todosLocal(): string[];
    add(todo: string, shouldStore?: boolean): void;
    delete(todoElement: HTMLLIElement): void;
    handleEvent({ target }: {
        target: any;
    }): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
