document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const userAdsList = document.getElementById('user-ads-list');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    let currentFilter = 'approved';

    const updateAdCounts = async () => {
        const statuses = ['approved', 'pending', 'rejected'];
        for (const status of statuses) {
            try {
                const response = await fetch(`http://localhost:3000/api/ads/my?status=${status}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const ads = await response.json();
                document.getElementById(`${status}-count`).textContent = ads.length;
            } catch (error) {
                console.error(`Ошибка при получении количества объявлений для статуса ${status}:`, error);
                document.getElementById(`${status}-count`).textContent = '-';
            }
        }
    };

    const fetchUserAds = async (status) => {
        userAdsList.innerHTML = 'Загрузка объявлений...';
        try {
            const response = await fetch(`http://localhost:3000/api/ads/my?status=${status}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const ads = await response.json();
            displayUserAds(ads);
        } catch (error) {
            console.error('Ошибка при получении объявлений пользователя:', error);
            userAdsList.innerHTML = '<p>Не удалось загрузить объявления.</p>';
        }
    };

    const displayUserAds = (ads) => {
        userAdsList.innerHTML = '';
        if (ads.length === 0) {
            userAdsList.innerHTML = '<p>У вас пока нет объявлений в этой категории.</p>';
            return;
        }

        ads.forEach(ad => {
            const adCard = document.createElement('div');
            adCard.className = 'ad-card';
            adCard.innerHTML = `
                <h3>${ad.title}</h3>
                <p>Цена: ${ad.price} руб.</p>
                <p>Статус: ${ad.status}</p>
                <a href="/ad-details.html?id=${ad.id}">Подробнее</a>
            `;
            userAdsList.appendChild(adCard);
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.status;
            fetchUserAds(currentFilter);
        });
    });

    // Initial fetch and count update
    document.querySelector('.filter-btn[data-status="approved"]').classList.add('active');
    fetchUserAds(currentFilter);
    updateAdCounts();
});