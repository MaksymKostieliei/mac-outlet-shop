// accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

// modal

const modalElem = document.querySelector('.modal');
const modalContainer = document.querySelector('.innerModal');
modalElem.onclick = () => {
  modalElem.classList.remove('modal_active');
}

class Item {
  constructor(item) {
    Object.assign(this, item);
    this.like = false;
    this.orders = Math.round(Math.random() * 1000);
  }

  get isAvailableForBuy() {
    return this.orderInfo.inStock > 0;
  }

  get absoluteImgPath() {
    return `img/${this.imgUrl}`;
  }

  toggleLike() {
    return this.like = !this.like;
  }

  checkIsNameIncludes(name) {
    const nameAsLowerCase = name.toLowerCase();
    return this.name.toLowerCase().includes(nameAsLowerCase);
  }

  checkIsColorIncludes(colors) {
    // colors ['red', 'blue', 'green']
    // this.color ['red', 'yellow', 'black', 'green']
    if (!colors.length) return true;

    for (const color of colors) {
      const isExists = this.color.includes(color);
      if (isExists) {
        return true;
      }
    }
    return false;
  }

  checkIsStorageIncludes(storages) {
    // storages [256, 512, 1024]
    // this.storage 2048
    if (!storages.length) return true;

    for (const storage of storages) {
      if (this.storage === storage) {
        return true;
      }
    }
    return false;
  }

  checkIsRamIncludes(rams) {
    // storages [256, 512, 1024]
    // this.storage 2048
    if (!rams.length) return true;

    for (const ram of rams) {
      if (this.ram === ram) {
        return true;
      }
    }
    return false;
  }
}

class ItemsModel {
  constructor() {
    // Create Item instances list from items list
    this.items = items.map(item => new Item(item));
  }

  get availableColors() {
    return this.items
      .reduce((acc, item) => [...acc, ...item.color], [])
      .filter((item, index, arr) => arr.indexOf(item) === index);
  }

  get availableStorage() {
    return this.items
      .map(item => item.storage)
      .filter((item, index, arr) => arr.indexOf(item) === index && item !== null);
  }

  get availableRams() {
    return this.items
      .map(item => item.ram)
      .filter((item, index, arr) => arr.indexOf(item) === index && item !== null);
  }

  // Get list with items based on query as substring in item name
  findManyByName(name) {
    const nameAsLowerCase = name.toLowerCase();
    return this.items.filter(item => item.name.toLowerCase().includes(nameAsLowerCase));
  }

  filterItems(filter = {}) {
    const {
      name = '',
      color = [],
      storage = [],
      ram = []
    } = filter;

    return this.items.filter(item => {
      // Check on substring includes in string
      const isNameIncluded = item.checkIsNameIncludes(name);
      if (!isNameIncluded) return false;

      // Check on substring includes in string
      const isColorIncluded = item.checkIsColorIncludes(color);
      if (!isColorIncluded) return false;

      // Check on substring includes in string
      const isStorageIncluded = item.checkIsStorageIncludes(storage);
      if (!isStorageIncluded) return false;

      // Check on substring includes in string
      const isRamIncluded = item.checkIsRamIncludes(ram);
      if (!isRamIncluded) return false;

      return true;
    })
  }
}

class RenderCards {
  // Dependency injection (but it's not true)
  constructor(itemsModel) {
    this.cardsContainer = document.querySelector('.item-list'); // Container element
    this.renderCards(itemsModel.items); // Auto render cards after init page
  }

  static renderCard(item) {
    // Create element
    const cardElem = document.createElement('div');
    cardElem.className = 'item';

    // Add content for card
    cardElem.innerHTML = `
        <button class="btn-like"></button>    
        <img src="${item.absoluteImgPath}" alt="${item.name}" class="item-image">
        <p class="item-name">${item.name}</p>
        <p class="stock-number"><span class="bold-numbers">${item.orderInfo.inStock}</span> left in stock</p>
        <p class="price">Price: <span class="bold-numbers-price">${item.price}</span> $</p>
        <button class="item-btn-add">Add to cart</button>
        <div class="item-footer">
                <div class="reviews-image"><img class="logo-reviews-like" src="img/icons/like_filled.svg"></div>
                <div class="reviews-number">
                    <p class="footer-p-reviews"><span class="bold-numbers">${item.orderInfo.reviews}%</span>Positive reviews</p>
                    <p>Above avarage</p>
                </div>
                <div class="orders-number">
                    <p class="footer-p-orders"><span class="bold-numbers">296</span></p>
                    <p>orders</p>
                </div>
            </div>
      `;

    cardElem.onclick = (e) => {
      modalContainer.innerHTML = `
      <div class="modal-column-1">
        <img src="${item.absoluteImgPath}" alt="${item.name}" class="item-image-modal">
      </div>

      <div class="modal-column-2">
        <p class="item-name-modal">${item.name}</p>
        <div class="item-footer-modal">
          <div class="reviews-image"><img class="logo-reviews-like" src="img/icons/like_filled.svg"></div>
          <div class="reviews-number">
              <p class="footer-p-reviews"><span class="bold-numbers">${item.orderInfo.reviews}%</span>Positive reviews</p>
              <p>Above avarage</p>
          </div>
            <div class="orders-number">
                <p class="footer-p-orders"><span class="bold-numbers">296</span></p>
                <p>orders</p>
            </div>
        </div>
        <p class="characteristic"><span class="characteristic-key">Color: </span><span class="characteristic-value">${item.color}</span></p>
        <p class="characteristic"><span class="characteristic-key">Operating System: </span><span class="characteristic-value">${item.os}</span></p>
        <p class="characteristic"><span class="characteristic-key">Chip: </span><span class="characteristic-value">${item.chip.name}</span></p>
        <p class="characteristic"><span class="characteristic-key">Height: </span><span class="characteristic-value">${item.size.height} cm</span></p>
        <p class="characteristic"><span class="characteristic-key">Width: </span><span class="characteristic-value">${item.size.width} cm</span></p>
        <p class="characteristic"><span class="characteristic-key">Depth: </span><span class="characteristic-value">${item.size.depth} cm</span></p>
        <p class="characteristic"><span class="characteristic-key">Weight: </span><span class="characteristic-value">${item.size.weight} kg</span></p>
      </div>

      <div class="modal-column-3">
        <p class="price-modal">$ ${item.price}</p>
        <p class="stock-number-modal">Stock: <span class="bold-numbers-modal">${item.orderInfo.inStock}</span> pcs.</p>
        <button class="item-btn-add">Add to cart</button>
      </div>
      `
      console.log(item);
      modalElem.classList.add('modal_active');
      cardElem.classList.toggle('active');
    }

    const likeBtn = cardElem.querySelector('.btn-like');

    if (item.like) {
      likeBtn.classList.add('active');
    }

    likeBtn.onclick = () => {
      item.toggleLike();
      likeBtn.classList.toggle('active');
    }

    return cardElem;
  }

  renderCards(items) {
    // Clear container
    this.cardsContainer.innerHTML = '';

    // Cereate elements with cards based on items list
    const elements = items.map(item => RenderCards.renderCard(item));

    // Add elements to container
    this.cardsContainer.append(...elements);
  }
}

const itemsModel = new ItemsModel();
const renderCards = new RenderCards(itemsModel);
