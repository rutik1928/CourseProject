document.addEventListener('DOMContentLoaded', async () => {
    const adDetailsContainer = document.getElementById('ad-details-container');

    const urlParams = new URLSearchParams(window.location.search);
    const adId = urlParams.get('id');

    if (!adId) {
        adDetailsContainer.innerHTML = '<p class="alert alert-danger">Идентификатор объявления не указан.</p>';
        return;
    }

    try {
        const response = await fetch(`/api/ads/${adId}`);
        const ad = await response.json();

        if (response.ok) {
            document.getElementById('ad-title').textContent = ad.title;
            document.getElementById('ad-creation-date').textContent = `Создано: ${new Date(ad.created_at).toLocaleDateString()}`;
            document.getElementById('car-make-model-generation').textContent = `${ad.Car.brand} ${ad.Car.model} ${ad.Car.generation || ''}`;

            const adDetailsContent = document.getElementById('ad-details-content');
            adDetailsContent.innerHTML = `
                <p><strong>Цена:</strong> ${ad.price} руб.</p>
                <p><strong>Пробег:</strong> ${ad.mileage} км</p>
                <p><strong>Состояние:</strong> ${ad.car_condition}</p>
                <p><strong>Описание:</strong> ${ad.description}</p>
                <p><strong>Тип кузова:</strong> ${ad.Car.body_type || 'Не указано'}</p>
                <p><strong>Тип двигателя:</strong> ${ad.Car.engine_type || 'Не указано'}</p>
                <p><strong>Трансмиссия:</strong> ${ad.Car.transmission || 'Не указано'}</p>
                <p><strong>Тип привода:</strong> ${ad.Car.drive_type || 'Не указано'}</p>
                <p><strong>Цвет:</strong> ${ad.color || 'Не указано'}</p>
                <p><strong>Статус объявления:</strong> ${ad.status}</p>
            `;
        } else {
            adDetailsContainer.innerHTML = `<p class="alert alert-danger">${ad.message || 'Ошибка при загрузке подробностей объявления.'}</p>`;
        }
    } catch (error) {
        console.error('Error fetching ad details:', error);
        adDetailsContainer.innerHTML = '<p class="alert alert-danger">Произошла ошибка сети или сервера при загрузке подробностей объявления.</p>';
    }
});