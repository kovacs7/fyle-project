let submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function calculateTax() {
  let ageInput = document.getElementById("ageInput").value;
  let incomeInput = document.getElementById("grossInput").value.trim();
  let extraInput = document.getElementById("extraInput").value.trim();
  let deductionsInput = document.getElementById("deducInput").value.trim();
  let modalIncome = document.getElementById("overallIncome");
  let modalLabel = document.getElementById("ModalLabel");
  let afterDeduc = document.getElementById("afterDeduc");
  let modalBody = document.getElementById("modalBody");

  if (incomeInput === "" || extraInput === "" || deductionsInput === "") {
    modalLabel.innerText = "📄Please fill in all the fields.";
    modalLabel.style.color = "#A70606";
    modalIncome.innerText = "";
    afterDeduc.innerText = "";
    modalBody.setAttribute(
      "class",
      "modal-content pb-3 border border-3 border-danger"
    );
    return;
  }

  let income = parseFloat(incomeInput);
  let extra = parseFloat(extraInput);
  let deductions = parseFloat(deductionsInput);

  if (isNaN(income) || isNaN(extra) || isNaN(deductions)) {
    console.error("Please enter valid numeric values.");
    return;
  }

  modalLabel.innerText = "Your overall income will be";
  modalLabel.style.color = "black";
  afterDeduc.innerText = "After tax deductions";
  modalBody.setAttribute(
    "class",
    "modal-content pb-3 border border-3 border-primary"
  );

  const threshold = 800000;
  const taxRates = {
    under40: 0.3, // Tax rate for individuals under 40
    over40: 0.4, // Tax rate for individuals aged 40 or above but under 60
    over60: 0.1, // Tax rate for individuals aged 60 or above
  };

  const overallIncome = income + extra - deductions;

  if (overallIncome <= threshold) {
    console.log("No tax. Overall income:", overallIncome);
    modalIncome.innerText = overallIncome;
  } else {
    const taxableAmount = overallIncome - threshold;

    let taxRate;
    if (ageInput === "under40") {
      taxRate = taxRates.under40;
    } else if (ageInput === "over40") {
      taxRate = taxRates.over40;
    } else {
      taxRate = taxRates.over60;
    }

    const tax = taxRate * taxableAmount;
    console.log("Tax payable:", tax);
    console.log("Net income after tax:", overallIncome - tax);
    modalIncome.innerText = overallIncome - tax;
  }
});
