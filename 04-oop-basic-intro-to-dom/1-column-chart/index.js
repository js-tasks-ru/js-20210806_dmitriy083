export default class ColumnChart {
  constructor(objData) {
    this.objData = objData;
    this.chartHeight = 50;
    this.setMaxValScale();
    this.render();
  }

  // FIXME: Если не учитывать существующие проблемы в коде, вижу глобальную проблему смешивание данных и представления при таком подходе

  /**
   * Создаем основной темплейт
   */
  render() {
    const element = document.createElement('div');
    element.innerHTML = `
      <div class="column-chart column-chart_loading" style="--chart-height: 50">
        <div class="column-chart__title">
          Total ${this.createLabel()}
          ${this.createLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${this.createFormatHeading()}</div>
          <div data-element="body" class="column-chart__chart">
              ${this.createColumns()}
          </div>
        </div>
    </div>
    `;

    this.element = element.firstElementChild;

    this.removeLoadClass();
  }

  /**
   * Создаем колонки. Если данные есть - создаем колонки, если нет - вставляем svg заглушку
   * @returns {string}
   */
  createColumns() {
    if (this.objData && this.objData.hasOwnProperty('data')) {
      const columnsDataArr = this.objData.data;
      if (columnsDataArr.length) {
        const dataArr = this.objData.data;
        let strTemplate = '';
        dataArr.forEach((item) => {
          strTemplate += this.getTmpColumn(item);
        });
        return strTemplate;
      } else {
        return `
          <img src="./charts-skeleton.svg" style="z-index: 10">
        `;
      }
    }
  }

  /**
   * Создаем ссылку, если есть
   * @returns {string|string}
   */
  createLink() {
    if (this.objData) {
      return this.objData.hasOwnProperty('link')
        ? `<a href="${this.objData.link}" class="column-chart__link">View all</a>`
        : '';
    }
  }

  /**
   * Создаем цифру для header, если передана функция - задаем с ее помощью формат
   * @returns {string|number}
   */
  createFormatHeading() {
    if (this.objData && this.objData.hasOwnProperty('value')) {
      const value = this.objData.value;

      return this.objData.hasOwnProperty('formatHeading')
        ? `${this.objData.formatHeading(value)}`
        : value;
    }
  }

  /**
   * Создаем label
   * @returns {*|string}
   */
  createLabel() {
    if (this.objData) {
      return this.objData.hasOwnProperty('label') ? this.objData.label : '';
    }
  }

  /**
   *
   * @param heightColumn
   * @returns {{percent: string, value: string}}
   */
  getValueColumn(heightColumn) {
    return {
      percent: ((heightColumn / this.maxValue) * 100).toFixed(0) + '%',
      value: String(Math.floor(heightColumn * this.scale)),
    };
  }

  /**
   * Создаем темплейт колонки
   * @param heightColumn - высота колонки
   * @returns {string}
   */
  getTmpColumn(heightColumn) {
    return `<div style=" --value: ${this.getValueColumn(heightColumn).value}" data-tooltip="${
      this.getValueColumn(heightColumn).percent
    }"></div>`;
  }

  /**
   * Тут обновляем высоту колонок?
   * @param {array} data - входной массив данных для колонок?
   */
  update(data) {
    const columnChartChart = this.element.querySelector('.column-chart__chart');
    if (columnChartChart.children.length) {
      data.forEach((heightColumn) => {
        columnChartChart.children.style = `--value: ${this.getValueColumn(heightColumn).value}`;
        columnChartChart.children.style = `data-tooltip = ${
          this.getValueColumn(heightColumn).percent
        }`;
      });
    }
  }

  /**
   * Устанавливаем this.maxValue и this.scale для расчета колонок
   */
  setMaxValScale() {
    if (this.objData && this.objData.hasOwnProperty('data')) {
      this.maxValue = Math.max(...this.objData.data);
      this.scale = this.chartHeight / this.maxValue;
    }
  }

  /**
   * Проверяем есть ли данные для постоения колонок, если есть - удаляем column-chart_loading
   */
  removeLoadClass() {
    if (this.objData && this.objData.hasOwnProperty('data')) {
      if (this.objData.data.length) {
        this.element.classList.remove('column-chart_loading');
      }
    }
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
