function updateClock() {
    document.getElementById("clock").textContent = `Current Time: ${new Date().toLocaleTimeString()}`;
}

function setGreeting() {
    const hours = new Date().getHours();
    document.getElementById("greeting").textContent = hours < 12 ? "Good Morning! Welcome to" : 
        hours < 18 ? "Good Afternoon! Welcome to" : "Good Evening! Welcome to";
}

setGreeting();
setInterval(updateClock, 1000);

let selectedPackage = null;
function showPackages() {
    let name = document.getElementById("customer-name").value.trim();
    let mobile = document.getElementById("customer-mobile").value.trim();

    if (name === "" || !/^[0-9]{10}$/.test(mobile)) {
        alert("Please enter a valid name and 10-digit mobile number.");
        return;
    }
    document.getElementById("customer-form").style.display = "none";
    document.getElementById("products").style.display = "block";
}

function selectPackage(name, price) {
    selectedPackage = { name, price };
    document.getElementById("cart").innerHTML = `<li>${name} - ₹${price}</li>`;
    updateCart();
}

function updateCart() {
    const subtotal = selectedPackage ? selectedPackage.price : 0;
    const gstAmount = subtotal * 0.18;
    const totalAmount = subtotal + gstAmount;
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("gst").textContent = gstAmount.toFixed(2);
    document.getElementById("total").textContent = totalAmount.toFixed(2);
}

function checkout() {
    if (!selectedPackage) {
        alert("Please select a package before checkout!");
        return;
    }
    const totalAmount = document.getElementById("total").textContent;
    document.getElementById("qr-container").style.display = "block";
    let qr = new QRious({ 
        element: document.getElementById("qr-code"), 
        value: `upi://pay?pa=9133550086@upi&am=${totalAmount}&cu=INR`, 
        size: 200 
    });
}
