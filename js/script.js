const body = document.querySelector('body');
const searchbarBtns = document.querySelectorAll('.searchbar__button');
const filtersBtn = document.querySelector('.searchbar__button_filters');
const settingsBtn = document.querySelector('.searchbar__button_settings');
const filtersPopup = document.querySelector('.filters-popup');
const settingsPopup = document.querySelector('.settings-popup');
const cartBtn = document.querySelector('.cart');
const cartPopup = document.querySelector('.cart-popup');
const productList = document.querySelector('.product-list');
const filtersItemsWrappers = document.querySelectorAll(
  '.filters__items-animation-wrapper'
);
const filtersCategories = document.querySelectorAll('.filters__category');
const filters = document.querySelector('.filters');

body.addEventListener('click', (e) => {
  if (
    !filtersBtn.contains(e.target) &&
    filtersBtn !== e.target &&
    !settingsBtn.contains(e.target) &&
    settingsBtn !== e.target &&
    !filtersPopup.contains(e.target) &&
    filtersPopup !== e.target &&
    !settingsPopup.contains(e.target) &&
    settingsPopup !== e.target
  ) {
    settingsPopup.classList.remove('opened');
    filtersPopup.classList.remove('opened');
  }
});

filtersBtn.addEventListener('click', (e) => {
  settingsPopup.classList.remove('opened');
  filtersPopup.classList.toggle('opened');
});

settingsBtn.addEventListener('click', () => {
  filtersPopup.classList.remove('opened');
  settingsPopup.classList.toggle('opened');
});

