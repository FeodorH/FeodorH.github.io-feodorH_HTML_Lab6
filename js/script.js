document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calculatorForm');
    const quantityInput = document.getElementById('quantity');
    const instrumentRadios = document.querySelectorAll('input[name="instrumentType"]');
    const optionsGroup = document.getElementById('optionsGroup');
    const drumOptions = document.getElementById('drumOptions');
    const propertiesGroup = document.getElementById('propertiesGroup');
    const pianoProperty = document.getElementById('pianoProperty');
    const resultDiv = document.getElementById('result');

    // Цены базовых инструментов
    const basePrices = {
        guitar: 500,
        drums: 1000,
        piano: 1500
    };

    // Дополнительные стоимости для опций ударных
    const drumOptionsPrices = {
        standard: 0,
        professional: 200,
        premium: 500
    };

    // Дополнительная стоимость для свойства пианино
    const pianoPropertyPrice = 300;

    // Обработчик изменения типа инструмента
    instrumentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateDynamicFields();
            calculateCost(); // Добавлен вызов расчета
        });
    });

    // Функция обновления динамических полей
    function updateDynamicFields() {
        const selectedInstrument = document.querySelector('input[name="instrumentType"]:checked').value;
        
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
    }

    // Функция расчета стоимости
    function calculateCost() {
        const quantity = parseInt(quantityInput.value) || 1;
        const selectedInstrument = document.querySelector('input[name="instrumentType"]:checked').value;
        
        let baseCost = basePrices[selectedInstrument];
        let additionalCost = 0;
        let details = [];

        // Расчет дополнительных costs в зависимости от типа инструмента
        switch(selectedInstrument) {
            case 'drums':
                const selectedOption = drumOptions.value;
                additionalCost = drumOptionsPrices[selectedOption];
                details.push(`Базовая стоимость: ${baseCost}$`);
                details.push(`Комплектация: +${additionalCost}$`);
                break;
                
            case 'piano':
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
        const totalCost = totalPerUnit * quantity;

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
        
        resultHTML += `
            <div class="result-item">
                <span>Стоимость за единицу:</span>
                <span>${totalPerUnit}$</span>
            </div>
            <div class="result-total">
                <span>Общая стоимость:</span>
                <span>${totalCost}$</span>
            </div>
        `;

        // Отображаем результат с анимацией
        resultDiv.innerHTML = resultHTML;
        resultDiv.classList.add('fade-in');
    }

    // Обработчики изменений для автоматического пересчета
    quantityInput.addEventListener('input', calculateCost);
    drumOptions.addEventListener('change', calculateCost);
    pianoProperty.addEventListener('change', calculateCost);

    // Инициализация при загрузке страницы
    updateDynamicFields();
    calculateCost(); // Добавлен первоначальный расчет
});
