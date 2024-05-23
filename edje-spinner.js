
class EdjeSpinner extends HTMLElement {
  rendered = false;

  _active = false;
  get active() {
    if (this._debug === true || this._debug === 'true') {
      console.log('[edje-spinner] get active', this.hasAttribute('active'));
    }
    return this.hasAttribute('active');
  }
  set active(value) {
    if (this._debug === true || this._debug === 'true') {
      console.log('[edje-spinner] set active', value);
    }
    if (!!value) {
      this.setAttribute('active', value);
      this._active = value;
    } else {
      this.removeAttribute('active');
      this._active = false;
    }
  }

  _debug = true;
  get debug() {
    if (this._debug === true || this._debug === 'true') {
      console.log('[edje-spinner] get debug', this.hasAttribute('debug'));
    }
    return this.hasAttribute('debug');
  }
  set debug(value) {
    if (this._debug === true || this._debug === 'true') {
      console.log('[edje-spinner] set debug', value);
    }
    if (!!value) {
      this.setAttribute('debug', value);
      this._debug = value;
    } else {
      this.removeAttribute('debug');
      this._debug = false;
    }
  }

  _attributeConfig = {
    display: 'normal',
    type: 'eddie',
    size: 'medium',
  };
  get attributeConfig() {
    return this.getAttribute('attributeConfig');
  }
  set attributeConfig(value) {
    if (!!value) {
      this.setAttribute('attributeConfig', value);
      this._attributeConfig = { ...this.attributeConfig, ...value };
    } else {
      this.removeAttribute('attributeConfig');
      this._attributeConfig = {
        display: 'normal',
        type: 'eddie',
        size: 'medium',
      };
    }
  }

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
    if ((this._debug === true || this._debug === 'true') && name !== 'config') {
      console.log('[edje-spinner] attr change', { name, oldValue, newValue });
    } if ((this._debug === true || this._debug === 'true')&& name === 'config') {
      console.log('[edje-spinner] attr change', {
        name,
        oldValue: JSON.parse(oldValue === null ? '{}' : oldValue),
        newValue: JSON.parse(newValue),
      });
    }

    switch (name) {
      case 'active':
        this._active = newValue === 'true';
        break;
      case 'debug':
        this._debug = newValue === 'true';
        break;
      case 'config':
        this._attributeConfig = { ...this.attributeConfig, ...JSON.parse(newValue) };
        break;
    }
    this.render();
  }

  render() {
    if (this.shadowRoot === undefined) return;

    if (this._debug === true || this._debug === 'true') {
      console.log('[edje-spinner] _active', this._active);
    }

    if (this._active === false || this._active === 'false') {
      this.shadowRoot.innerHTML = ``;
      return;
    }
    
    this.shadowRoot.innerHTML = `
      ${this._renderStyle()}
      ${this._getDisplay()}
    `;
  }

  _getDisplay = () => {
    switch (this._attributeConfig.display) {
      case 'normal':
        return `
          <div part="container" id="edje-spinner--container"${this._getContainerStyle()}>
            <div part="spinner-loading" id="edje-spinner">
              ${this._getImage().replace('edje-spinner--normal-image', `edje-spinner--normal-image--${this._attributeConfig.size}-size`)}
            </div>
          </div>
        `;
      case 'round':
        return `
          <div part="container" id="edje-spinner--container"${this._getContainerStyle()}>
            <div part="spinner-background" id="edje-spinner">
              ${this._getImage().replace('edje-spinner--normal-image', `edje-spinner--round-image--${this._attributeConfig.size}-size`)}
            </div>
            <div part="round--${this._attributeConfig.size}-size" id="edje-spinner--edje-round"${this._getBackgroundStyle()}></div>
          </div>
        `;
      }
  };

  _getImage = () => {
    if (this._attributeConfig.type === 'external') {
      return `<img part="edje-spinner--normal-image" src="${this._attributeConfig.path}" alt="external image" />`;
    }
    return globalThis[globalThis.config[this._attributeConfig.type].global];
  }

  _getContainerStyle = () => {
    if (this._attributeConfig.hasOwnProperty('styleContainer') === false) return '';
    return ` style="${this._attributeConfig.styleContainer}"`;
  };

  _getBackgroundStyle = () => {
    if (this._attributeConfig.hasOwnProperty('styleBackground') === false) return '';
    return ` style="${this._attributeConfig.styleBackground}"`;
  };

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