cartBtn.addEventListener('click', () => {
  cartPopup.classList.toggle('opened');
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function renderCard(item) {
  const card = document.createElement('div');
  card.innerHTML = `
      <button class="card__favourite product__favourite-button">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          class="product__favourite-icon">
          <path
            d="M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 20.04L10.6541 20.1341C11.4178 20.824 12.5803 20.8218 13.3413 20.129L13.45 20.03C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3ZM12.1 18.55L12 18.65L11.9 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 5.99 11.07 7.36H12.94C13.46 5.99 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55Z"></path>
        </svg>
      </button>
      <div class="product__main-part">
        <img
          class="product__image"
          src=${'img/' + item.imgUrl}
          alt="" />
        <a href="#" class="product__name">${item.name}</a>
        <div class="product__in-stock-info">
          <!-- prettier-ignore -->
          <svg class="product__in-stock-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="9.5" stroke="#1BC943"/>
                <g clip-path="url(#clip0_14_17)">
                <path d="M8.6251 12.1063L6.01885 9.50002L5.13135 10.3813L8.6251 13.875L16.1251 6.37502L15.2438 5.49377L8.6251 12.1063Z" fill="#1BC943"/>
                </g>
                <defs>
                <clipPath id="clip0_14_17">
                <rect width="15" height="15" fill="white" transform="translate(3 2)"/>
                </clipPath>
                </defs>
              </svg>
          <p class="product__in-stock-text">
            <strong class="product__in-stock-amount">${
              item.orderInfo.inStock
            }</strong>
            left in stock
          </p>
        </div>
        <p class="product__price-info">
          Price: <strong class="product__price">${item.price}</strong> $
        </p>
        <button class="button">Add to cart</button>
      </div>
      <div class="product__additional-info">
        <!-- prettier-ignore -->
        <svg class="product__reviews-icon" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.00008 15.7917L7.79175 14.6917C3.50008 10.8 0.666748 8.23333 0.666748 5.08333C0.666748 2.51667 2.68341 0.5 5.25008 0.5C6.70008 0.5 8.09175 1.175 9.00008 2.24167C9.90841 1.175 11.3001 0.5 12.7501 0.5C15.3167 0.5 17.3334 2.51667 17.3334 5.08333C17.3334 8.23333 14.5001 10.8 10.2084 14.7L9.00008 15.7917Z" fill="#F05454"/>
            </svg>
        <div class="product__reviews-info">
          <p class="product__positive-reviews">
            <strong class="product__reviews-percentage">${
              item.orderInfo.reviews + '%'
            }</strong>
            Positive reviews
          </p>
          <p class="product__reviews-average">Above average</p>
        </div>
        <div class="product__orders-info">
          <strong class="product__orders-amount">${getRandomInt(
            0,
            1001
          )}</strong>
          <p class="product__orders-text">orders</p>
        </div>
      </div>
  `;
  const itemId = item.id;
  const addToCartBtn = card.querySelector('.button');
  addToCartBtn.addEventListener('click', () => {
    const storageArr = JSON.parse(localStorage.getItem('cartItems'));
    const cardsWrapper = document.querySelector('.cart-popup__products');
    console.log(storageArr);
    const storageItem = storageArr.find(
      (item) => Number(item.id) === Number(itemId)
    );
    if (storageItem) {
      if (storageItem.amount < 4) {
        storageItem.amount++;
        localStorage.setItem('cartItems', JSON.stringify(storageArr));
        cardsWrapper.innerHTML = '';
        renderCartItems();
      }
    } else {
      storageArr.push({ id: itemId, amount: 1 });
      localStorage.setItem('cartItems', JSON.stringify(storageArr));
      cardsWrapper.innerHTML = '';
      renderCartItems();
    }
  });
  card.classList.add('product');
  productClickHandler(card);
  productList.appendChild(card);
}

items.forEach(renderCard);

filtersCategories.forEach((category) => {
  category.addEventListener('click', (e) => {
    category.classList.toggle('filters__category_opened');
    category.nextElementSibling.classList.toggle(
      'filters__items-animation-wrapper_opened'
    );
  });
});

const products = document.querySelectorAll('.product');
const productPopup = document.querySelector('.product-popup-wrapper');
const productPopupName = productPopup.querySelector('.product-popup__name');
const productPopupPrice = productPopup.querySelector('.product-popup__price');
const productPopupImage = productPopup.querySelector('.product-popup__image');
const productPopupStock = productPopup.querySelector(
  '.product-popup__stock-amount'
);
const productPopupInfo = productPopup.querySelector('.product-popup__info');

function productClickHandler(product) {
  product.querySelector('.button').addEventListener('click', (e) => {
    e.stopPropagation();
  });
  product
    .querySelector('.product__favourite-button')
    .addEventListener('click', (e) => {
      e.stopPropagation();
    });

  product.addEventListener('click', (e) => {
    const productName = product.querySelector('.product__name');
    const productStock = product.querySelector('.product__in-stock-amount');
    const productPrice = product.querySelector('.product__price');
    const productUrl = product
      .querySelector('.product__image')
      .getAttribute('src');
    const productAddInfo = product.querySelector('.product__additional-info');
    const cloneInfo = productAddInfo.cloneNode(true);

    productPopupName.textContent = productName.innerText;
    productPopupPrice.textContent = '$ ' + productPrice.textContent;
    productPopupStock.textContent = productStock.textContent;
    productPopupImage.setAttribute('src', productUrl);

    productPopup.querySelector('.product__additional-info')?.remove();
    productPopup
      .querySelectorAll('.product-popup__characteristic')
      ?.forEach((item) => item.remove());

    cloneInfo.classList.add('product__additional-info_popup');
    productPopupInfo.appendChild(cloneInfo);

    const currArrItem = items.find(
      (item) => item.name === productName.textContent
    );

    const props = {
      'Color': currArrItem.color.join(', '),
      'Operating System': currArrItem.os,
      'Chip': currArrItem.chip.name,
      'Height': currArrItem.size.height,
      'Width': currArrItem.size.width,
      'Depth': currArrItem.size.depth,
      'Weight': currArrItem.size.weight,
    };

    for (let key in props) {
      const characteristic = document.createElement('div');
      characteristic.classList.add('product-popup__characteristic');
      characteristic.innerHTML = `
        <span class="product-popup__characteristic-name">${key}:</span>
        <span class="product-popup__characteristic-value">${props[key]}</span>
      `;
      productPopupInfo.appendChild(characteristic);
    }

    productPopup.classList.add('opened_grid');
    body.style.overflow = 'hidden';
  });
}

productPopup.addEventListener('click', (e) => {
  if (e.target === productPopup) {
    productPopup.classList.remove('opened_grid');
    document.querySelector('body').style.overflow = 'auto';
  }
});

const mobFiltersBtn = document.querySelector('.filters-bar-item_filters-btn');
const mobileFiltersPopup = document.querySelector('.mobile-filters-popup');
const mobileFilters = mobileFiltersPopup.querySelector('.filters');

addEventListener('resize', (event) => {
  if (
    window.innerWidth > 940 &&
    mobileFiltersPopup.classList.contains('mobile-filters-popup_opened')
  ) {
    mobileFiltersPopup.classList.remove('mobile-filters-popup_opened');
    mobileFilters.classList.remove('filters_opened');
    body.style.overflow = 'auto';
  }
});

mobFiltersBtn.addEventListener('click', (e) => {
  mobileFiltersPopup.classList.add('mobile-filters-popup_opened');
  body.style.overflow = 'hidden';
  setTimeout(() => {
    mobileFilters.classList.add('filters_opened');
  }, 0);
});

mobileFiltersPopup.addEventListener('click', (e) => {
  if (e.target === mobileFiltersPopup) {
    mobileFilters.classList.remove('filters_opened');
    setTimeout(() => {
      mobileFiltersPopup.classList.remove('mobile-filters-popup_opened');
      body.style.overflow = 'auto';
    }, 300);
  }
});


const checkboxes = document.querySelectorAll('.filters__checkbox-input');
const filterBtns = document.querySelectorAll('.filters__checkbox');
const filterTextInputs = document.querySelectorAll('.filters__textfield-input');
const searchInput = document.querySelector('.searchbar__input');

const currentFilters = {
  search: '',
  from: 0,
  to: Infinity,
  color: [],
  storage: [],
  os: [],
  displayBetween: [],
};

const newProductsArr = items.map((item) => {
  const res = {
    ...item,
    get displayBetween() {
      if (this.display >= 2 && this.display < 5) {
        return '2-5';
      } else if (this.display >= 5 && this.display < 7) {
        return '5-7';
      } else if (this.display >= 7 && this.display < 12) {
        return '7-12';
      } else if (this.display >= 12 && this.display < 16) {
        return '12-16';
      } else if (this.display >= 16) {
        return '16-1000';
      } else {
        return 'none';
      }
    },
  };
  return res;
});

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', handleButtonClick);
});

