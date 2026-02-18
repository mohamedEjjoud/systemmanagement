// get total
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let searchT = document.getElementById("searchTitle");
let searchC = document.getElementById("searchCatgory");
let search = document.getElementById("search");
let titleError = document.getElementById("titleError");
let taxesError = document.getElementById("taxesError");
let adsError = document.getElementById("adsError");
let discountError = document.getElementById("discountError");
let countError = document.getElementById("countError");
let categoryError = document.getElementById("categoryError");
let priceError = document.getElementById("priceError");
let mood = "create";
let newI;
// crate pdoduct
function getTotale() {
  if (price.value != "") {
    let resulat = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = resulat;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = " ";
    total.style.backgroundColor = "red";
  }
}
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  titleError.innerHTML = "";
  priceError.innerHTML = "";
  try {
    if (price.value === "" || Number(price.value) < 0) {
      throw new Error("prix vide");
    }
    if (taxes.value === "" || Number(taxes.value) < 0) {
      throw new Error("taxes vide");
    }
    if (ads.value === "" || Number(ads.value) < 0) {
      throw new Error("ads vide");
    }
    if (discount.value === "" || Number(discount.value) < 0) {
      throw new Error("discount vide");
    }
   if (mood === "create" && (count.value === "" || Number(count.value) <= 0)) {
  throw new Error("count vide");
}

    let newPro = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[newI] = newPro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }

    // Save to localStorage
    localStorage.setItem("product", JSON.stringify(dataPro));

    // Clear input fields and update display
    clearData();
    showdata();
  } catch (error) {
    let kk = error.message;
    // Display validation error
    if (kk.includes("titre")) {
      titleError.innerHTML = kk;
    }
    if (kk.includes("prix")) {
      priceError.innerHTML = kk;
    }
    if (kk.includes("taxes")) {
      taxesError.innerHTML = kk;
    }
    if (kk.includes("ads")) {
      adsError.innerHTML = kk;
    }
    if (kk.includes("discount")) {
      discountError.innerHTML = kk;
    }
    if (kk.includes("count")) {
      countError.innerHTML = kk;
    }
    if (kk.includes("category")) {
      categoryError.innerHTML = kk;
    }
  }
};

// save localStorage

localStorage.setItem("product", JSON.stringify(dataPro));
showdata();
showdata();
// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
function showdata() {
  getTotale();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (!dataPro[i]) continue;
    table += `
          <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>   
                </tr>
    `;
  }

  let tbody = document.getElementById("tbody");
  tbody.innerHTML = table;
  let btndelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btndelete.innerHTML = `
  <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
    `;
  } else btndelete.innerHTML = "";
}
showdata();
// delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showdata();
}
// deleteAll
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showdata();
}
// Update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotale();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "update";
  mood = "update";
  newI = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
searchT.addEventListener("click", () => {
  search.focus();
  getsearch(search.value);
  search.value = "";
  function getsearch(value) {
    table = "";
    for (i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value)) {
        table += `
          <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>   
                </tr>
    `;
      }
      tbody.innerHTML = table;
    }
  }
});
searchC.addEventListener("click", () => {
  search.focus();
  getsearch(search.value);
  search.value = "";
  function getsearch(value) {
    table = "";
    for (i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value)) {
        table += `
          <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>   
                </tr>
    `;
      }
      tbody.innerHTML = table;
    }
  }
});
