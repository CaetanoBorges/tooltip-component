const template = document.createElement('template');
template.innerHTML = `
    <style>
        .tooltip-container{
            display:inline-block;
            position:relative;
            z-index:2;
        }
        .icon{width:1em;cursor: pointer;}
        .cancel{display:none}

        .notify-container{
            position:absolute;
            bottom: 125%;
            z-index: 9;
            width:200px;
            background: white;
            box-shadow: 5px 5px 10px rgba(0,0,0,.1);
            font-size:.8em;
            border-radius:.5em;
            padding: 1em;
            transform: scale(0);
            transform-origin: bottom left;
            transition: transform .5s cubic-bezier(0.860, 0.000, 0.070, 1.000);
        }
    </style>

    <div class="tooltip-container">
        <img src="feito.png" class="cancel icon">
        <img src="naoFeito.png" class="alert icon">

        <div class="notify-container">
            <slot name="sms" />
        </div>
    </div>
`;

class PopupNotify extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    tooltip(expandState) {
        const tooltip = this.shadowRoot.querySelector('.notify-container');
        const alert = this.shadowRoot.querySelector('.alert');
        const cancel = this.shadowRoot.querySelector('.cancel');

        if (expandState == true) {
            tooltip.style.transform = 'scale(1)';
            alert.style.display = 'none';
            cancel.style.display = 'block';
        } else {
            tooltip.style.transform = 'scale(0)';
            alert.style.display = 'block';
            cancel.style.display = 'none';
        }

        if (this.getAttribute('tip_background')) {
            this.shadowRoot.querySelector('.notify-container').style.background = this.getAttribute('tip_background');
        }

        if (this.getAttribute('tip_color')) {
            this.shadowRoot.querySelector('.notify-container').style.color = this.getAttribute('tip_color');
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.alert').addEventListener('click', () => {
            this.tooltip(true);
        })
        this.shadowRoot.querySelector('.cancel').addEventListener('click', () => {
            this.tooltip(false);
        })
    }


}

window.customElements.define('popup-notify', PopupNotify)