function handleButtonClick(e) {
  const currentCheckbox = e.currentTarget;
  const key = currentCheckbox.closest('.filters__items-animation-wrapper')
    .previousElementSibling.dataset.category;

  const param = currentCheckbox.getAttribute('data-prop');

  if (currentCheckbox.checked) {
    currentFilters[key].push(param);
    handleFilterPosts(currentFilters);
  } else {
    currentFilters[key] = currentFilters[key].filter((item) => item !== param);
    handleFilterPosts(currentFilters);
  }
}

const handleFilterPosts = (filters) => {
  let filteredProducts = [...newProductsArr];
  let filterKeys = Object.keys(filters);

  filterKeys.forEach((key) => {
    let filterValue = filters[key];
    if (filterValue.length <= 0) {
      return;
    }

    if (key === 'from') {
      filteredProducts = filteredProducts.filter((product) => {
        return Number(product.price) >= Number(filterValue);
      });
      productList.innerHTML = '';
      filteredProducts.forEach(renderCard);
      return;
    }

    if (key === 'to') {
      filteredProducts = filteredProducts.filter((product) => {
        return Number(product.price) <= Number(filterValue);
      });
      productList.innerHTML = '';
      filteredProducts.forEach(renderCard);
      return;
    }

    function iterate(product, keys) {
      return keys.some((k) => {
        if (
          Array.isArray(product[k]) ||
          typeof product[k] === 'string' ||
          typeof product[k] === 'number'
        ) {
          return product[k]
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        }
        if (product[k] !== null && product[k].toString().includes(' Object')) {
          return iterate(product[k], Object.keys(product[k]));
        }
      });
    }

    if (key === 'search') {
      filteredProducts = filteredProducts.filter((product) => {
        const keys = Object.keys(product);

        return iterate(product, keys);
      });
      productList.innerHTML = '';
      filteredProducts.forEach(renderCard);
      return;
    }

    filteredProducts = filteredProducts.filter((product) => {
      let productValue = product[key];
      return Array.isArray(productValue)
        ? productValue.some((val) =>
            String(filterValue)
              .toLowerCase()
              .includes(String(val).toLowerCase())
          )
        : filterValue.includes(String(productValue));
    });
  });

  productList.innerHTML = '';
  filteredProducts.forEach(renderCard);
};

function handleCostInput(e) {
  const currentInput = e.target;
  const type = currentInput.dataset.category;
  const maxValue = items.reduce((accum, nextvalue) => {
    return nextvalue.price > accum ? nextvalue.price : accum;
  }, 0);
  const minValue = items.reduce((accum, nextvalue) => {
    return nextvalue.price < accum ? nextvalue.price : accum;
  }, Infinity);

  setTimeout(() => {
    if (Number(currentInput.value) < minValue) {
      currentInput.value = minValue;
    } else if (Number(currentInput.value) > maxValue) {
      currentInput.value = maxValue;
    }

    currentFilters[type] = currentInput.value;
    handleFilterPosts(currentFilters);
  }, 1000);
}

filterTextInputs.forEach((input) => {
  input.addEventListener('input', handleCostInput);
});

function handleSearchInput(e) {
  const currentInput = e.target;
  const type = currentInput.dataset.category;
  currentFilters[type] = currentInput.value;
  handleFilterPosts(currentFilters);
}

searchInput.addEventListener('input', handleSearchInput);

const itemsContainer = document.querySelector('.cart-popup__products');

const cart = {
  items: [],
};

const localStorageArr = [];

