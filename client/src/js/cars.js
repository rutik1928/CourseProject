document.addEventListener('DOMContentLoaded', () => {
    const brandFilter = document.getElementById('brandFilter');
    const modelFilter = document.getElementById('modelFilter');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const carsListDiv = document.getElementById('carsList');

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.querySelector('.closebtn');

    menuToggle.addEventListener('click', () => {
        sidebar.style.width = '250px';
    });

    closeBtn.addEventListener('click', () => {
        sidebar.style.width = '0';
    });

    let allCars = [];

    const fetchCars = async () => {
        try {
            const response = await fetch('/api/cars');
            const cars = await response.json();
            if (response.ok) {
                allCars = cars;
                populateFilters(cars);
                displayCars(cars);
            } else {
                carsListDiv.innerHTML = `<p class="alert alert-danger">${cars.message || 'Ошибка при загрузке списка автомобилей.'}</p>`;
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
            carsListDiv.innerHTML = '<p class="alert alert-danger">Произошла ошибка сети или сервера при загрузке автомобилей.</p>';
        }
    };

    const populateFilters = (cars) => {
        const brands = [...new Set(cars.map(car => car.brand))];
        brandFilter.innerHTML = '<option value="">Все марки</option>';
        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option);
        });

        brandFilter.addEventListener('change', () => {
            const selectedBrand = brandFilter.value;
            const models = [...new Set(allCars.filter(car => !selectedBrand || car.brand === selectedBrand).map(car => car.model))];
            modelFilter.innerHTML = '<option value="">Все модели</option>';
            models.forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelFilter.appendChild(option);
            });
        });
    };

    const displayCars = (carsToDisplay) => {
        carsListDiv.innerHTML = '';
        if (carsToDisplay.length === 0) {
            carsListDiv.innerHTML = '<p>Автомобили не найдены.</p>';
            return;
        }
        carsToDisplay.forEach(car => {
            const carCard = document.createElement('div');
            carCard.className = 'car-card';
            carCard.innerHTML = `
                <h3>${car.brand} ${car.model}</h3>
                <p>Год: ${car.year}</p>
                <p>Поколение: ${car.generation || 'Не указано'}</p>
                <p>Тип кузова: ${car.body_type}</p>
                <p>Тип двигателя: ${car.engine_type}</p>
                <p>Трансмиссия: ${car.transmission}</p>
                <p>Привод: ${car.drive_type}</p>
            `;
            carsListDiv.appendChild(carCard);
        });
    };

    applyFiltersBtn.addEventListener('click', () => {
        const selectedBrand = brandFilter.value;
        const selectedModel = modelFilter.value;

        let filteredCars = allCars;

        if (selectedBrand) {
            filteredCars = filteredCars.filter(car => car.brand === selectedBrand);
        }
        if (selectedModel) {
            filteredCars = filteredCars.filter(car => car.model === selectedModel);
        }
        displayCars(filteredCars);
    });

    fetchCars();
});