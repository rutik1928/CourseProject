document.addEventListener('DOMContentLoaded', async () => {
    const adListingsDiv = document.querySelector('.ad-listings');

    try {
        const response = await fetch('/api/ads');
        const ads = await response.json();

        if (response.ok) {
            if (ads.length === 0) {
                adListingsDiv.innerHTML = '<p>Пока нет объявлений.</p>';
                return;
            }

            adListingsDiv.innerHTML = ''; // Clear existing placeholder ads
            ads.forEach(ad => {
                const adCard = document.createElement('a'); // Change to <a> tag
                adCard.href = `/ad-details.html?id=${ad.id}`; // Set href to ad-details page with ad ID
                adCard.className = 'ad-card';
                adCard.innerHTML = `
                    <div class="ad-card-image-placeholder">Фото</div>
                    <div class="ad-card-details">
                        <h3><b>${ad.title}</b></h3>
                        <p>${ad.Car.brand}, ${ad.Car.year}, ${ad.Car.engine_type}, ${ad.mileage} км</p>
                        <p><b>${ad.price} у.е.</b></p>
                    </div>
                `;
                adListingsDiv.appendChild(adCard);
            });
        } else {
            adListingsDiv.innerHTML = `<p class="alert alert-danger">${ads.message || 'Ошибка при загрузке объявлений.'}</p>`;
        }
    } catch (error) {
        console.error('Error fetching ads:', error);
        adListingsDiv.innerHTML = '<p class="alert alert-danger">Произошла ошибка сети или сервера при загрузке объявлений.</p>';
    }
});