let selectedPackage = null;
let gstRate = 0.18;

function showPackages() {
    let name = document.getElementById("customer-name").value;
    let mobile = document.getElementById("customer-mobile").value;
    
    if (name.trim() === "" || mobile.trim() === "") {
        alert("Please enter your name and mobile number.");
        return;
    }
    
    document.getElementById("customer-form").style.display = "none";
    document.getElementById("products").style.display = "block";
}

function selectPackage(name, price) {
    selectedPackage = { name, price };
    updateCart();
}

function updateCart() {
    const subtotal = selectedPackage ? selectedPackage.price : 0;
    const gstAmount = subtotal * gstRate;
    const totalAmount = subtotal + gstAmount;
    
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("gst").textContent = gstAmount.toFixed(2);
    document.getElementById("total").textContent = totalAmount.toFixed(2);

    let upiLink = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=9133550086@upi&pn=JAGADAMBA_INTERNET&mc=0000&tid=123456&tr=${totalAmount.toFixed(2)}&tn=Internet_Package_Payment`;
    document.getElementById("upi-qr").src = upiLink;

    // Simulating sending a payment link
    sendPaymentLink(totalAmount);
}

function sendPaymentLink(amount) {
    let mobile = document.getElementById("customer-mobile").value;
    alert(`Payment link sent to ${mobile}. Total: ₹${amount.toFixed(2)}`);
}

function checkout() {
    if (!selectedPackage) {
        alert("Please select a package before checkout!");
        return;
    }
    
    setTimeout(() => {
        window.location.href = "index.html";
    }, 3000);
}
