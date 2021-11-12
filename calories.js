function calcBMI() {
    var weight = document.bmiform.pounds.value, height = document.bmiform.inches.value;
    document.bmiform.bmi.value = parseInt((weight * 703) / (height * height));

    var calc_weight = document.bmiform.bmi.value;
    
    if(calc_weight < 18.5) {
        document.getElementById("bmi-health").innerHTML = "You are Underweight and should seek out professional help. Check out one of our plans.";
    } else if(calc_weight < 25) {
        document.getElementById("bmi-health").innerHTML = "You are Healthy but if you would like to keep improving your health you can check out one of our plans.";
    } else if(calc_weight < 30) {
        document.getElementById("bmi-health").innerHTML = "You are Overweight and may need professional help. Check out one of our plans.";
    } else {
        document.getElementById("bmi-health").innerHTML = "You are Obese and should seek out professional help. Check out one of our plans.";
    }
  } 