import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class DeleteVehicleComponent extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
          margin: 0 10px;
        }
      </style>
      <div class="card">
        <div class="card-header">
          <div class="card-description">
            <h1> Delete Vehicle </h1>
            <span> Search and delete a specific vehicle. </span>
          </div>
        </div>
      </div>
    `
  }
}

window.customElements.define('delete-component', DeleteVehicleComponent)