import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-ajax/iron-ajax.js'
import '../shared-styles.js';

class EditVehicleComponent extends PolymerElement {
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
      success: {
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

  updateVehicle() {
    const { _id, color } = this.response

    this.$.updateVehicle.body = {
      _id,
      color: color
    }
    this.$.updateVehicle.generateRequest()
    this.success = "Vehicle has been updated!"

    setTimeout(() => {
      this.success = ""
    }, 6000)
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
    this.formData = { chassisId: {} }
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

        .update-layout {
          justify-content: flex-end;
          margin-top: 10px;
        }

        #update a {
          margin: 0;
        }

        #color {
          width: 50%;
          margin-top: -23px;
        }

        #color .floated-label-placeholder {
          display: none;
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
        id="updateVehicle"
        method="put"
        url="http://localhost:3000/vehicles/update"
        content-type="application/json"
        handle-as="json"
        on-response="handleHttpResponse"
        on-error="handleHttpError">
      </iron-ajax>

      <div class="card">
        <div class="card-header">
          <div class="card-description">
            <h1> Edit Vehicle </h1>
            <span> Search and edit a specific vehicle. Only color is editable. </span>
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
        <template is="dom-if" if="[[success]]">
          <div class="box success">
            <p> [[success]] </p>
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
                <iron-input slot='input' bind-value='{{response.color}}'>
                  <paper-input id='color' type='text' value='{{response.color}}'>
                </iron-input>
              </div>
            </div>
          </div>
          <div class="card-header update-layout" id='updateBox'>
            <div class='actions' id='update'>
              <a class='btn btn-cancel' on-click='updateVehicle'>
                <span class='btn-text'> Update </span>
              </a>
            </div>
          </div>
        </template>
      </div>
    `
  }
}

window.customElements.define('edit-component', EditVehicleComponent)
