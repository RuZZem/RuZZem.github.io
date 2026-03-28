// Переменные для хранения данных
let allParts = [];
const catalogGrid = document.getElementById('catalogGrid');
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.querySelectorAll('.filter-btn');

// --- 1. Функция ЗАГРУЗКИ данных из JSON ---
async function loadCatalog() {
    try {
        const response = await fetch('parts.json'); // Путь к вашему JSON файлу
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        allParts = await response.json();
        renderCatalog(allParts); // Сразу рисуем все товары
    } catch (error) {
        console.error(error);
        catalogGrid.innerHTML = <p class="text-red-500 col-span-3 text-center py-20">Не удалось загрузить каталог. Проверьте консоль.</p>;
    }
}

// --- 2. Функция ОТРИСОВКИ карточек (с анимацией) ---
function renderCatalog(partsArray) {
    catalogGrid.innerHTML = ''; // Очищаем сетку

    if (partsArray.length === 0) {
        catalogGrid.innerHTML = <p class="text-gray-500 col-span-3 text-center py-20 fade-in">Ничего не найдено по вашему запросу.</p>;
        return;
    }

    partsArray.forEach((part, index) => {
        // Создаем HTML код карточки
        const cardHtml = `
            <div class="product-card bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col fade-in-up" style="animation-delay: ${index * 50}ms">
                <div class="w-full h-48 overflow-hidden bg-gray-100">
                    <img src="${part.image}" alt="${part.name}" class="w-full h-full object-cover">
                </div>
                
                <div class="p-5 flex-grow flex flex-col">
                    <span class="text-xs text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">${part.id}</span>
                    <h3 class="text-lg font-bold text-gray-900 mt-2 leading-snug">${part.name}</h3>
                    <p class="text-sm text-gray-500 mt-1 flex-grow">Модель: ${part.model}</p>
                    
                    <div class="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                        <span class="text-xl font-extrabold text-blue-950">${part.price}</span>
                        <a href="https://wa.me/99365616245?text=Здравствуйте, интересует ${part.name} (Артикул: ${part.id})" 
                           target="_blank"
                           class="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-200 transition-colors">
                           Заказать
                        </a>
                    </div>
                </div>
            </div>
        `;
        // Добавляем карточку в сетку
        catalogGrid.insertAdjacentHTML('beforeend', cardHtml);
    });
}

// --- 3. Логика ПОИСКА ---
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    const filteredParts = allParts.filter(part => 
        part.name.toLowerCase().includes(searchTerm) || 
        part.model.toLowerCase().includes(searchTerm) || 
        part.id.toLowerCase().includes(searchTerm)
    );
    
    renderCatalog(filteredParts);
});

// --- 4. Логика ФИЛЬТРА по категориям ---
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Убираем класс active у всех
        categoryButtons.forEach(btn => btn.classList.remove('active', 'bg-blue-50', 'text-blue-700'));
        categoryButtons.forEach(btn => btn.classList.add('text-gray-700', 'hover:bg-gray-100'));

        // 2. Добавляем active нажатой
        button.classList.add('active', 'bg-blue-50', 'text-blue-700');
        button.classList.remove('text-gray-700', 'hover:bg-gray-100');

        // 3. Фильтруем данные
        const category = button.dataset.category;
        
        if (category === 'all') {
            renderCatalog(allParts);
        } else {
            const filteredByCat = allParts.filter(part => part.category === category);
            renderCatalog(filteredByCat);
        }
    });
});

// --- Запуск ---
loadCatalog();
