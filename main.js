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

// items

const itemListElement = document.querySelector('.item-list');

const itemCollection = items.map(item => {
  const itemElement = document.createElement('div');
  itemElement.className = 'item';

  const btnLike = document.createElement('button');
  btnLike.className = 'btn-like';
  itemElement.append(btnLike);

  const logoLike = document.createElement('img');
  logoLike.className = 'logo-like';
  logoLike.src = 'img/icons/like_empty.svg';
  btnLike.append(logoLike);

  // image
  const itemImageBox = document.createElement('div');
  itemImageBox.className = 'item-image-box';
  itemElement.append(itemImageBox);

  const itemImage = document.createElement('img');
  itemImage.className = 'item-image';
  itemImage.src = 'img/' + item.imgUrl;
  itemImageBox.append(itemImage);

  // name
  const itemName = document.createElement('div');
  itemName.className = 'item-name';
  itemName.innerText = item.name;
  itemElement.append(itemName);

  // stock
  const itemStock = document.createElement('div');
  itemStock.className = 'stock';
  itemElement.append(itemStock);

  const itemStockImage = document.createElement('div');
  itemStockImage.className = 'stock-image';
  itemStock.append(itemStockImage);

  const itemLogoStock = document.createElement('img');
  itemLogoStock.className = 'logo-stock';
  itemLogoStock.src = "img/icons/stock_yes.png";
  itemStockImage.append(itemLogoStock);

  const itemStockNumber = document.createElement('div');
  itemStockNumber.className = 'stock-number';
  itemStockNumber.innerText = item.orderInfo.inStock + ' left in stock';
  itemStock.append(itemStockNumber);

  // price
  
  const itemPrice = document.createElement('div');
  itemPrice.className = 'price';
  itemPrice.innerHTML = 'Price: ' + item.price + ' $';
  itemElement.append(itemPrice);
 

  // button

  const itemBtnAdd = document.createElement('button');
  itemBtnAdd.className = 'item-btn-add';
  itemBtnAdd.innerText = 'Add to cart';
  itemElement.append(itemBtnAdd);

  // footer
  const itemFooter = document.createElement('div');
  itemFooter.className = 'item-footer';
  itemElement.append(itemFooter);

  const reviewImage = document.createElement('div');
  reviewImage.className = 'reviews-image';
  itemFooter.append(reviewImage);

  const logoReviewsLike = document.createElement('img');
  logoReviewsLike.className = 'logo-reviews-like';
  logoReviewsLike.src = 'img/icons/like_filled.svg';
  reviewImage.append(logoReviewsLike);

  const reviewsNumber = document.createElement('div');
  reviewsNumber.className = 'reviews-number';
  itemFooter.append(reviewsNumber);

  const footerPReviews = document.createElement('p');
  footerPReviews.className = 'footer-p-reviews';
  footerPReviews.innerText = item.orderInfo.reviews + '% Positive reviews';
  reviewsNumber.append(footerPReviews);

  const footerTextReviews = document.createElement('p');
  footerTextReviews.innerText = 'Above avarage';
  reviewsNumber.append(footerTextReviews);

  const ordersNumber = document.createElement('div');
  ordersNumber.className = 'orders-number';
  itemFooter.append(ordersNumber);

  const footerPOrders = document.createElement('p');
  footerPOrders.className = 'footer-p-orders';
  footerPOrders.innerText = '236';
  ordersNumber.append(footerPOrders);

  const footerTextOrders = document.createElement('p');
  footerTextOrders.innerText = 'orders';
  ordersNumber.append(footerTextOrders);



  return itemElement;
})

itemListElement.append(...itemCollection);
