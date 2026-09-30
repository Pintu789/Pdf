document.getElementById('buy-btn').onclick = async function (e) {
    // 1. Backend se Order ID generate karwayein
    const response = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    const order = await response.json();

    // 2. Razorpay Checkout Options
    var options = {
        "key": "YOUR_RAZORPAY_KEY_ID", // Yahan apni Razorpay ki Test/Live Key dalein
        "amount": order.amount, 
        "currency": "INR",
        "name": "Aapka Naam / Brand",
        "description": "PDF Ebook Purchase",
        "order_id": order.id, 
        "handler": function (response){
            // Payment successful hone par yahan aayega
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
            
            // Yahan user ko download link ya success page par bhej sakte hain
            window.location.href = `/download.html?payment_id=${response.razorpay_payment_id}`;
        },
        "prefill": {
            "name": "Aapka Customer",
            "email": "customer@example.com",
            "contact": "9999999999"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    
    var rzp1 = new Razorpay(options);
    rzp1.open();
}
