export const createHeader = (name) => {
  const title = document.createElement('h2');
  title.textContent = `Список дел - ${name}`;
  return title;
};

export const createModal = () => {
  const warningElement = document.createElement('div');
  warningElement.className = 'modal show d-flex bg-secondary bg-opacity-50';
  warningElement.tabIndex = '-10';
  warningElement.insertAdjacentHTML('beforeend', `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header d-block">
          <h5 class="modal-title text-center">Добро пожаловать!</h5>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="form-label" for="login" >Введите свое имя для авторизации!</label>
              <input class="form-control" id="login" name="login">
            </div>
            <button class="btn btn-primary" type="submit" name='btn'>Отправить</button>
          </form>
        </div>
      </div>
    </div>
  `);
  return warningElement;
};

const createBtn = (listClasses, title, typeName = '', option = false) => {
  const btn = document.createElement('button');
  btn.className = listClasses;
  btn.textContent = title;
  btn.type = typeName;
  btn.disabled = option;
  return btn;
};

export const createForm = () => {
  const form = document.createElement('form');
  form.className = `d-flex align-items-center mb-3`;

  const label = document.createElement('label');
  label.className = `form-group me-3 mb-0`;

  const input = document.createElement('input');
  input.className = `form-control`;
  input.placeholder = 'ввести задачу';
  input.type = 'text';
  input.name = 'title';

  label.append(input);

  const selectElement = document.createElement('select');
  selectElement.className = `form-select me-3 w-auto`;
  selectElement.name = 'select';
  selectElement.innerHTML = `
    <option selected value="table-light">Обыкновенная</option>
    <option class="text-warning" value="table-warning">Важная</option>
    <option class="text-danger" value="table-danger">Срочная</option>
  `;

  const btnReset = createBtn(`btn btn-warning`, 'Очистить', 'reset', true);
  const btnSubmit = createBtn(`btn btn-primary me-3`, 'Сохранить', 'submit', true);

  form.append(label, selectElement, btnSubmit, btnReset);

  return {
    form,
    label,
    btnSubmit,
    btnReset,
    selectElement,
  };
};

export const createWrapper = () => {
  const wrapper = document.createElement('div');
  wrapper.className = `table-wrapper`;
  return wrapper;
};

export const createTable = () => {
  const table = document.createElement('table');
  table.className = `table table-hover table-bordered`;

  const thead = document.createElement('thead');
  table.thead = thead;
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
  `);

  const tbody = document.createElement('tbody');
  table.tbody = tbody;

  table.append(thead, tbody);
  return table;
};

export const createRow = ({id, title, completed, important}) => {
  const tr = document.createElement('tr');
  tr.className = completed ? `table-success` : `${important}`;
  tr.id = id;

  const tdNumber = document.createElement('td');
  tdNumber.className = 'number';

  const tdTitle = document.createElement('td');
  tdTitle.className = completed ? 'task text-decoration-line-through' : 'task';
  tdTitle.textContent = title;

  const tdCompleted = document.createElement('td');
  tdCompleted.className = 'complete';
  tdCompleted.textContent = completed ? 'Выполнена' : 'В процессе';

  const tdBtnWrapper = document.createElement('td');

  const btnRemove = createBtn('btn btn-danger me-2', 'Удалить');

  const btnCompleted = createBtn('btn btn-success me-2');
  btnCompleted.textContent = completed ? 'Начать' : 'Завершить';

  const btnEdit = createBtn('btn btn-warning', 'Редактировать');
  btnEdit.disabled = completed ? true : '';

  tdBtnWrapper.append(btnRemove, btnCompleted, btnEdit);
  tr.append(tdNumber, tdTitle, tdCompleted, tdBtnWrapper);

  return tr;
};
