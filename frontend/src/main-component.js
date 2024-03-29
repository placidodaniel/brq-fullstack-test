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
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './page-icons.js';

import '@polymer/iron-ajax/iron-ajax.js'

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MainComponent extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #777;
          --app-secondary-color: black;
          --app-drawer-width: 300px;
          --app-drawer-scrim-background: rgba(0, 0, 0, 0.5);

          display: block;
        }


        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-drawer {
          margin: 10px 0;
        }

        app-drawer app-toolbar {
          height: 15%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        app-drawer app-toolbar img {
          height: 70px;
          width: 70px;
        }

        .drawer-logo * {
          margin: 0;
          margin-left: 15px;
        }

        .drawer-logo span {
          opacity: 0.5;
        }

        .drawer-break {
          margin: 0 20px;
          text-align: center;
          opacity: .2;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
          background
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>
            <img src='images/favicon.ico' alt='Volvo Logo'>
            <div class='drawer-logo'>
              <h3> Fleet </h3>
              <span> Management </span>
            </div>
          </app-toolbar>
          <hr class="drawer-break">
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a name="list" href="[[rootPath]]list"> LIST </a>
            <a name="list" href="[[rootPath]]insert"> INSERT </a>
            <a name="list" href="[[rootPath]]edit"> EDIT </a>
            <a name="list" href="[[rootPath]]delete"> DELETE </a>
            <a name="search" href="[[rootPath]]search"> SEARCH </a>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">
          <app-header slot="header" condenses="" reveals="" effects="waterfall">
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
          </app-header>
          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <list-component name="list" response="{{response}}"></list-component>
            <search-component name="search"></search-component>
            <insert-component name="insert"></insert-component>
            <edit-component name="edit"></edit-component>
            <delete-component name="delete"></delete-component>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>

      <!-- HTTP GET: Get vehicles list and send to <list-component> -->
      <iron-ajax
        auto
        id="getListOfVehicles"
        url="http://localhost:3000/vehicles"
        methtod="get"
        last-response="{{response}}"
        handle-as="json"
        on-response="handleResponse">
      </iron-ajax>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object,
      response: Array,
      firstRequest: Boolean
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  getPathList() {
    return ['list', 'search', 'insert', 'edit', 'delete']
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'list' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'list';
    } else if (this.getPathList().indexOf(page) !== -1) {
      if (page === 'list') {
          this.$.getListOfVehicles.generateRequest()
      }
      this.page = page;
    }
    else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    this.getPathList().includes(page) ?
      import(`./pages/${page}-component.js`) : import('./pages/404-component.js')
  }

  // Handle the HTTP call to get the list of vehicles
  handleResponse(event) {
    this.response = event.detail.response
  }
}

window.customElements.define('main-component', MainComponent);