const renderCartArr = items.map((item) => {
  const res = {};
  res.id = item.id;
  res.url = 'img/' + item.imgUrl;
  res.name = item.name;
  res.price = item.price;
  res.amount = 0;
  return res;
});

function renderCartItem(item) {
  const cartItem = document.createElement('li');
  cartItem.classList.add('cart-popup-product');
  cartItem.setAttribute('data-id', `${item.id}`);
  cartItem.innerHTML = `
      <img
      src=${item.url}
      alt=""
      class="cart-popup-product__image" />
    <div class="cart-popup-product__info">
      <p class="cart-popup-product__name">${item.name}</p>
      <p class="cart-popup-product__price">${'$' + item.price}</p>
    </div>
    <div class="cart-popup-product__controls">
      <button class="cart-popup-product__icon-wrapper">
        <div class="cart-popup-product__minus-icon">&lt;</div>
      </button>
      <div class="cart-popup-product__amount">${item.amount}</div>
      <button class="cart-popup-product__icon-wrapper">
        <div class="cart-popup-product__plus-icon">&gt;</div>
      </button>
    </div>
    <div class="cart-popup-product__delete">
      <div class="cart-popup-product__delete-icon">X</div>
    </div>
  `;

  const plusButton = cartItem.querySelector(
    '.cart-popup-product__plus-icon'
  ).parentElement;
  const minusButton = cartItem.querySelector(
    '.cart-popup-product__minus-icon'
  ).parentElement;
  const deleteButton = cartItem.querySelector('.cart-popup-product__delete');
  if (item.amount === 4) {
    plusButton.disabled = true;
    plusButton.classList.add('disabled');
  }
  if (item.amount === 1) {
    minusButton.disabled = true;
    minusButton.classList.add('disabled');
  }

  cartItem
    .querySelector('.cart-popup-product__minus-icon')
    .parentElement.addEventListener('click', function () {
      const card = this.closest('.cart-popup-product');
      const cardsWrapper = document.querySelector('.cart-popup__products');
      const itemId = card.getAttribute('data-id');
      const storageArr = JSON.parse(localStorage.getItem('cartItems'));
      const storageItem = storageArr.find(
        (item) => Number(item.id) === Number(itemId)
      );
      if (storageItem.amount > 1) {
        storageItem.amount--;
        localStorage.setItem('cartItems', JSON.stringify(storageArr));
        cardsWrapper.innerHTML = '';
        renderCartItems();
      }
    });

  cartItem
    .querySelector('.cart-popup-product__plus-icon')
    .parentElement.addEventListener('click', function () {
      const card = this.closest('.cart-popup-product');
      const cardsWrapper = document.querySelector('.cart-popup__products');
      const itemId = card.getAttribute('data-id');
      const storageArr = JSON.parse(localStorage.getItem('cartItems'));
      const storageItem = storageArr.find(
        (item) => Number(item.id) === Number(itemId)
      );
      if (storageItem.amount < 4) {
        storageItem.amount++;
        localStorage.setItem('cartItems', JSON.stringify(storageArr));
        cardsWrapper.innerHTML = '';
        renderCartItems();
      }
    });

 
  deleteButton.addEventListener('click', function () {
    const card = this.closest('.cart-popup-product');
    const cardsWrapper = document.querySelector('.cart-popup__products');
    const itemId = card.getAttribute('data-id');
    const storageArr = JSON.parse(localStorage.getItem('cartItems'));
    const storageItem = storageArr.find(
      (item) => Number(item.id) === Number(itemId)
    );
    const res = storageArr.filter((item) => Number(item.id) !== Number(itemId));
    console.log(res);
    localStorage.setItem('cartItems', JSON.stringify(res));
    cardsWrapper.innerHTML = '';
    renderCartItems();
  });
  itemsContainer.appendChild(cartItem);
}

function renderCartItems() {
  const storageArr = JSON.parse(localStorage.getItem('cartItems'));
  const renderArr = [];

  storageArr.forEach((item) => {
    renderArr.push(renderCartArr.find((i) => i.id === item.id));
  });

  renderArr.forEach((item) => {
    const i = storageArr.find((i) => i.id === item.id);
    item.amount = i.amount;
  });
  renderArr.forEach(renderCartItem);
  const sum = renderArr.reduce((accum, next) => {
    return (accum += next.amount * next.price);
  }, 0);
  document.querySelector('.cart-popup__price').textContent = sum;

  const totalItems = renderArr.reduce((accum, next) => {
    return (accum += next.amount);
  }, 0);
  document.querySelector('.cart-popup__amount').textContent = totalItems;
  document.querySelector('.cart__counter').textContent = totalItems;
}

renderCartItems();