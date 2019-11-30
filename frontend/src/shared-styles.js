/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      .card {
        margin: 10px;
        padding: 16px;
        color: #757575;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }

      .card-header {
        margin: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .card-header .btn {
        display: grid;
        grid-template-columns: 30px auto;
        align-items: center;
        background-color: #28278d;
        color: white;
        width: 150px;
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
        transition: .5s all;
      }

      .card-header .btn-no-icon {
        display: block !important;
        text-align: center;
      }

      .card-header .card-description {
        display: flex;
        flex-direction: column;
      }

      .card-header .card-description span {
        margin-top: -5px;
        font-size: .8em;
      }

      .card-header .card-description h1 {
        margin: 0;
      }

      .actions {
        display: flex;
      }

      .actions a:first-child {
        margin: 0 20px;
      }

      .actions .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 30px;
        border: 1px solid #ddd;
      }

      .card-header .btn:hover {
        background-color: #0f0e52;
      }

      .btn-cancel {
        background-color: #eee !important;
        color: #333 !important;
      }

      .btn-delete {
        background-color: #e62727 !important;
        color: white !important;
      }

      .card-header .btn .btn-icon {
        justify-self: center;
        font-size: 1.3em;
        margin-left: 10px;
      }

      .card-header .btn .btn-text {
        justify-self: center;
      }

      .circle {
        display: inline-block;
        width: 64px;
        height: 64px;
        text-align: center;
        color: #555;
        border-radius: 50%;
        background: #ddd;
        font-size: 30px;
        line-height: 64px;
      }

      .box {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        margin: 20px 50px;
      }

      .box p {
        margin: 0;
      }

      .error {
        background-color: #f58484;
        border: 1px solid #ff4d4d;
        color: white;
      }

      .success {
        background-color: #b2ff94;
        border: 1px solid #65ff29;
        color: #333;
      }

      .neutral {
        border: 1px solid black;
        color: #333;
      }

      .form {
        margin: 20px 0;
        display: grid;
        grid-gap: 20px;
      }

      .form .chassisId {
        background-color: #e9e9f3;
        border-radius: 5px;
      }

      .form .chassisId p {
        position: absolute;
        transform: translateY(-18px);
      }

      .form .fields {
        padding: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
      }

      h1 {
        margin: 16px 0;
        color: #212121;
        font-size: 22px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
