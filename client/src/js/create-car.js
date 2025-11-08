document.addEventListener('DOMContentLoaded', () => {
    const createCarForm = document.getElementById('create-car-form');

    createCarForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const make = document.getElementById('make').value;
        const model = document.getElementById('model').value;
        const year = parseInt(document.getElementById('year').value);
        const engine_type = document.getElementById('engine_type').value;
        const transmission_type = document.getElementById('transmission_type').value;
        const body_type = document.getElementById('body_type').value;

        const carData = {
            make,
            model,
            year,
            engine_type,
            transmission_type,
            body_type
        };

        try {
            const response = await fetch('/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carData),
            });

            if (response.ok) {
                alert('Автомобиль успешно добавлен!');
                createCarForm.reset();
            } else {
                const errorData = await response.json();
                alert(`Ошибка при добавлении автомобиля: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
            alert('Произошла ошибка сети. Пожалуйста, попробуйте еще раз.');
        }
    });
});