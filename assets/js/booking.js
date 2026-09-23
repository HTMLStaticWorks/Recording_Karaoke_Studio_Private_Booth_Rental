// Booking flow logic utilizing LocalStorage

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        // Elements
        const boothSelect = document.getElementById('booth-select');
        const dateInput = document.getElementById('booking-date');
        const timeSelect = document.getElementById('booking-time');
        const durationSelect = document.getElementById('booking-duration');
        const guestsInput = document.getElementById('booking-guests');
        
        // Summary Elements
        const summaryBooth = document.getElementById('summary-booth');
        const summaryDate = document.getElementById('summary-date');
        const summaryTime = document.getElementById('summary-time');
        const summaryDuration = document.getElementById('summary-duration');
        const summaryGuests = document.getElementById('summary-guests');
        
        const summaryBasePrice = document.getElementById('summary-base-price');
        const summaryTaxes = document.getElementById('summary-taxes');
        const summaryTotal = document.getElementById('summary-total');
        
        // Pricing data
        const pricing = {
            'duo': 25,
            'party': 55,
            'vip': 95
        };

        function calculateTotal() {
            if (!boothSelect.value || !durationSelect.value) return;
            
            const rate = pricing[boothSelect.value] || 0;
            const hours = parseInt(durationSelect.value) || 0;
            
            const basePrice = rate * hours;
            const taxes = basePrice * 0.10; // 10% tax
            const total = basePrice + taxes;
            
            summaryBasePrice.textContent = `$${basePrice.toFixed(2)}`;
            summaryTaxes.textContent = `$${taxes.toFixed(2)}`;
            summaryTotal.textContent = `$${total.toFixed(2)}`;
        }

        function updateSummary() {
            summaryBooth.textContent = boothSelect.options[boothSelect.selectedIndex]?.text || '-';
            summaryDate.textContent = dateInput.value || '-';
            summaryTime.textContent = timeSelect.options[timeSelect.selectedIndex]?.text || '-';
            summaryDuration.textContent = durationSelect.options[durationSelect.selectedIndex]?.text || '-';
            summaryGuests.textContent = guestsInput.value || '-';
            
            calculateTotal();
        }

        // Attach listeners
        boothSelect.addEventListener('change', updateSummary);
        dateInput.addEventListener('change', updateSummary);
        timeSelect.addEventListener('change', updateSummary);
        durationSelect.addEventListener('change', updateSummary);
        guestsInput.addEventListener('input', updateSummary);

        // Form submission (Save to LocalStorage)
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!bookingForm.checkValidity()) {
                bookingForm.classList.add('was-validated');
                return;
            }

            const bookingData = {
                id: 'BK-' + Math.floor(Math.random() * 1000000),
                booth: boothSelect.value,
                boothName: boothSelect.options[boothSelect.selectedIndex].text,
                date: dateInput.value,
                time: timeSelect.value,
                duration: durationSelect.value,
                guests: guestsInput.value,
                amount: summaryTotal.textContent,
                status: 'Confirmed',
                createdAt: new Date().toISOString()
            };

            // Get existing bookings
            let bookings = JSON.parse(localStorage.getItem('userBookings')) || [];
            bookings.unshift(bookingData); // Add to beginning
            
            localStorage.setItem('userBookings', JSON.stringify(bookings));
            
            // Show success (in a real app, maybe a modal or redirect)
            const successMsg = document.getElementById('booking-success');
            const submitBtn = document.getElementById('submit-booking-btn');
            
            submitBtn.style.display = 'none';
            successMsg.classList.remove('hidden');
            
            // Redirect to dashboard after a delay
            setTimeout(() => {
                window.location.href = 'dashboard/bookings.html';
            }, 3000);
        });

        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});
