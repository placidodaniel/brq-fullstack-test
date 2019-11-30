import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-ajax/iron-ajax.js'
import '../shared-styles.js';

class DeleteVehicleComponent extends PolymerElement {
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

  handleDeleteResponse() {
    this.message = "Vehicle was deleted with success!"

    setTimeout(() => {
      this.message = ""
    }, 6000)
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

  deleteButton() {
    this.hidden = false
  }

  _confirmDelete() {
    const { _id } = this.response
    this.$.deleteVehicleById.body = { _id }
    this.$.deleteVehicleById.generateRequest()
    this.hidden = true
    this.hasResponse = false
    this.formData = { chassisId: {} }
    this.response = {}
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
          margin: 0 10px;
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

        .delete-layout {
          margin: 15px 0 10px 0;
          justify-content: flex-end;
        }

        .text-confirm {
          margin: 0;
          margin-right: 5px;
          font-size: .9em;
          align-self: center;
        }

        #confirm {
          width: 60%;
        }

        #confirm div {
          display: flex;
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

      <iron-ajax
        id="deleteVehicleById"
        method="delete"
        url="http://localhost:3000/vehicles/delete"
        content-type="application/json"
        handle-as="json"
        on-response="handleDeleteResponse"
        on-error="handleHttpError">
      </iron-ajax>

      <div class="card">
        <div class="card-header">
          <div class="card-description">
            <h1> Delete Vehicle </h1>
            <span> Search and delete a specific vehicle. </span>
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
          <div class="card-header delete-layout" id='deleteBox'>
            <div hidden$="{{hidden}}" id="confirm">
              <div>
                <span class='text-confirm'> Are you sure you want to delete this vehicle? </span>
                <div class='actions'>
                  <a class='btn btn-delete' on-click='_confirmDelete'>
                    <span class='btn-text'> Confirm </span>
                  </a>
                  <a class='btn btn-cancel' href='/list'>
                    <span class='btn-text'> Cancel </span>
                  </a>
                </div>
              </div>
            </div>
            <div class='actions' id='delete' hidden$="{{!hidden}}">
              <a class='btn btn-delete' on-click='deleteButton'>
                <span class='btn-text'> Delete </span>
              </a>
            </div>
          </div>
        </template>
      </div>
    `
  }
}

window.customElements.define('delete-component', DeleteVehicleComponent)