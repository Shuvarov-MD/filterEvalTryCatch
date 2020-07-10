const filterByType = (type, ...values) => values.filter(value => typeof value === type), //объявление функции filterByType с параметрами type и всех values (с помощью Spread-оператора), в результате функция возвращает массив с элементами, отфильтрованными по типу данных

	hideAllResponseBlocks = () => { //объявление функции hideAllResponseBlocks без параметров
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //создание массива responseBlocksArray из элементов HTML-коллекции с селекторами 'div.dialog__response-block'
		responseBlocksArray.forEach(block => block.style.display = 'none'); //перебор массива responseBlocksArray методом forEach с добавлением к каждому элементу массива css-свойтва 'display: none' (элементы скрыты на странице)
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //объявление функции showResponseBlock с тремя параметрами blockSelector, msgText, spanSelector
		hideAllResponseBlocks(); //запуск функции hideAllResponseBlocks
		document.querySelector(blockSelector).style.display = 'block'; //добавление к элементу, переданого в параметр blockSelector, css-свойтва 'display: block' (элемент становится видимым на странице)
		if (spanSelector) { //условие - если spanSelector передан в функцию
			document.querySelector(spanSelector).textContent = msgText; //добавление к элементу, переданого в параметр spanSelector, текстового содержимого msgText
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //объявление функции showError с параметром msgText с вызовом в теле функции showResponseBlock

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //объявление функции showResults с параметром msgText с вызовом в теле функции showResponseBlock

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //объявление функции showResults с без параметров с вызовом в теле функции showResponseBlock

	tryFilterByType = (type, values) => { //объявление функции tryFilterByType с двумя параметрами type и values
		try { //запуск конструкции try-catch, выполнение try
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //присвоение данных в константу valuesArray: метод eval запускает функцию filterByType, представленной строкой, в результате выполнения функции элементы полученного массива методом join объединяются в строку
			const alertMsg = (valuesArray.length) ? //присвоение данных в константу alertMsg с помощью тернарного оператора: проверяется условие valuesArray.length (длина строки valuesArray больше 0)
				`Данные с типом ${type}: ${valuesArray}` : //если условие выполняется, то в alertMsg присваивается `Данные с типом ${type}: ${valuesArray}`
				`Отсутствуют данные типа ${type}`; //если условие не выполняется , то в alertMsg присваивается `Отсутствуют данные типа ${type}`
			showResults(alertMsg); //запуск функции showResults
		} catch (e) { //выполение catch, если в try возникла ошибка
			showError(`Ошибка: ${e}`); //запуск функции showError
		}
	};

const filterButton = document.querySelector('#filter-btn'); //поиск по селектору (id) кнопку фильтра

filterButton.addEventListener('click', e => { //добавление к кнопке события "клик"
	const typeInput = document.querySelector('#type'); //поиск по селектору (id) select
	const dataInput = document.querySelector('#data'); //поиск по селектору (id) input для ввода данных от пользователя

	if (dataInput.value === '') { //условие - если значение в input - пустая строка, то
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //установка к input специального сообщения - 'Поле не должно быть пустым!'
		showNoResults(); //запуск функции showNoResults
	} else { //если if не выполняется
		dataInput.setCustomValidity(''); //установка к input пустого специального сообщения
		e.preventDefault(); //отмена действия по умолчанию для form
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //запуск функции tryFilterByType с параметрами typeInput.value (значение из select) и dataInput.value (данные из input) (с удаленными пробелами в начале и конце строки)
	}
});

