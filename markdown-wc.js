class _markdown_wc extends HTMLElement {
    html = `
    <h1>To do</h1>
        
    <input type="text" placeholder="Add a new to do"></input>
    <button>✅</button>
    
    <ul id="todos"></ul>
    `
    css = `
    :host {
        display: block;
        font-family: sans-serif;
        text-align: center;
    }
    
    button {
        border: none;
        cursor: pointer;
    }
    
    ul {
        list-style: none;
        padding: 0;
    }
    `

    constructor() {
        super(); 

        let template = document.createElement('template');
        template.innerHTML = "<style>" + this.css + "</style>" + this.html;

        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        //this.$todoList = this._shadowRoot.querySelector('ul');

        console.log('constructed!');
    }

    connectedCallback() {
        console.log('connected!');
    }

    disconnectedCallback() {
        console.log('disconnected!');
    }

    attributeChangedCallback(name, oldVal, newVal) {
        console.log(`Attribute: ${name} changed!`);
    }

    adoptedCallback() {
        console.log('adopted!');
    }
}

customElements.define('markdown-wc', _markdown_wc);
