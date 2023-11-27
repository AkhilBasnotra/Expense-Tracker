let form = document.querySelector("#form");
let items = document.querySelector(".items");

form.addEventListener("submit", addExpense);

function addExpense(e) {
  e.preventDefault();

  let amount = document.querySelector("#amount").value;
  let text = document.querySelector("#text").value;
  let category = document.querySelector("#category").value;

  let li = document.createElement("li");
  li.dataset.text = text;
  li.appendChild(document.createTextNode(`${amount} - ${text} - ${category}`));

  let myObj = {
    amount: amount,
    text: text,
    category: category,
  };

  let objSting = JSON.stringify(myObj);

  localStorage.setItem(text, objSting);

  // Delete Button
  let delBtn = document.createElement("button");
  delBtn.classList = "btn btn-danger btn-sm";
  delBtn.classList.add("del");
  delBtn.appendChild(document.createTextNode("Delete"));
  delBtn.addEventListener("click", delItem);

  //Edit button
  let editBtn = document.createElement("button");
  editBtn.classList = "btn btn-warning btn-sm";
  editBtn.classList.add("edit");
  editBtn.appendChild(document.createTextNode("Edit"));
  editBtn.addEventListener("click", edit);

  function edit(e) {
    items.removeChild(li);
    localStorage.removeItem(text);
    document.querySelector("#amount").value = myObj.amount;
    document.querySelector("#text").value = myObj.text;
    document.querySelector("#category").value = myObj.category;
  }

  //appending childrens
  items.appendChild(li);
  li.appendChild(delBtn);
  li.appendChild(editBtn);

  document.querySelector("#amount").value = "";
  document.querySelector("#text").value = "";
  document.querySelector("#category").value = "";
}

function delItem(e) {
  if (e.target.classList.contains("del")) {
    if (confirm("Are You Sure?")) {
      let li = e.target.parentElement;
      items.removeChild(li);
      let text = li.dataset.text;
      localStorage.removeItem(text);
    }
  }
}
