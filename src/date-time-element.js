import { LitElement, html, css } from 'lit';
import '@material/mwc-tab-bar';
import '@material/mwc-tab';
import { DateTime } from 'luxon';
import '@material/web/button/outlined-button.js';

export class DateTimeElement extends LitElement {
  static styles = [
    css`
    .blue-button {
      color: white;
      background-color: blue;
    }
  
    .blue-button:disabled {
      background-color: grey;
    }
  
    ul {
      list-style-type: none;
      padding: 0;
    }
  
    svg {
      fill: #686869;
    }
  
    .star-filled-icon {
      fill: #00668c;
    }
  
    .btn-1 {
      border-radius: 28px;
      height: 40px;
      border: none;
      font-family: 'Roboto';
      padding: 0 24px 0;
    }
  
    md-checkbox {
      margin-right: 10px;
    }
  
    md-radio {
      margin: 10px;
    }
  
      .date-input {
        width: 232px;
        height: 26px;
        border-radius: 4px 4px 0 0;
        border-bottom-color: rgba(0, 0, 0, 0.87);
        border-bottom-style: inset;
        border-width: 0 0 1px;
        box-sizing: border-box;
        outline: none;
        border-color: rgba(0, 0, 0, 0.42);
        background-color: var(--background-color);
      }
    `,
  ];

  static properties = {
    value: {
      type: String,
    },
    displayDate: {
      type: String,
    },
    displayYear: {
      attribute: 'display-year',
      type: Boolean,
    },
  };

  constructor() {
    super();
    this.displayYear = false;
  }

  render() {
    return html`
      <label for="date">
        <input
          id="date"
          required
          @change="${this._setDateFromPicker}"
          hidden
          class="date-input"
          type="date"
          value="${this.value}">
        </input>

        <md-outlined-button
          @click=${this._openPicker}
          class="date-btn">
          ${this.displayDate}
        </md-outlined-button>
      </label>
    `;
  }

  set value(value) {
    console.log(value);
    this._value = this._setNewDate(value);
  }

  get value() {
    return this._value;
  }

  _setNewDate(val) {
    const oldValue = val;
    const dateObj = DateTime.fromISO(val);

    const { weekdayShort, monthShort, day, year } = dateObj;

    if (this.displayYear) {
      this.displayDate = `${weekdayShort}, ${monthShort} ${day} ${year}`;
    } else {
      this.displayDate = `${weekdayShort}, ${monthShort} ${day}`;
    }
    this.requestUpdate('value', oldValue);
  }

  _dispatchDateChange(data) {
    const opts = {
      bubbles: true,
      detail: {
        data: data,
      },
    };

    this.dispatchEvent(new CustomEvent('date-change', opts));
  }

  _setDateFromPicker(e) {
    const { value } = e.composedPath()[0];
    if (!value) {
      return;
    } // not sure if I need this
    this._setNewDate(value);
    const timestamp = value;
    const data = {
      timestamp,
    };
    this._dispatchDateChange({ ...data });
  }

  _openPicker() {
    const el = this.renderRoot.querySelector('.date-input');
    el.showPicker();
  }

  updated() {}
}

window.customElements.define('date-time-element', DateTimeElement);
