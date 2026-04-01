import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <div class="loader"></div>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 3L1 21h22L12 3zm0 5.5c.4 0 .7.3.7.7v5.1c0 .4-.3.7-.7.7s-.7-.3-.7-.7V9.2c0-.4.3-.7.7-.7zm0 9.3a1 1 0 110-2 1 1 0 010 2z"
            ></path>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm-3.5-8a.75.75 0 00-1.06 1.06A6.2 6.2 0 0012 17c1.8 0 3.5-.7 4.8-1.94A.75.75 0 0015.74 14 4.7 4.7 0 0112 15.5c-1.4 0-2.7-.55-3.5-1.5zM9 10a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2z"
            ></path>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}