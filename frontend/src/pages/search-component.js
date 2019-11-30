/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-ajax/iron-ajax.js'
import '../shared-styles.js';

class SearchComponent extends PolymerElement {
  static get properties() {
    return {
      formData: {
        type: Object,
        value: {
          chassisId: {}
        }
      },
      message: {
        type: String
      },
      hidden: {
        type: Boolean,
        value: true
      },
      response: {
        type: Object,
        value: {}
      },
      hasResponse: {
        type: Boolean,
        value: false
      }
    }
  }

  _setPayload() {
    this.$.findVehicleByChassisId.body = this.formData
  }

  findVehicle() {
    this._setPayload()
    this.$.findVehicleByChassisId.generateRequest()
  }

  handleHttpResponse(event) {
    const { message } = event.detail.response
    if (message) {
      this.message = message
    }
    else {
      this.response = event.detail.response
    }

    setTimeout(() => {
      this.message = ""
    }, 6000)

    this.hasResponse = true
    this.formData = { chassisId: {} } // Reset form
  }

  handleHttpError(event) {
    const { error } = event.detail.request.xhr.response
    this.success = ""
    this.message = error || event.detail.request.xhr.response

    setTimeout(() => {
      this.message = ""
    }, 6000)

    this.hasResponse = false
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }

        [hidden] {
          display: none;
        }

        .vehicle-info {
          border-radius: 10px;
          background-color: #eee;
          color: #333;
        }

        .vehicle-info .container div {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 50px;
          grid-gap: 10px;
          align-items: center;
        }
        .vehicle-info .container p {
          font-weight: bold;
          display: flex;
          justify-content: flex-end;
          margin: 0;
        }
      </style>

      <iron-ajax
        id="findVehicleByChassisId"
        method="post"
        url="http://localhost:3000/vehicles/find"
        content-type="application/json"
        handle-as="json"
        on-response="handleHttpResponse"
        on-error="handleHttpError">
      </iron-ajax>

      <div class="card">
        <div class="card-header">
          <div class="card-description">
            <h1> Find Vehicle </h1>
            <span> Display informations about a specific vehicle </span>
          </div>
          <a class='btn btn-no-icon' on-click='findVehicle'>
            <span class='btn-text'> Search </span>
          </a>
        </div>

        <template is="dom-if" if="[[message]]">
          <div class="box neutral">
            <p> [[message]] </p>
          </div>
        </template>

        <div class='form'>
          <div class='fields chassisId'>
            <p> Search Vehicle by ChassisID </p>
            <iron-input slot='input' bind-value='{{formData.chassisId.series}}'>
              <paper-input id='series' type='text' value='{{formData.chassisId.series}}' placeholder='Series'>
            </iron-input>
            <iron-input slot='input' bind-value='{{formData.chassisId.number}}'>
              <paper-input id='number' type='text' value='{{formData.chassisId.number}}' placeholder='number'>
            </iron-input>
          </div>
        </div>
        <template is='dom-if' if='{{hasResponse}}'>
          <h1> Entry #{{response._id}} </h1>
          <div class='vehicle-info'>
            <div class='container'>
                <div>
                  <p> ChassisID: </p>
                  <span> {{response.chassisId.series}}-{{response.chassisId.number}} </span>
                </div>
                <div>
                  <p> Type: </p>
                  <span> {{response.type}} </span>
                </div>
                <div>
                  <p> Passengers: </p>
                  <span> {{response.passengers}} </span>
                </div>
                <div>
                  <p> Color: </p>
                  <span> {{response.color}} </span>
                </div>
            </div>
          </div>
        </template>
      </div>
    `;
  }
}

window.customElements.define('search-component', SearchComponent);
