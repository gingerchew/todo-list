class t extends HTMLElement{static getId(){return this.i++}constructor(){super(),this.t=new WeakMap,this.o=this.querySelector('[ref="input"]'),this.h=this.querySelector('[ref="submit"]'),this.l=this.querySelector('[ref="list"]'),this.u=this.hasAttribute("use-local")}get S(){return this.l.children[this.l.children.length-1]}set p(t){if("string"==typeof t){const s=JSON.parse(localStorage.getItem("todos")||"[]");s.push(t),localStorage.setItem("todos",JSON.stringify(s))}else Array.isArray(t)&&localStorage.setItem("todos",JSON.stringify(t))}get p(){return JSON.parse(localStorage.getItem("todos")||"[]")}add(t,s=this.u){this.l.insertAdjacentHTML("beforeend",`<li>\n            <span>${t}</span>\n            <button type="button">&times; Clear</button>\n        </li>`),this.t.set(this.S,t),this.o.value="",s&&(this.p=t)}delete(t){if(this.t.has(t)){if(this.t.delete(t),this.u){const s=this.p,i=s.indexOf(t.getAttribute("title"));s.splice(i,1),this.p=s}t.remove()}}handleEvent({target:t}){switch(!0){case t.closest('[ref="submit"]')&&""!==this.o.value:this.add(this.o.value);break;case t.closest("li > button"):this.delete(t.closest("li"))}}connectedCallback(){this.u&&this.p.forEach(t=>this.add(t,!1)),this.h.addEventListener("click",this)}disconnectedCallback(){this.h.removeEventListener("click",this)}}t.i=1,window.customElements.define("todo-list",t);
//# sourceMappingURL=todo-list.modern.js.map
