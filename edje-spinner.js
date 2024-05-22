
class EdjeSpinner extends HTMLElement {
  rendered = false;

  active = false;
  debug = false;

  attributeConfig = {
    display: 'normal',
    type: 'eddie',
    size: 'medium',
  };

  shadowRoot;

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['active', 'debug', 'config'];
  }

  connectedCallback() {
    if (this.rendered === false) {
      this.shadowRoot = this.attachShadow({ mode: 'open' });
      this.render();
      this.rendered = true;  
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.debug === true && name !== 'config') {
      console.log('[edje-spinner]', { name, oldValue, newValue });
    } if (this.debug === true && name === 'config') {
      console.log('[edje-spinner]', {
        name,
        oldValue: JSON.parse(oldValue === null ? '{}' : oldValue),
        newValue: JSON.parse(newValue),
      });
    }

    switch (name) {
      case 'active':
        this.active = newValue === 'true';
        break;
      case 'debug':
        this.debug = newValue === 'true';
        break;
      case 'config':
        this.attributeConfig = { ...this.attributeConfig, ...JSON.parse(newValue) };
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
    ${this._getDisplay()}
  `;
  }

  _getDisplay = () => {
    switch (this.attributeConfig.display) {
      case 'normal':
        return `
          <div part="container" id="edje-spinner--container">
            <div part="spinner-loading" id="edje-spinner">
              ${this._getImage().replace('edje-spinner--normal-image', `edje-spinner--normal-image--${this.attributeConfig.size}-size`)}
            </div>
          </div>  
        `;
      case 'round':
        return `
          <div part="container" id="edje-spinner--container">
            <div part="spinner-background" id="edje-spinner"">
              ${this._getImage().replace('edje-spinner--normal-image', `edje-spinner--round-image--${this.attributeConfig.size}-size`)}
            </div>
            <div part="round--${this.attributeConfig.size}-size" id="edje-spinner--edje-round" class="round"></div>
          </div>
        `;
      }
  };

  _getImage = () => {
    if (this.attributeConfig.type === 'external') {
      return `<img part="edje-spinner--normal-image" src="${this.attributeConfig.path}" alt="external image" />`;
    }
    return globalThis[globalThis.config[this.attributeConfig.type].global];
  }

  _renderStyle() {
    return `
    <style>
      @keyframes edje-spinner-keyframes {
        0% { transform: scaleX(100%); }
        25% { transform: scaleX(0); }
        50% { transform: scaleX(-100%); }
        75% { transform: scaleX(0); }
        100% { transform: scaleX(100%); }
      }

      @-webkit-keyframes edje-spinner-load-round {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      
      @keyframes edje-spinner-load-round {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
    </style>
    `;
  }
}

window.customElements.define('edje-spinner', EdjeSpinner);
