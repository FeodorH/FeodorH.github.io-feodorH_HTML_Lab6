let sum = 0;

function click1() {
  let input = document.getElementsByName("inputField")[0]; 
  let select = document.getElementsByName("select1")[0]; 
  let output = document.getElementById("result");
  
  let quantity = parseInt(input.value) || 0;
  let selectedValue = select.value;
  
  if(selectedValue === "v1"){
      sum = sum + 500 * quantity;
  } else if(selectedValue === "v2"){
      sum = sum + 1000 * quantity;
  } else if(selectedValue === "v3"){
      sum = sum + 1500 * quantity;
  }
  
  output.innerHTML = "Общая сумма: " + sum + "$";
  console.log("Общая сумма: " + sum + "$");
  
  return false; // чтобы форма не перезагружала страницу
}

window.addEventListener('DOMContentLoaded', function (event) {//DOM is loading...
  let button = document.getElementById("button");
  button.addEventListener("click", click1);
});
