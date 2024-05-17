import eddieJs from './images/eddie.js';
import eddieSilver from './images/eddie-silver.js';

class EdjeSpinner extends HTMLElement {
  rendered = false;

  active = false;
  debug = false;
  type = 'eddie';
  size = 'normal'

  shadowRoot;

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['active', 'debug', 'type', 'size'];
  }

  connectedCallback() {
    if (this.rendered === false) {
      this.shadowRoot = this.attachShadow({ mode: 'open' });
      this.render();
      this.rendered = true;  
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.debug === true) {
      console.log('[edje-spinner]', { name, oldValue, newValue });
    }
    switch (name) {
      case 'active':
        this.active = newValue === 'true';
        break;
      case 'debug':
        this.debug = newValue === 'true';
        break;
      case 'type':
        this.type = newValue.toLowerCase();
        break;
      case 'size':
        this.size = newValue;
        break;
    }
    this.render();
  }

  render() {
    if (this.shadowRoot === undefined) return;

    if (this.debug === true) {
      console.log('[edje-spinner] active', this.active);
    }

    if (this.active === false) {
      this.shadowRoot.innerHTML = ``;
      return;
    }
    
    this.shadowRoot.innerHTML = `
      ${this._renderStyle()}
      <div id="edje-spinner-container">
        <div id="edje-spinner" class="loading">
          ${this.getImage()}
        </div>
      </div>
    `;
  }

  getImage = () => {
    switch (this.type) {
      case 'eddie':
        return eddieJs;
      case 'eddie-silver':
        return eddieSilver;
    }
  };

  _renderStyle() {
    return `
    <style>
      #edje-spinner-container {
        background-color: rgba(0, 0, 0, 0.75);
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        z-index: 100000;

        display: flex;
        justify-content: center;
        align-items: center;
      }

      .normal-image {
        width: 450px;
      }

      #edje-spinner.loading {
        animation: 4s linear infinite edje-spinner-keyframes;
      }

      @keyframes edje-spinner-keyframes {
        0% {
          transform: scaleX(100%)
        }
        25% {
          transform: scaleX(0);
        }
        50% {
          transform: scaleX(-100%);
        }
        75% {
          transform: scaleX(0);
        }
        100% {
          transform: scaleX(100%)
        }
      }
    </style>
    `;
  }
}

window.customElements.define('edje-spinner', EdjeSpinner);