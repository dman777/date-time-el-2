import { LitElement, html, css } from 'lit-element';
import('./date-time-element');
import { DateTime } from 'luxon';

class MyElement extends LitElement {
  static get properties() {
    return {
      name: String,
      timestamp: {
        type: String,
      },
    };
  }

  static styles = css`
    :host {
      font-family: Arial, 'sans serif';
    }
    h1 {
      color: #8af;
    }
    .container {
      padding: 100px;
      margin-top: 100px;
    }
  `;

  constructor() {
    super();
    this.timestamp = DateTime.now().toISO().slice(0, 10);
  }

  render() {
    const foo = html`
    <div class="container">
      <date-time-element
        @date-change=${this.setNewDate}
        required
        .value=${this.timestamp}
      ></date-time-element>
    </div>
    `;

    return foo;
  }
  setNewDate(e) {
    const { timestamp } = e.detail.data;
    this.timestamp = timestamp;
  }
}
customElements.define('my-element', MyElement);
