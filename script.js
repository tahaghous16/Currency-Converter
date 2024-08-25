let dropdowns = document.querySelectorAll("#form select");
let button = document.querySelector("form button");
let fromCurr = document.getElementById("from");
let toCurr = document.getElementById("to");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOPtion = document.createElement("option");
    newOPtion.innerHTML = currCode;
    newOPtion.value = currCode;
    if (select.id == "from" && currCode == "USD") {
      newOPtion.selected = "selected";
    }
    if (select.id == "to" && currCode == "PKR") {
      newOPtion.selected = "selected";
    }
    select.append(newOPtion);
  }

  select.addEventListener("change", (evt) => {
    flagUpdate(evt.target);
  });
}

let flagUpdate = (Element) => {
  let currCode = Element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = Element.parentElement.querySelector("img");
  img.src = newSrc;
};

button.addEventListener("click", (evt) => {
  let amount = document.getElementById("amount");
  const msg = document.getElementById("msg");
  evt.preventDefault();
  let amtVal = amount.value;
  if (amtVal == "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  msg.innerText = "Getting exchange rate...";
  let url = ` https://v6.exchangerate-api.com/v6/93117c864bc8c0a305435d76/latest/${fromCurr.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurr.value];
      let totalExRate = (amtVal * exchangeRate).toFixed(2);
      msg.innerText = `${amtVal} ${fromCurr.value} = ${totalExRate} ${toCurr.value}`;
    })
    .catch(() => {
      msg.innerText = "Something went wrong";
    });
});
