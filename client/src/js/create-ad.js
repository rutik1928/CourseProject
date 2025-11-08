document.addEventListener('DOMContentLoaded', () => {
    const createAdForm = document.getElementById('createAdForm');
    const messageDiv = document.getElementById('message');

    // Modal elements
    const carSelectionModal = document.getElementById('carSelectionModal');
    const openCarSelectionModalBtn = document.getElementById('openCarSelectionModal');
    const closeButton = carSelectionModal.querySelector('.close-button');
    const carListDiv = document.getElementById('carList');
    const confirmCarSelectionBtn = document.getElementById('confirmCarSelection');
    const selectedCarIdInput = document.getElementById('selectedCarId');
    const selectedCarDisplay = document.getElementById('selectedCarDisplay');

    let selectedCar = null;

    // Open modal
    openCarSelectionModalBtn.addEventListener('click', async () => {
        carSelectionModal.style.display = 'block';
        await fetchCarsAndPopulateModal();
    });

    // Close modal
    closeButton.addEventListener('click', () => {
        carSelectionModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target == carSelectionModal) {
            carSelectionModal.style.display = 'none';
        }
    });

    // Function to fetch cars and populate the modal
    const fetchCarsAndPopulateModal = async () => {
        try {
            const response = await fetch('/api/cars');
            const cars = await response.json();

            if (response.ok) {
                carListDiv.innerHTML = ''; // Clear existing cars
                cars.forEach(car => {
                    const carItem = document.createElement('div');
                    carItem.className = 'car-item';
                    carItem.dataset.carId = car.id;
                    carItem.innerHTML = `
                        <p><strong>${car.brand} ${car.model}</strong></p>
                        <p>${car.year} | ${car.engine_type} | ${car.transmission}</p>
                    `;
                    carItem.addEventListener('click', () => {
                        // Remove selected class from previously selected car
                        if (selectedCar) {
                            document.querySelector(`.car-item[data-car-id="${selectedCar.id}"]`).classList.remove('selected');
                        }
                        // Add selected class to current car
                        carItem.classList.add('selected');
                        selectedCar = car;
                    });
                    carListDiv.appendChild(carItem);
                });
            } else {
                console.error('Failed to fetch cars:', cars.message);
                carListDiv.innerHTML = `<p class="alert alert-danger">${cars.message || 'Ошибка при загрузке списка автомобилей.'}</p>`;
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
            carListDiv.innerHTML = '<p class="alert alert-danger">Произошла ошибка сети или сервера при загрузке автомобилей.</p>';
        }
    };

    // Confirm car selection
    confirmCarSelectionBtn.addEventListener('click', () => {
        if (selectedCar) {
            selectedCarIdInput.value = selectedCar.id;
            selectedCarDisplay.textContent = `${selectedCar.brand} ${selectedCar.model} (${selectedCar.year})`;
            carSelectionModal.style.display = 'none';
        } else {
            alert('Пожалуйста, выберите автомобиль.');
        }
    });

    // Handle form submission
    createAdForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const carId = selectedCarIdInput.value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value; // Added price field
        const mileage = document.getElementById('mileage').value;
        const color = document.getElementById('color').value;
        const car_condition = document.getElementById('car_condition').value;

        if (!carId) {
            messageDiv.className = 'alert alert-danger';
            messageDiv.textContent = 'Пожалуйста, выберите автомобиль.';
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                messageDiv.className = 'alert alert-danger';
                messageDiv.textContent = 'Вы не авторизованы. Пожалуйста, войдите в систему.';
                return;
            }

            const response = await fetch('/api/ads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    carId,
                    title,
                    description,
                    price, // Added price to body
                    mileage,
                    color,
                    car_condition
                })
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.className = 'alert alert-success';
                messageDiv.textContent = 'Объявление успешно создано!';
                createAdForm.reset();
                selectedCarIdInput.value = ''; // Clear selected car
                selectedCarDisplay.textContent = '';
                selectedCar = null;
                window.location.href = '/profile.html';
            } else {
                messageDiv.className = 'alert alert-danger';
                messageDiv.textContent = data.message || 'Ошибка при создании объявления.';
            }
        } catch (error) {
            console.error('Ошибка:', error);
            messageDiv.className = 'alert alert-danger';
            messageDiv.textContent = 'Произошла ошибка сети или сервера.';
        }
    });
});


            const menuToggle = document.getElementById('menu-toggle');
            const sidebar = document.getElementById('sidebar');
            const closeBtn = document.querySelector('.closebtn');

            menuToggle.addEventListener('click', () => {
                sidebar.style.width = '250px';
            });

            closeBtn.addEventListener('click', () => {
                sidebar.style.width = '0';
            });