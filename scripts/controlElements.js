import {
  createRow,
} from './createElements.js';
import randomId from './option.js';
import {
  renderItem,
  renderList,
  renderNumber,
} from './render.js';
import {
  getStorage,
  removeItemStorage,
  setStorage,
  successItemStorage,
} from './serviceStorage.js';

export const addItemList = (newItem, data, name) => {
  data.push(newItem);
  setStorage(name, data);
};

export const addItemPage = (newItem, list) => {
  list.append(createRow(newItem));
};

export const controlBtn = (form) => {
  const input = form.title;
  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      form.querySelectorAll('.btn').forEach(item => item.disabled = false);
    }
  });

  input.addEventListener('blur', () => {
    if (input.value.trim() === '') {
      form.querySelectorAll('.btn').forEach(item => item.disabled = true);
    }
  });
};

export const formControl = (form, list, name) => {
  form.addEventListener('reset', () => {
    form.querySelectorAll('.btn').forEach(item => item.disabled = true);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (form.title.value.trim() === '') return;
    const data = getStorage(name);
    const newItem = {
      id: randomId(),
      title: form.title.value,
      completed: false,
      important: form.select.value,
    };
    addItemList(newItem, data, name);
    addItemPage(newItem, list);
    renderNumber(list);
    form.reset();
    form.querySelectorAll('.btn').forEach(item => item.disabled = true);
  });
};


export const controlItem = (list, name) => {
  const btnRemove = (name, item, list) => {
    if (confirm('Вы точно хотите удалить элемент?')) {
      removeItemStorage(name, item.id);
      item.remove();
      renderNumber(list);
    }
  };

  const btnSuccess = (name, item) => {
    const data = getStorage(name);
    const btnFix = item.querySelector('.btn-warning');
    const btnSuccess = item.querySelector('.btn-success');
    console.log(btnSuccess.textContent);
    item.classList.toggle('table-success');
    item.classList.toggle(`${data.find(elem => elem.id === item.id).important}`);
    item.querySelector('.task').classList.toggle('text-decoration-line-through');
    btnFix.disabled ? btnFix.disabled = false : btnFix.disabled = true;
    const itemCompleted = item.querySelector('.complete');
    itemCompleted.textContent === 'В процессе' ?
      itemCompleted.textContent = 'Выполнена' :
      itemCompleted.textContent = 'В процессе';
    btnSuccess.textContent === 'Завершить' ?
      btnSuccess.textContent = 'Начать' :
      btnSuccess.textContent = 'Завершить';
    successItemStorage(name, item.id);
  };

  const btnFix = (btn, tdInput) => {
    btn.forEach(item => item.disabled = true);
    tdInput.innerHTML = `
      <div class="input-group">
        <input type="text" class="form-control edit" value=${tdInput.textContent}>
        <button class="input-group-text btn btn-primary">Принять</button>
      </div>
      `;
  };

  const btnAccept = (btn, tdInput) => {
    const inputEdit = tdInput.querySelector('.edit').value;
    if (inputEdit.trim() === '') return;
    tdInput.innerHTML = inputEdit;
    btn.forEach(item => item.disabled = false);
  };

  list.addEventListener('click', (event) => {
    const target = event.target;
    const item = target.closest('tr');
    const tdInput = item.querySelector('.task');
    const btn = item.querySelectorAll('.btn');

    if (target.classList.contains('btn-danger')) {
      btnRemove(name, item, list);
    }

    if (target.classList.contains('btn-success')) {
      btnSuccess(name, item);
    }

    if (target.classList.contains('btn-warning')) {
      btnFix(btn, tdInput);
    }

    if (target.classList.contains('btn-primary')) {
      btnAccept(btn, tdInput);
    }
  });
};

export const controlLogin = (app, modalLogin) => {
  const formLogin = modalLogin.querySelector('form');
  const inputLogin = formLogin.login;
  formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = inputLogin.value.trim();
    if (name === '') return;
    const {
      form,
      list,
    } = renderList(app, name);

    controlItem(list, name);
    formControl(form, list, name);
    controlBtn(form);
    renderItem(list, name);
    renderNumber(list);
    formLogin.reset();
    modalLogin.className = `modal fade d-none`;
  });
};
