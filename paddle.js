function updateTable(event) {
  if (!event.name) {
    return;
  }

  console.log(event);

  let items = event.data.items;
  let totals = event.data.totals;
  let recurringTotals = event.data.recurring_totals;

  updateItemsTable(items);
  updateSummaryTable(totals, recurringTotals);
}

function updateItemsTable(items) {
  const itemsTableBody = document.querySelector('.items-table tbody');
  itemsTableBody.innerHTML = '';

  items.forEach(item => {
    const newRow = createTableRow(item.product.name, item.price_name, item.quantity, item.totals.subtotal);
    itemsTableBody.appendChild(newRow);
  });
}

function createTableRow(productName, priceName, quantity, total) {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${productName}</td>
    <td>${priceName}</td>
    <td>${quantity}</td>
    <td>${total.toFixed(2)}</td>
  `;
  return newRow;
}

function updateSummaryTable(totals, recurringTotals) {
  document.getElementById('oneTimeTotal').textContent = (totals.subtotal - recurringTotals.subtotal).toFixed(2);
  document.getElementById('recurringTotal').textContent = recurringTotals.subtotal.toFixed(2);
  document.getElementById('discountTotal').textContent = totals.discount.toFixed(2);
  document.getElementById('taxTotal').textContent = totals.tax.toFixed(2);
  document.getElementById('totalToday').textContent = totals.total.toFixed(2);
}

Paddle.Environment.set("sandbox");
Paddle.Initialize({
  token: "test_7d279f61a3499fed520f7cd8c08", // replace with a client-side token
  eventCallback: updateTable
});

// define items
let monthItemsList = [
  {
    priceId: 'pri_01gsz8x8sawmvhz1pv30nge1ke',
    quantity: 10
  },
  {
    priceId: 'pri_01gsz95g2zrkagg294kpstx54r',
    quantity: 1
  },
  {
    priceId: 'pri_01gsz98e27ak2tyhexptwc58yk',
    quantity: 1
  }
];
let yearItemsList = [
  {
    priceId: 'pri_01gsz8z1q1n00f12qt82y31smh',
    quantity: 10
  },
  {
    priceId: 'pri_01gsz96z29d88jrmsf2ztbfgjg',
    quantity: 1
  },
  {
    priceId: 'pri_01gsz98e27ak2tyhexptwc58yk',
    quantity: 1
  }
];

// open checkout
function openCheckout(items){
  Paddle.Checkout.open({
    settings: {
      displayMode: "inline",
      frameTarget: "checkout-container",
      frameInitialHeight: "450",
      frameStyle: "width: 100%; min-width: 312px; background-color: transparent; border: none;"
    },
    items: items
  });
}

// switch plan
let isMonthly = true;

function switchPlan() {
  let updatedItems = isMonthly ? yearItemsList : monthItemsList;
  Paddle.Checkout.updateCheckout({
    items: updatedItems
  });
  isMonthly = !isMonthly;
}

window.onload = openCheckout(monthItemsList)