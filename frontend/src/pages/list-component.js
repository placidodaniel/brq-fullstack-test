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
import '@polymer/iron-ajax/iron-ajax.js'

import '../shared-styles.js';

class ListVehiclesComponent extends PolymerElement {
  static get properties() {
    return {
      name: String,
      response: Array
    }
  }

  isEmpty(arr) {
    console.log(arr)
    if (!arr)
      return false

    if (arr.length === 0) {
      return true
    }

    return false
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
          margin: 0 10px;
        }

        .table {
          width: 100%;
          display: grid;
        }

        .header {
          display: grid;
          grid-template-rows: 50px;
          grid-template-columns: repeat(4, 1fr);
          font-weight: bold;
          align-items: center;
          margin: 0 10px;
          border-bottom: 2px solid #eee;
        }

        .header span {
          justify-self: center;
        }

        .row {
          display: grid;
          grid-template-rows: 40px;
          grid-template-columns: repeat(4, 1fr);
          font-size: .8em;
          margin: 0 10px;
          align-items: center;
        }

        .row span {
          justify-self: center;
        }

        .message {
          text-align: center;
          margin: 20px 0;
          font-style: italic;
        }
      </style>
      <div class="card">
        <div class="card-header">
          <div class="card-description">
            <h1> List of Vehicles </h1>
            <span> List of all vehicles registered on database. </span>
          </div>
          <a class='btn' href='/insert'>
            <span class='btn-icon'> + </span>
            <span class='btn-text'> New Vehicle </span>
          </a>
        </div>
        <template is="dom-if" if="{{response}}">
          <div class="table">
            <div class="header">
              <span> ChassisID </span>
              <span> Type </span>
              <span> Passengers </span>
              <span> Color </span>
            </div>
            <template is="dom-if" if="{{isEmpty(response)}}">
              <p class="message"> No recordings to display! </p>
            </template>
            <dom-repeat items="[[response]]">
              <template>
                <div class="row">
                  <span> {{item.chassisId.series}}-{{item.chassisId.number}} </span>
                  <span> {{item.type}} </span>
                  <span> {{item.passengers}} </span>
                  <span> {{item.color}} </span>
                </div>
              </template>
            </dom-repeat>
          </div>
        </template>
      </div>`
  }
}

window.customElements.define('list-component', ListVehiclesComponent);
