export default class SortableTable {
  constructor(headerConfig = [], { data = [] }) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();

    this.sortableTableBody = this.element.querySelector('.sortable-table__body');
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">

        <div data-element="header" class="sortable-table__header sortable-table__row">
          ${this.createHeader()}
        </div>

        <div data-element="body" class="sortable-table__body">
          ${this.createProducts()}
        </div>

        <div data-element="loading" class="loading-line sortable-table__loading-line"></div>

        <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
          <div>
            <p>No products satisfies your filter criteria</p>
            <button type="button" class="button-primary-outline">Reset all filters</button>
          </div>
        </div>

      </div>
    </div>
    `;

    this.element = element.firstElementChild;
  }

  createHeader() {
    return this.headerConfig
      .map((item) => {
        return `
          <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
            <span>${item.title}</span>
          </div>
        `;
      })
      .join('');
  }

  createProducts() {
    return this.data
      .map((item) => {
        return `
              <a href="/products/${item.id}" class="sortable-table__row">
              <div class="sortable-table__cell">
                <img class="sortable-table-image" alt="Image" src="${item.url}">
              </div>
              <div class="sortable-table__cell">${item.title}</div>
              <div class="sortable-table__cell">${item.price}</div>
              <div class="sortable-table__cell">${item.sales}</div>
            </a>
            `;
      })
      .join('');
  }

  sort(fieldValue, orderValue) {
    this.sortableTableBody.innerHTML = '';

    this.data.sort((strA, strB) => this.compareStr(strA[fieldValue], strB[fieldValue], orderValue));
    this.sortableTableBody.insertAdjacentHTML('beforeend', this.createProducts(this.data));
    this.subElements = this.getSubElements(this.element);
  }

  compareStr(strA, strB, param) {
    const a = strA.toString();
    const b = strB.toString();
    return param === 'asc'
      ? a.localeCompare(b, 'ru-en', { caseFirst: 'upper' })
      : b.localeCompare(a, 'ru-en', { caseFirst: 'upper' });
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    return result;
  }

  remove() {
    this.destroy();
  }

  destroy() {
    this.sortableTableBody.remove();
  }
}
