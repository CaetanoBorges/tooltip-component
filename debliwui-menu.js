const debliwui_menu = document.createElement('template');
debliwui_menu.innerHTML = `
    <style>
        .menu-container{
            position:fixed;
            top: 20px;
            left: 20px;
            z-index:2;
        }
        .icon{width:50px;cursor: pointer;}
        .cancel{display:none}

        .inside-container{
            position:relative;
            bottom: 0;
            z-index: 9;
            width:fit-content;
            background: white;
            box-shadow: 5px 5px 10px rgba(0,0,0,.1);
            font-size:17px;
            border-radius:.5em;
            padding: 10px;
            transform: scale(0);
            transform-origin: top left;
            transition: transform .5s cubic-bezier(0.860, 0.000, 0.070, 1.000);
        }
        .inside-container ul {list-style:none; padding:0;}
        .inside-container ul li{list-style:none; padding:10px; cursor: pointer; border-bottom:1px solid #fff}
       
    </style>

    <div class="menu-container">
        <img src="menu-out.png" class="cancel icon">
        <img src="menu-in.png" class="alert icon">

        <div class="inside-container">
            <!--<slot name="sms" /> -->
             <ul>
                <li class="li" onclick="fuc()">aaaaaaaaa2</li>
                <li class="li" >aaaaaaaaa2</li>
                <li class="li" >aaaaaaaaa2</li>
            </ul>
        </div>
    </div>
`;

class debliwuimenu extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(debliwui_menu.content.cloneNode(true));
    }

    tooltip(expandState) {
        const tooltip = this.shadowRoot.querySelector('.inside-container');
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
            this.shadowRoot.querySelector('.inside-container').style.background = this.getAttribute('tip_background');
        }

        if (this.getAttribute('tip_color')) {
            this.shadowRoot.querySelector('.inside-container').style.color = this.getAttribute('tip_color');
        }

        if (true) {

        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.alert').addEventListener('click', () => {
            this.tooltip(true);
        })
        this.shadowRoot.querySelector('.cancel').addEventListener('click', () => {
            this.tooltip(false);
        })
        this.shadowRoot.querySelector('.li').addEventListener('click', () => {
            this.tooltip(false);
        })
    }


}

window.customElements.define('debliwui-menu', debliwuimenu)