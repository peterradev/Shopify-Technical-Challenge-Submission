const getProducts = async () => {
  const response = await fetch('http://localhost:8000/products/')
  const data = await response.json();
  console.log(data)
  console.log(data[0].product)
  let html = data.map(product => {
    return ` <tr>
             <td>${product.product}</td>
             <td>${product.amount}</td>
             </tr>
            `;
  }).join("\n");
  document.querySelector('.tables').insertAdjacentHTML('afterbegin', html)
  return data
  
}


const table = `<table>
                <thead>
                  <tr>
                    <th>Product<br></th>
                    <th>Amount<br></th>
                  </tr>
                </thead>
                <tbody class="tables">
                  
                </tbody>
              </table>
`

const addTables = () => {
  document.querySelector('.products').insertAdjacentHTML('afterbegin', table)
}

const getAllProducts = (e) => {
  e.preventDefault();
  button.style.display = "none";
  addTables()
  getProducts()
  .then(data => console.log('resolved: ', data));  
}

const button = document.querySelector('.visibility');


button.addEventListener('click', getAllProducts)


// Get the data from the form

// get the submit button
const form = document.querySelector('#form-box');



// send inputs to databse
const sendForm = (product, amount) => {
  fetch("http://localhost:8000/products/", {
    method: "POST",

    body: JSON.stringify({
      product: product,
      amount: amount
    }),
    headers: {
      'Content-type': "application/json; charset=UTF-8"
    }
  })
}

const addAmount = (pro,amount) => {
  fetch("http://localhost:8000/products/" + pro+'/'+amount, {
    method: 'PUT',
    headers: {
      'Content-Type' : 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      product: pro,
      amount: amount
    })
  })
}

const isInThere = async (product, amount) => {
  const response = await fetch('http://localhost:8000/products/' + product);
  const data = await response.json();
  let isThere = false;

  if(data){
   addAmount(product, amount)
  } else{
    // console.log(false)
    sendForm(product, amount)
  }


  return isThere;
}



const submitProduct = (e) => {
  e.preventDefault();
  const pro = document.querySelector("#product").value;
  const amount = document.querySelector("#amount").value;
  console.log(pro + " " + amount);

  isInThere(pro, amount);

  // if (isInThere(pro)){
  //   // addAmount(pro, amount);
  // } else{
  //   console.log('adding product')
  //   sendForm(pro, amount);
  // }


}

//even listener so that when the button get pressed, it calls the method to send it to the database
form.addEventListener('submit', submitProduct);

const findProduct = async (product) => {
  const response = await fetch('http://localhost:8000/products/' + product);
  const data = await response.json();
  console.log(data);
 
  let html = `
              <tr>
                <th>${data.product}</th>
                <th>${data.amount}</th>
              </tr>`;
  document.querySelector(".table").insertAdjacentHTML('afterbegin', html);
}

const searched = `<table class="return-item">
                <thead>
                  <tr>
                    <th>Product<br></th>
                    <th>Amount<br></th>
                  </tr>
                </thead>
                <tbody class="table">
                  
                </tbody>
              </table>
`

const addTable = () => {
  document.querySelector('#single-search').insertAdjacentHTML('afterbegin', searched)
}

const clear = '<p></p>';

const clearTable = () => {
  document.querySelector('.table').insertAdjacentHTML('afterbegin', clear)
}

const singleSearch = e => {
  addTable()
  clearTable();
  e.preventDefault();
  const product = document.getElementById("single-product").value;
  findProduct(product);
}


// be able to get one item at a time
// get the search button
const singleBtn = document.querySelector("#single-search");

singleBtn.addEventListener('submit', singleSearch);


// ===================================
// ======== Delete Item ==============
// ===================================

const deleteIt = async product => {
  await fetch("http://localhost:8000/products/" + product,{
    method: 'DELETE',
    headers: {
      'Content-Type' : 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      product: product,
    })
  } )
}

const deleteItem = (e) => {
  e.preventDefault();
  const product = document.getElementById("item-tbd").value;
  deleteIt(product)
}

const deleteBtn = document.querySelector('#delete-item')
deleteBtn.addEventListener('submit', deleteItem);


// =====================================================
// ====== Subtract Amount ==============================
// =====================================================
const subtractAmount = async (product, amount) => {
  const response = await fetch('http://localhost:8000/products/' + product);
  const data = await response.json();

  if(data){
    await fetch("http://localhost:8000/products/" + product+'/'+amount, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        product: product,
        amount: parseInt(amount)
      })
    })
  } else {
    
  }
  
}


const subtractProduct = e => {
  e.preventDefault();
  const product = document.getElementById("subtract-product").value;
  const amount = document.getElementById("subtract-amount").value;

  subtractAmount(product, amount);

}

const subtract = document.getElementById("subtract-form");
subtract.addEventListener('submit', subtractProduct)

// ==================================================================================
// =================== making a checkbox for all available items ====================
// ==================================================================================
const addCheckBox = async () => {
  const response = await fetch('http://localhost:8000/products/')
  const data = await response.json();
  console.log(data)
  console.log(data[0].product)
  let html = data.map(product => {
    return ` 
            <input type="checkbox" name="inventory" value="${product.product}"  >
            <label for="${product.product}"> ${product.product}</label>
            <input type="number" name="${product.product}" placeholder="amount" id="${product.product}">
            <br>
            `;
          }).join("\n");
          document.querySelector('#send-shipment').insertAdjacentHTML("beforebegin", html)  
}

const sendShipment = mapped => {
  console.log(mapped.size);
  // for(let i=0; i<mapped.size; i++){
  //   console.log(mapped[i].key);
  //   // subtractAmount(mapped[i].key)
  // }
  const iterator = mapped.keys()
  const iterator2 = mapped.values()
  for(let i=0; i<mapped.size; i++){
    subtractAmount(iterator.next().value, iterator2.next().value);
    // console.log(iterator.next().value +': '+iterator2.next().value);
  }

}

const getCheckBoxes = checkboxes => {
  let checked = []
  let input = [];
  let mapped = new Map();

  for(let i=0; i<checkboxes.length; i++){
    if(checkboxes[i].checked){
      // console.log(checkboxes[i].value);
      checked.push(checkboxes[i].value);
      const getInput = document.getElementById(checkboxes[i].value)
      input.push(getInput.value)

      mapped.set(checkboxes[i].value, getInput.value);
    }
  }
  sendShipment(mapped);
}


const sendOff = e => {
  e.preventDefault();
  getCheckBoxes(checkboxes)
}

addCheckBox();
const checkboxes = document.getElementsByName('inventory');
const forms = document.getElementById('shipment-form')
forms.addEventListener('submit', sendOff);

