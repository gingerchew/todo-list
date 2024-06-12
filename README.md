# TodoList WC

A todolist "app" built with web components.

> **Warning** 
This package uses Customized built-in elements, be sure to include a polyfill. I recommend just using [the one provided by ungap](https://github.com/ungap/custom-elements).

## How to use

```js
import "todo-list-wc";
```

```html
<todo-list>
    <input ref="input" type="text">
    <button type="button" ref="submit">Add Todo</button>
    <ul ref="list">
        <!-- ... -->
    </ul>
</todo-list>
```


The `<todo-list>` element will automatically add event listeners by looking for the given refs[^1]:

| Ref Name | Expected Element Type |
| - | -: |
| `input` | `HTMLInputElement` |
| `submit` | `HTMLButtonElement` |
| `list` | `HTMLUListElement`[^2] |

[^1]: The elements in the example with a `ref` attribute are required. How you place them and the HTML inside the `<todo-list>` element is up to you.

[^2]: The `list` ref could be swapped for a `HTMLOListElement` and work fine, but other list HTMLElements will not work.

