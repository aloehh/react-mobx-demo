import ReactDOM from "react-dom";
import promiseFinally from "promise.prototype.finally";
import React from "react";
import { HashRouter } from "react-router-dom";
import { useStrict } from "mobx";
import { Provider } from "mobx-react";

import App from "./app/app";

// import articlesStores from "./stores/articlesStore";
import articlesStore from "./stores/articlesStore/articlesDomainStore";
import articlesUIStore from "./stores/articlesStore/articlesUIStore";

import commentsStore from "./stores/commentsStore";
import authStore from "./stores/authStore";
import commonStore from "./stores/commonStore";
import editorStore from "./stores/editorStore";
import userStore from "./stores/userStore";
import profileStore from "./stores/profileStore";

// let articlesStore = articlesStores.articlesStore;
// let articlesUIStore = articlesStores.articlesUIStore;
const stores = {
  articlesStore,
  articlesUIStore,
  commentsStore,
  authStore,
  commonStore,
  editorStore,
  userStore,
  profileStore
};

// For easier debugging
window._____APP_STATE_____ = stores;

promiseFinally.shim();
useStrict(true);

ReactDOM.render(
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
