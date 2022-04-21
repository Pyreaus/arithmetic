var mathOperators = [{sign: "+", method: (x = null, y = null) => { return x + y; }},
                     {sign: "-", method: (x = null, y = null) => { return x - y; }},
                     {sign: "*", method: (x = null, y = null) => { return x * y; }},
                     {sign: "÷", method: (x = null, y = null) => { return x / y; }}];
var selectedOperator = Math.floor(Math.random() * mathOperators.length);
var [num1,num2,result,attempts] = [[],[],[],0];

function generateNumbers() {
  [num1,num2] = [Math.floor(Math.random() * 99), Math.floor(Math.random() * 99)];
  if (selectedOperator == 3) {
    result = mathOperators[selectedOperator].method(num1, Math.round(Math.sqrt(num2)));
  } else { 
    result = mathOperators[selectedOperator].method(num1,num2);
  }
}
function checkMath(callback=0,num1,num2,...numx) {
  let opResult = num1 + num2 + numx.reduce((x,y)=>{return x+y});
  (callback==undefined||callback==0) ? void(0) : callback(opResult);
}
function displaySomething(param=0) {
      var newElement = document.createElement("h1");
      newElement.appendChild(document.createTextNode(param)); 
      document.body.appendChild(newElement);
}// (function(...n){
 //   console.log(n);
 // })(0,0,0);
function resetQuestion() {
  {
    generateNumbers();
  }
  if (selectedOperator == 3) {
    document.querySelectorAll("#question")[0].innerHTML = `${num1}&#160;${mathOperators[selectedOperator].sign}&#160;${Math.round(Math.sqrt(num2))}&#160;=`;
  } else {
    document.querySelectorAll("#question")[0].innerHTML = `${num1}&#160;${mathOperators[selectedOperator].sign}&#160;${num2}&#160;=`;
  }
}
function clickHandler() {
   attempts++;
  {
    (attempts >= 3) ? document.querySelectorAll(".btn_skip")[0].style.visibility = "visible" : void (0);
  }
  let [value,right_or_wrong] = [document.querySelector("#inputBox1").value, void (0)];
  try {
    if (!(value == result) || value == null) {
      right_or_wrong = `That&#160;is&#160;${"incorrect".fontcolor("red")}&#160;try&#160;again.`;
    } else if (value === result) {
      right_or_wrong = `${result}&#160;is&#160;${"correct!".fontcolor("green")}`;
      document.querySelectorAll("#btnNext")[0].style.visibility = "visible";
    }                                         //using innerHTML instead of textContent
    document.querySelectorAll(".result_style")[0].innerHTML = `${right_or_wrong}`;
  } catch(exception) {
    document.querySelectorAll(".result_style")[0].innerHTML = `service&#160;unavailable`;
    console.log(`${right_or_wrong} error`)
  }
}
function clearBtn() {
  [this.style.visibility,attempts] = ["hidden",0];
  document.querySelectorAll("#inputBox1")[0].value = null;
  document.querySelectorAll(".result_style")[0].innerHTML = "";
  resetQuestion();
}
