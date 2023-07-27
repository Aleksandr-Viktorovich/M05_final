import {controlLogin} from './controlElements.js';
import {createModal} from './createElements.js';

{
  const init = (selectorApp) => {
    const app = document.querySelector(selectorApp);
    app.className = `app-container vh-100 w-100 d-flex align-items-center justify-content-center flex-column`;
    const modalLogin = createModal();
    app.append(modalLogin);
    controlLogin(app, modalLogin);
  };

  window.todoListInit = init;
}
