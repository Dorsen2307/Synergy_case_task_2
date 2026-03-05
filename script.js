document.addEventListener("DOMContentLoaded", () => {
	const valueEl = document.getElementById('value');
	const decrementBtn = document.getElementById('decrement');
	const incrementBtn = document.getElementById('increment');
	const resultWindow = document.getElementById('resultWindow');
	const extremeMessage = document.getElementById('extremeMessage');
	
	// Границы счетчика
	const MIN_VALUE = -10;
	const MAX_VALUE = 10;
	
	let counter = 0;
	
	// Функция для интерполяции цвета между двумя значениями
	function interpolateColor(color1, color2, factor) {
		// Парсим hex в RGB
		const parseHex = (hex) => {
			const r = parseInt(hex.slice(1, 3), 16);
			const g = parseInt(hex.slice(3, 5), 16);
			const b = parseInt(hex.slice(5, 7), 16);
			return [r, g, b];
		};
		
		const [r1, g1, b1] = parseHex(color1);
		const [r2, g2, b2] = parseHex(color2);
		
		// Интерполяция
		const r = Math.round(r1 + factor * (r2 - r1));
		const g = Math.round(g1 + factor * (g2 - g1));
		const b = Math.round(b1 + factor * (b2 - b1));
		
		return `rgb(${r}, ${g}, ${b})`;
	}
	
	// Функция обновления цвета окна с плавным переходом
	function updateColor() {
		let targetColor;
		
		if (counter >= 0) {
			// Для положительных значений и нуля: от красного до желтого
			// factor = 0 для 0, factor = 1 для +10
			const factor = counter / MAX_VALUE;
			targetColor = interpolateColor('#e74c3c', '#f1c40f', factor);
		}
		else {
			// Для отрицательных значений: от красного до зеленого
			// factor = 0 для 0, factor = 1 для -10
			// Преобразуем, чтобы получить положительное число для интерполяции
			const factor = Math.abs(counter) / Math.abs(MIN_VALUE);
			targetColor = interpolateColor('#e74c3c', '#2ecc71', factor);
		}
		
		// Применяем цвет
		resultWindow.style.backgroundColor = targetColor;
		
		// Обновляем тень под цвет
		resultWindow.style.boxShadow = `inset 0 8px 12px rgba(0,0,0,0.4), 0 0 20px ${targetColor.replace('rgb', 'rgba').replace(')', ', 0.5)')}`;
	}
	
	// Функция обновления сообщения об экстремальном значении
	function updateExtremeMessage() {
		// Убираем предыдущие классы
		extremeMessage.classList.remove('visible', 'max-reached', 'min-reached');
		
		if (counter === MAX_VALUE) {
			// Достигнут максимум
			extremeMessage.classList.add('visible', 'max-reached');
		}
		else if (counter === MIN_VALUE) {
			// Достигнут минимум
			extremeMessage.classList.add('visible', 'min-reached');
		}
	}
	
	// Функция обновления состояния кнопок (блокировка на границах)
	function updateButtonsState() {
		decrementBtn.disabled = counter <= MIN_VALUE;
		incrementBtn.disabled = counter >= MAX_VALUE;
	}
	
	// Функция обновления всего дисплея
	function updateDisplay() {
		valueEl.textContent = counter;
		updateColor();
		updateButtonsState();
		updateExtremeMessage();
	}
	
	// Обработчики
	decrementBtn.addEventListener('click', () => {
		if (counter > MIN_VALUE) {
			counter -= 1;
			updateDisplay();
		}
	});
	
	incrementBtn.addEventListener('click', () => {
		if (counter < MAX_VALUE) {
			counter += 1;
			updateDisplay();
		}
	});
	
	
	// Инициализация
	updateDisplay();
})