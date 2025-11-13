document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const moderationList = document.getElementById('moderation-list');

    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    // Function to fetch and display ads for moderation
    async function fetchAdsForModeration() {
        try {
            const response = await fetch('http://localhost:3000/api/admin/ads', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 403) {
                moderationList.innerHTML = '<p>У вас нет прав для просмотра этой страницы.</p>';
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const ads = await response.json();
            displayAdsForModeration(ads);

        } catch (error) {
            console.error('Error fetching ads for moderation:', error);
            moderationList.innerHTML = '<p>Ошибка при загрузке объявлений для модерации.</p>';
        }
    }

    // Function to display ads
    function displayAdsForModeration(ads) {
        moderationList.innerHTML = '';
        if (ads.length === 0) {
            moderationList.innerHTML = '<p>Нет объявлений для модерации.</p>';
            return;
        }

        ads.forEach(ad => {
            console.log('Processing ad:', ad); // Log each ad object
            const adCard = document.createElement('div');
            adCard.className = 'ad-card';
            try {
                adCard.innerHTML = `
                    <div class="ad-card-image-placeholder">Изображение</div>
                    <div class="ad-card-details">
                        <h3>${ad.title}</h3>
                        <p>Цена: ${ad.price} ₽</p>
                        <p>Статус: ${ad.status}</p>
                        <div class="moderation-actions">
                            <button class="approve-btn" data-id="${ad.id}">Одобрить</button>
                            <button class="reject-btn" data-id="${ad.id}">Отклонить</button>
                        </div>
                    </div>
                `;
                adCard.addEventListener('click', (event) => {
                    if (!event.target.closest('.moderation-actions')) {
                        window.location.href = `/ad-details.html?id=${ad.id}`;
                    }
                });
            } catch (renderError) {
                console.error('Error rendering ad card for ad:', ad, renderError);
                adCard.innerHTML = `<p>Error rendering ad: ${ad.id}</p>`;
            }
            moderationList.appendChild(adCard);
        });

        document.querySelectorAll('.approve-btn').forEach(button => {
            button.addEventListener('click', (event) => updateAdStatus(event.target.dataset.id, 'approved'));
        });

        document.querySelectorAll('.reject-btn').forEach(button => {
            button.addEventListener('click', (event) => updateAdStatus(event.target.dataset.id, 'rejected'));
        });
    }

    // Function to update ad status
    async function updateAdStatus(adId, status) {
        try {
            console.log(`Updating ad ${adId} status to ${status}`);
            const response = await fetch(`http://localhost:3000/api/admin/ads/${adId}/status`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(`Ad ${adId} status updated successfully. Refreshing list.`);
            fetchAdsForModeration(); // Refresh the list

        } catch (error) {
            console.error(`Error updating ad ${adId} status to ${status}:`, error);
            alert('Ошибка при обновлении статуса объявления.');
        }
    }

    fetchAdsForModeration();
});