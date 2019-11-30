import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class InsertNewVehicleComponent extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
          margin: 0 10px;
        }

        .actions {
          display: flex;
        }

        .actions a:first-child {
          margin-right: 20px;
        }
      </style>
      <div class="card">
        <div class="card-header">
          <div class="card-description">
            <h1> New Vehicle </h1>
            <span> Insert a new vehicle on database </span>
          </div>
          <div class='actions'>
            <a class='btn btn-cancel' href='/list'>
              <span class='btn-text'> Cancel </span>
            </a>
            <a class='btn' href='/insert'>
              <span class='btn-text'> Insert </span>
            </a>
          </div>
        </div>
      </div>
    `
  }
}

window.customElements.define('insert-component', InsertNewVehicleComponent)