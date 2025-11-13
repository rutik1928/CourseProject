document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const loginLink = document.getElementById('login-link');
    const profileLink = document.getElementById('profile-link');
    const logoutButton = document.getElementById('logoutButton');
    const sidebarCreateAdLink = document.querySelector('#sidebar a[href="/create-ad.html"]');
    const sidebarCarsLink = document.querySelector('#sidebar a[href="/cars.html"]');
    const sidebarModerationLink = document.getElementById('sidebar-moderation-link');

    if (token) {
        if (loginLink) loginLink.style.display = 'none';
        if (profileLink) profileLink.style.display = 'block';
        if (logoutButton) logoutButton.style.display = 'block';
        if (sidebarCreateAdLink) sidebarCreateAdLink.style.display = 'block';
        if (sidebarCarsLink) sidebarCarsLink.style.display = 'block';

        // Fetch user information to check role
        fetch('http://localhost:3000/api/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.role === 'admin') {
                if (sidebarModerationLink) {
                    sidebarModerationLink.style.display = 'block';
                }
            }
        })
        .catch(error => {
            console.error('Error fetching user profile in common.js:', error);
            // Optionally handle token expiration or invalid token here
            localStorage.removeItem('token');
            if (loginLink) loginLink.style.display = 'block';
            if (profileLink) profileLink.style.display = 'none';
            if (logoutButton) logoutButton.style.display = 'none';
            if (sidebarCreateAdLink) sidebarCreateAdLink.style.display = 'none';
            if (sidebarCarsLink) sidebarCarsLink.style.display = 'none';
            if (sidebarModerationLink) sidebarModerationLink.style.display = 'none';
        });

    } else {
        if (loginLink) loginLink.style.display = 'block';
        if (profileLink) profileLink.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'none';
        if (sidebarCreateAdLink) sidebarCreateAdLink.style.display = 'none';
        if (sidebarCarsLink) sidebarCarsLink.style.display = 'none';
        if (sidebarModerationLink) sidebarModerationLink.style.display = 'none';
        // Redirect to login only if not already on login page
        if (window.location.pathname !== '/login.html' && window.location.pathname !== '/register.html') {
            // window.location.href = '/login.html'; // This line is commented out to prevent automatic redirection
        }
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '/login.html';
        });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.querySelector('.closebtn');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (sidebar) sidebar.style.width = '250px';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (sidebar) sidebar.style.width = '0';
        });
    }
});