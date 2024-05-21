
class EdjeSpinner extends HTMLElement {
  rendered = false;

  active = false;
  debug = false;

  attributeConfig = {
    display: 'normal',
    type: 'eddie',
    size: 'normal',
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
          <div id="edje-spinner-container">
            <div id="edje-spinner" class="loading">
              ${this._getImage()}
            </div>
          </div>  
        `;
      case 'round':
        return `
          <div id="edje-spinner-container">
            <div id="edje-spinner" class="background">
              ${this._getImage().replace('normal-image', 'round-image')}
            </div>
            <div id="edje-round" class="round"></div>
          </div>
        `;
      }
  };

  _getImage = () => globalThis[globalThis.config[this.attributeConfig.type].global];

  _renderStyle() {
    return `
    <style>
      #edje-spinner-container {
        background-color: rgba(0, 0, 0, 0.1);
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
        max-height: 450px;
        max-width: 450px;
        height: 450px;
      }
      .round-image {
        max-height: 250px;
        max-width: 250px;
        height: 450px;
      }

      #edje-spinner.loading {
        animation: 4s linear infinite edje-spinner-keyframes;
      }
      #edje-spinner.background {
        z-index: 1;
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

      .round,
      .round::after {
        border-radius: 50%;
        width: 400px;
        height: 400px;
      }
      .round {
        background-color: rgba(255, 255, 255, 0.5);
        position: absolute;
        font-size: 10px;
        text-indent: -9999em;
        border-top: 1.1em solid rgba(255, 255, 255, 0.2);
        border-right: 1.1em solid #97C93F;
        border-bottom: 1.1em solid #97C93F;
        border-left: 1.1em solid #97C93F;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: load-round 2s infinite linear;
        animation: load-round 2s infinite linear;
      }

      @-webkit-keyframes load-round {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }

      @keyframes load-round {
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
