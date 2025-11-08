document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const logoutButton = document.getElementById('logoutButton');
    const loginLink = document.getElementById('login-link');
    const profileLink = document.getElementById('profile-link');
    const sidebarCreateAdLink = document.querySelector('#sidebar a[href="/create-ad.html"]');
    const sidebarCarsLink = document.querySelector('#sidebar a[href="/cars.html"]');

    if (token) {
        // User is logged in
        if (logoutButton) {
            logoutButton.style.display = 'block';
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('token');
                window.location.href = '/login.html';
            });
        }
        // Show elements for logged-in users
        document.querySelectorAll('.logged-in').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.logged-out').forEach(el => el.style.display = 'none');

        if (loginLink) loginLink.style.display = 'none';
        if (profileLink) profileLink.style.display = 'block';
        if (sidebarCreateAdLink) sidebarCreateAdLink.style.display = 'block';
        if (sidebarCarsLink) sidebarCarsLink.style.display = 'block';

    } else {
        // User is logged out
        if (logoutButton) {
            logoutButton.style.display = 'none';
        }
        // Show elements for logged-out users
        document.querySelectorAll('.logged-in').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.logged-out').forEach(el => el.style.display = 'block');

        if (loginLink) loginLink.style.display = 'block';
        if (profileLink) profileLink.style.display = 'none';
        if (sidebarCreateAdLink) sidebarCreateAdLink.style.display = 'none';
        if (sidebarCarsLink) sidebarCarsLink.style.display = 'none';

        // Redirect to login only if not already on login page
        if (window.location.pathname !== '/login.html' && window.location.pathname !== '/register.html') {
            window.location.href = '/login.html';
        }
    }
});