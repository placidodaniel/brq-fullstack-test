import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-ajax/iron-ajax.js'
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '../shared-styles.js';

class InsertNewVehicleComponent extends PolymerElement {
  static get properties() {
    return {
      formData: {
        type: Object,
        value: {
          chassisId: {
            type: Object,
            value: {}
          }
        }
      },
      error: {
        type: String
      },
      response: {
        type: Object
      },
      success: {
        type: Boolean
      }
    }
  }

  _setPayload() {
    this.$.insertNewVehicle.body = this.formData
  }

  postVehicle() {
    this._setPayload()
    this.$.insertNewVehicle.generateRequest()
  }

  handleHttpResponse(event) {
    this.response  = event.detail.response
    this.formData = { chassisId: {} } // Reset form
    this.error = ""
    this.success = `Success! New Vehicle Added to Database: ${this.response.chassisId.series}-${this.response.chassisId.number}!`

    setTimeout(() => {
      this.success = ""
    }, 2000)
  }

  handleHttpError(event) {
    const { error } = event.detail.request.xhr.response
    this.success = ""
    this.error = error || event.detail.request.xhr.response

    setTimeout(() => {
      this.error = ""
    }, 6000)
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
          margin: 0 10px;
        }

        paper-dropdown-menu {
          width: 100%;
        }
      </style>

      <iron-ajax
        id="insertNewVehicle"
        method="post"
        url="http://localhost:3000/vehicles"
        content-type="application/json"
        handle-as="json"
        on-response="handleHttpResponse"
        on-error="handleHttpError">
      </iron-ajax>

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
            <a class='btn' on-click='postVehicle'>
              <span class='btn-text'> Insert </span>
            </a>
          </div>
        </div>

        <template is="dom-if" if="[[error]]">
          <div class="box error">
            <p> [[error]] </p>
          </div>
        </template>

        <template is="dom-if" if="[[success]]">
          <div class="box success">
            <p> [[success]] </p>
          </div>
        </template>

        <div class='form'>
          <div class='fields chassisId'>
            <p> ChassisID </p>
            <iron-input slot='input' bind-value='{{formData.chassisId.series}}'>
              <paper-input id='series' type='text' value='{{formData.chassisId.series}}' placeholder='Series'>
            </iron-input>
            <iron-input slot='input' bind-value='{{formData.chassisId.number}}'>
              <paper-input id='number' type='text' value='{{formData.chassisId.number}}' placeholder='number'>
            </iron-input>
          </div>
          <div class='fields'>
            <iron-input slot='input' bind-value='{{formData.type}}'>
              <paper-dropdown-menu label="Type" id='color' value='{{formData.type}}'>
                <paper-listbox slot="dropdown-content" class="dropdown-content">
                  <paper-item value="CAR"> CAR </paper-item>
                  <paper-item value="TRUCK"> TRUCK </paper-item>
                  <paper-item value="BUS"> BUS </paper-item>
                </paper-listbox>
              </paper-dropdown-menu>
            </iron-input>
            <iron-input slot='input' bind-value='{{formData.color}}'>
              <paper-input id='color' type='text' value='{{formData.color}}' placeholder='Color'>
            </iron-input>
          </div>
        </div>
      </div>
    `
  }
}

window.customElements.define('insert-component', InsertNewVehicleComponent)