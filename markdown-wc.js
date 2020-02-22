const msg = {
    ko: {
        hello: "안녕하세요",
        bye: "잘가",
    },
    en: {
        hello: "hello",
        bye: "bye bye",
    }
};

const i18n = {
    get language() {
        return this._lang;
    },
    set language(lang) {
        if (!this._msg) {
            this._msg = {};
        }
        if (!this._msg[lang]) {
            // TODO: fetch로 변경
            this._msg[lang] = msg[lang];
        }
        this._lang = lang;
        for (let element of document.querySelectorAll("markdown-wc")) {
            let text = element.getAttribute("text");
            if (text)
                element.setAttribute("text", text);
        }
    },
    get message() {
        return this._msg[this._lang];
    }
}

class markdown_wc extends HTMLElement {

    // TODO: css 변경
    css = `
    :host {
        display: block;
        text-align: center;
        color: red;
    }
    `

    static get observedAttributes() {
        return ['text'];
    }

    constructor() {
        super();

        html `
        <p text=""></p>
        <p text=""></p>
        <div>
        <p text="">
        </p>
        </div>
        <p text=""></p>
        `


        let template = document.createElement('template');
        template.innerHTML = "<style>" + this.css + "</style>" + this.html;

        this.shadowDOM = this.attachShadow({
            'mode': 'open'
        });
        this.shadowDOM.appendChild(template.content.cloneNode(true));

        console.log('constructed!');
    }

    connectedCallback() {
        console.log('connected!');
    }

    disconnectedCallback() {
        console.log('disconnected!');
    }

    attributeChangedCallback(name, old_value, new_value) {
        switch (name) {
            case 'text':
                this.text = i18n.message[new_value];
                this.shadowDOM.querySelector("p").innerText = this.text;
                break;
        }

        console.log(`Attribute: ${name} changed to ${this.text}`);
    }

    adoptedCallback() {
        console.log('adopted!');
    }
}

customElements.define('markdown-wc', markdown_wc);
