class ComponentList {

  constructor() {
    this.toppings = [
      {ruName: 'Приправа', enName: 'topping-1', cost: 15, cal: 0},
      {ruName: 'Майонез', enName: 'topping-2', cost: 20, cal: 5},
      {ruName: 'Кетчуп', enName: 'topping-3', cost: 17, cal: 8}
    ];

    this.sizes = [
      {ruName: 'Большой', enName: 'size-big', cost: 100, cal: 40},
      {ruName: 'Маленький', enName: 'size-small', cost: 50, cal: 20}
    ];

    this.filles = [
      {ruName: 'С сыром', enName: 'fill-cheese', cost: 10, cal: 20},
      {ruName: 'С салатом', enName: 'fill-salad', cost: 20, cal: 5},
      {ruName: 'С картошкой', enName: 'fill-potato', cost: 15, cal: 10}
    ];

    this._createDOMForBurger();
  }

  _createDOMForBurger() {
    const sizeSelect = document.getElementById('size');
    const sizeSelectHTML = this.sizes.reduce((sum, item) => {
      return `${sum} <option value="${item.enName}">${item.ruName}</option>`;
    }, '');
    sizeSelect.innerHTML = sizeSelectHTML;
    sizeSelect.firstElementChild.checked = true;

    const fillSelect = document.getElementById('fill');
    const fillSelectHTML = this.filles.reduce((sum, item) => {
      return `${sum} <option value="${item.enName}">${item.ruName}</option>`;
    }, '');
    fillSelect.innerHTML = fillSelectHTML;
    fillSelect.firstElementChild.checked = true;

    const toppingSelect = document.getElementById('toppings');
    const toppingSelectHTML = this.toppings.reduce((sum, item) => {
      let res = `<div class="form-check">
							   <input class="form-check-input" type="checkbox" id="${item.enName}">
							   <label class="form-check-label" for="${item.enName}">${item.ruName}</label>
						     </div>`;
      return sum + res;
    }, '');
    toppingSelect.innerHTML = toppingSelectHTML;
  }
}

class Burger {
  constructor(componentList) {
    this.size = '';
    this.fill = '';
    this.toppings = [];
    this.componentList = componentList;
  }

  _calcParam() {
    let result = {cost: 0, cal: 0};
    this.componentList.sizes.forEach(el => {
      if (el.enName === this.size) {
        result.cost += el.cost;
        result.cal += el.cal;
      }
    });
    this.componentList.filles.forEach(el => {
      if (el.enName === this.fill) {
        result.cost += el.cost;
        result.cal += el.cal;
      }
    });
    this.componentList.toppings.forEach(el => {
      this.toppings.forEach(item => {
        if (el.enName === item) {
          result.cost += el.cost;
          result.cal += el.cal;
        }
      })

    });
    return result;
  }

  _screen() {
    const myBurger = this._calcParam();
    document.getElementById('burger-cost').innerHTML = myBurger.cost;
    document.getElementById('burger-cal').innerHTML = myBurger.cal;
  }

  setDataFromDOM() {
    this.size = document.getElementById('size').value;
    this.fill = document.getElementById('fill').value;

    let inputTop = [];
    const toppingForm = document.getElementById('toppings');
    const toppingInputs = toppingForm.querySelectorAll('.form-check-input');

    toppingInputs.forEach(el => {
      if (el.checked) inputTop.push(el.id);
    });
    this.toppings = inputTop;
    this._screen();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const componentList = new ComponentList();
  const burger = new Burger(componentList);
  burger.setDataFromDOM();
  document.addEventListener('input', () => {
    burger.setDataFromDOM();
  });
});