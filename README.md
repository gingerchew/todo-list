# TodoList WC

A todolist "app" built with web components.

## How to use

```js
import "todo-list-wc";
```

*Elements with a `ref` attribute are required, the following structure is not required.*

```html
<todo-list>
    <input ref="input" type="text">
    <button type="button" ref="submit">Add Todo</button>
    <ul ref="list">
        <!-- ... -->
    </ul>
</todo-list>
```

The `<todo-list>` element will automatically add event listeners by looking for the given refs:

| Ref Name | Expected Element Type |
| - | -: |
| `input` | `HTMLInputElement` |
| `submit` | `HTMLButtonElement` |
| `list` | `HTMLUListElement` ^1 |

[1] The `list` ref could be swapped for a `HTMLOListElement` and work fine, but other list HTMLElements will not work.

