// Dashboard Interactions & Data Management

document.addEventListener('DOMContentLoaded', () => {
    // --- Sidebar Mobile Toggle ---
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('dashboard-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (sidebarToggle && sidebar && overlay) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
            overlay.classList.toggle('hidden');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        });
    }

    // --- Load Bookings from LocalStorage ---
    const bookingsTableBody = document.getElementById('bookings-table-body');
    const upcomingBookingCard = document.getElementById('upcoming-booking-card');
    
    let userBookings = JSON.parse(localStorage.getItem('userBookings')) || [];

    if (upcomingBookingCard) {
        if (userBookings.length > 0) {
            const nextBooking = userBookings[0];
            upcomingBookingCard.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Next Reservation</p>
                        <h3 class="text-2xl font-bold">${nextBooking.date}</h3>
                    </div>
                    <span class="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">${nextBooking.status}</span>
                </div>
                <div class="space-y-2 mb-6">
                    <div class="flex items-center gap-3 text-sm">
                        <i class="fa-solid fa-clock w-5 text-gray-400"></i>
                        <span>${nextBooking.time} (${nextBooking.duration} Hours)</span>
                    </div>
                    <div class="flex items-center gap-3 text-sm">
                        <i class="fa-solid fa-door-open w-5 text-gray-400"></i>
                        <span>${nextBooking.boothName}</span>
                    </div>
                    <div class="flex items-center gap-3 text-sm">
                        <i class="fa-solid fa-users w-5 text-gray-400"></i>
                        <span>${nextBooking.guests} Guests</span>
                    </div>
                </div>
                <div class="flex gap-3">
                    <button class="btn-primary flex-1 py-2 rounded-lg text-sm font-bold">Manage</button>
                    <button class="btn-outline flex-1 py-2 rounded-lg text-sm font-bold border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                </div>
            `;
        } else {
            upcomingBookingCard.innerHTML = `
                <div class="text-center py-8">
                    <i class="fa-solid fa-calendar-xmark text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
                    <h3 class="text-lg font-bold mb-2">No Upcoming Bookings</h3>
                    <p class="text-sm text-gray-500 mb-6">You don't have any reservations coming up.</p>
                    <a href="../book-room.html" class="btn-primary px-6 py-2 rounded-lg text-sm font-bold">Book a Room</a>
                </div>
            `;
        }
    }

    if (bookingsTableBody) {
        if (userBookings.length > 0) {
            bookingsTableBody.innerHTML = userBookings.map(booking => `
                <tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td class="p-4"><span class="font-bold text-sm">${booking.id}</span></td>
                    <td class="p-4">
                        <p class="font-medium text-sm">${booking.boothName}</p>
                    </td>
                    <td class="p-4">
                        <p class="text-sm">${booking.date}</p>
                        <p class="text-xs text-gray-500">${booking.time} (${booking.duration}h)</p>
                    </td>
                    <td class="p-4 text-sm font-medium">${booking.amount}</td>
                    <td class="p-4">
                        <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full font-medium">Confirmed</span>
                    </td>
                    <td class="p-4 text-right">
                        <button class="text-gray-400 hover:text-primary transition-colors"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                    </td>
                </tr>
            `).join('');
        } else {
            bookingsTableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="p-8 text-center text-gray-500">
                        No booking history found.
                    </td>
                </tr>
            `;
        }
    }

    // --- Song Favorites Logic ---
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const icon = e.currentTarget.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.replace('fa-regular', 'fa-solid');
                icon.classList.add('text-secondary');
            } else {
                icon.classList.replace('fa-solid', 'fa-regular');
                icon.classList.remove('text-secondary');
            }
        });
    });

    // --- Add-ons Cart Logic ---
    const addBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartSummary = document.getElementById('cart-summary');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    let cartTotal = 0;

    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const price = parseFloat(e.currentTarget.dataset.price);
            cartTotal += price;
            
            if (cartTotalAmount) {
                cartTotalAmount.textContent = `$${cartTotal.toFixed(2)}`;
            }
            
            if (cartSummary) {
                cartSummary.classList.remove('translate-y-full');
            }
            
            // Visual feedback
            const originalText = e.currentTarget.innerHTML;
            e.currentTarget.innerHTML = '<i class="fa-solid fa-check"></i> Added';
            e.currentTarget.classList.add('bg-green-500', 'text-white', 'border-green-500');
            
            setTimeout(() => {
                e.currentTarget.innerHTML = originalText;
                e.currentTarget.classList.remove('bg-green-500', 'text-white', 'border-green-500');
            }, 1000);
        });
    });
});
