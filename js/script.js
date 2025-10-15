let totalSum = 0;
let resultSum = 0;

const basePrices = {
    guitar: 500,
    drums: 1000,
    piano: 1500
};

const drumOptionsPrices = {
    standard: 0,
    professional: 200,
    premium: 500
};

const pianoPropertyPrice = 300;

// Функция обновления динамических полей
function updateDynamicFields() {
    const selectedInstrument = document.querySelector('input[name="instrumentType"]:checked').value;
    const optionsGroup = document.getElementById('optionsGroup');
    const propertiesGroup = document.getElementById('propertiesGroup');
    
    // Скрываем все динамические поля
    optionsGroup.style.display = 'none';
    propertiesGroup.style.display = 'none';
    
    // Показываем соответствующие поля в зависимости от выбранного инструмента
    switch(selectedInstrument) {
        case 'guitar':
            // Гитара - без дополнительных опций и свойств
            break;
        case 'drums':
            // Ударные - только опции (селект)
            optionsGroup.style.display = 'block';
            break;
        case 'piano':
            // Пианино - только свойство (чекбокс)
            propertiesGroup.style.display = 'block';
            break;
    }
    
    // Пересчитываем стоимость при изменении типа
    calculateTotal(false);
}

function calculateTotal(addToTotal = false) {
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    const selectedInstrument = document.querySelector('input[name="instrumentType"]:checked').value;
    const output = document.getElementById('result');
    
    let baseCost = basePrices[selectedInstrument];
    let additionalCost = 0;
    let details = [];

    // Расчет дополнительных costs в зависимости от типа инструмента
    if(quantity>0){
    switch(selectedInstrument) {
        case 'drums':
            const drumOptions = document.getElementById('drumOptions');
            const selectedOption = drumOptions.value;
            additionalCost = drumOptionsPrices[selectedOption];
            details.push(`Базовая стоимость: ${baseCost}$`);
            if (additionalCost > 0) {
                details.push(`Комплектация: +${additionalCost}$`);
            }
            break;
            
        case 'piano':
            const pianoProperty = document.getElementById('pianoProperty');
            if (pianoProperty.checked) {
                additionalCost = pianoPropertyPrice;
                details.push(`Базовая стоимость: ${baseCost}$`);
                details.push(`Гарантия и настройка: +${additionalCost}$`);
            } else {
                details.push(`Базовая стоимость: ${baseCost}$`);
            }
            break;
            
        case 'guitar':
            details.push(`Базовая стоимость: ${baseCost}$`);
            break;
    }

    // Итоговый расчет
    const totalPerUnit = baseCost + additionalCost;
    totalSum = totalPerUnit * quantity;

    // Формируем результат
    let resultHTML = `
        <div class="result-item">
            <span>Количество:</span>
            <span>${quantity} шт.</span>
        </div>
    `;
    
    details.forEach(detail => {
        resultHTML += `
            <div class="result-item">
                <span>${detail.split(':')[0]}:</span>
                <span>${detail.split(':')[1]}</span>
            </div>
        `;
    });
    
    if(addToTotal === true){
        resultSum += totalSum;
    }
    
    resultHTML += `
        <div class="result-item">
            <span>Стоимость за единицу:</span>
            <span>${totalPerUnit}$</span>
        </div>
        <div class="result-total">
            <span>Общая стоимость:</span>
            <span>${resultSum}$</span>
        </div>
    `;

    // Отображаем результат
    output.innerHTML = resultHTML;
    console.log("Текущий расчет: " + totalSum + "$");
    console.log("Накопленная сумма: " + resultSum + "$");
    }
}

// Функция для кнопки расчета
function click1() {
    calculateTotal(true);
    return false; // чтобы форма не перезагружала страницу
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', function (event) {
    // Находим элементы
    const button = document.getElementById("button");
    const quantityInput = document.getElementById('quantity');
    const instrumentRadios = document.querySelectorAll('input[name="instrumentType"]');
    const drumOptions = document.getElementById('drumOptions');
    const pianoProperty = document.getElementById('pianoProperty');
    
    // Добавляем обработчики событий для автоматического пересчета
    
    // Обработчик для кнопки
    if (button) {
        button.addEventListener("click", click1);
    }
    
    quantityInput.addEventListener('input', function() {
        calculateTotal(false);
    });
    
    // Обработчики изменения типа инструмента
    instrumentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateDynamicFields();
            calculateTotal(false);
        });
    });
    
    // Обработчик изменения опций ударных
    if (drumOptions) {
        drumOptions.addEventListener('change', function() {
            calculateTotal(false);
        });
    }
    
    // Обработчик изменения свойства пианино
    if (pianoProperty) {
        pianoProperty.addEventListener('change', function() {
            calculateTotal(false);
        });
    }
    
    // Инициализация при загрузке - ИСПРАВЛЕНО: передаем параметр
    updateDynamicFields();
    calculateTotal(false);
});
