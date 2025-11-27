document.addEventListener('DOMContentLoaded', function() {
    const enrollButton = document.getElementById('enroll-button');
    const backButton = document.getElementById('back-button');
    const paymentForm = document.getElementById('payment-form');
    const courseDetails = document.getElementById('course-details');
    const cardPaymentForm = document.getElementById('card-payment-form');
    const successPopup = document.getElementById('success-popup');
    const closePopup = document.getElementById('close-popup');
    const cardNumberInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('expiry-date');
    const cvvInput = document.getElementById('cvv');
    
    // Show payment form when enroll button is clicked
    enrollButton.addEventListener('click', function() {
        courseDetails.style.display = 'none';
        paymentForm.style.display = 'block';
    });
    
    // Show course details when back button is clicked
    backButton.addEventListener('click', function() {
        paymentForm.style.display = 'none';
        courseDetails.style.display = 'block';
    });
    
    // Format card number input
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ');
        if (formattedValue) {
            e.target.value = formattedValue;
        }
    });
    
    // Format expiry date input
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (value.length >= 2) {
            e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
    });
    
    // Only allow numbers in CVV field
    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
    
    // Handle form submission
    cardPaymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
        
        // Check if card number is the specific one for success
        if (cardNumber === '223422352236') {
            successPopup.style.display = 'flex';
        } else {
            alert('Payment Failed: Please check your card details and try again.');
        }
    });
    
    // Close success popup
    closePopup.addEventListener('click', function() {
        successPopup.style.display = 'none';
        paymentForm.style.display = 'none';
        courseDetails.style.display = 'block';
        cardPaymentForm.reset();
    });
    
    // Countdown timer
    function updateCountdown() {
        const offerEndDate = new Date('November 27, 2025 19:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = offerEndDate - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('countdown-timer').textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            document.getElementById('countdown-timer').textContent = 'Offer Expired';
        }
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
});
