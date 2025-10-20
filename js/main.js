// Файл /js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Обработка поиска
    document.querySelector('.search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = document.querySelector('.search-input').value.trim();
        if (searchTerm) {
            alert('Поиск: ' + searchTerm);
            document.querySelector('.search-input').value = '';
        }
    });

    // Обновление даты
    updateDate();
});

function updateDate() {
    const now = new Date();
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    };
    const dateString = now.toLocaleDateString('ru-RU', options);
    document.querySelector('.date-info a').textContent = 
        `Сегодня ${dateString} / 10 °C, 761 мм.`;
}