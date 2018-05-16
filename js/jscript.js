$(function(){




	var a = Math.floor(6 + Math.random() * 4); //зададим число A в промежутке от 6 до 9
	var result = Math.floor(11 + Math.random() * 4); //зададим результат в промежутке от 11 до 14
	var b = result - a; //вычислим b
	var inputNum; //введем переменную номера шага 

	var line_w = $('.scale').width()-95; //вычисляем размеры шкалы минус отступы по краям
	$('#arrowArea').attr("width",line_w).css({   //зададим параметры полю для рисования стрелок
		"position": "absolute",
		"top": "35px",
		"left": "84px"
	});
	var line_step = line_w / 20;  //рассчет цены деления шкалы
	var arrowTop = 130; // отступ стрелки от верха поля
	var arrowRadius = 40; // закругление стрелки
	var leftPadding = 0; //отступ от начала координат до второй стрелки
	var left = 80; //отступ от края до начала координат


	ctx = document.getElementById("arrowArea").getContext("2d");
	ctx.strokeStyle="#FF0000";

	$('.example__a').text(a);
	$('.example__b').text(b);

	step(1); //при загрузке страницы запускаем первый шаг
		


function step(num) {  //распеределение шагов в зависимости от введенных данных
	inputNum=num;
	if(num == 1) {
		step1(inputNum);
	}
	else if (num == 2) {
		step2(inputNum);
	}
	else if (num == 3) {
		step3(inputNum);
	}
	
}

//шаги выполнения

function step1(inputNum) {
	drawArrows(a, leftPadding, arrowTop, line_step, arrowRadius);   //рисуем первую стрелку
	$('#input1').focus().parent().css('left', a*line_step/2+70); // выводим первый инпут, сдвигаем его относительно середины стрелки плюс отступы шкалы
	calcInput(a, inputNum); //сравниваем введенное значение
}
function step2(inputNum) {
	leftPadding = a*line_step; // отступ для второй стрелки
	drawArrows(b, a*line_step, arrowTop, line_step, arrowRadius+40); //рисовка второй стрелки, +40 уменьшает угол наклона дуги т.к. числа маленькие
	$('#input2').parent().fadeIn(400).css('left', b*line_step/2+70+a*line_step).children().focus(); //появление 2 инпута и сдвиг относительно середины дуги + отступ + первая дуга
	calcInput(b, inputNum); //сравниваем введенное значение
}
function step3(inputNum) { //смена знака вопроса на последний инпут
	$('.example__result input')
		.val('')
		.removeAttr('readonly')
		.css("border", "4px solid orange")
		.focus();
	calcInput(result, inputNum);
}


function drawArrows(aLength, leftPadding, arrowTop, line_step, arrowRadius) { //отрисовка стрелок
 
		
			ctx.beginPath();
			ctx.moveTo(0+leftPadding, arrowTop);
			ctx.quadraticCurveTo(line_step*aLength/2+leftPadding, arrowRadius, line_step*aLength+leftPadding, arrowTop);
			ctx.moveTo(line_step*aLength-aLength/2+leftPadding, arrowTop-10);
			ctx.lineTo(line_step*aLength+leftPadding, arrowTop);
			ctx.lineTo(line_step*aLength-12+leftPadding, arrowTop);
			ctx.stroke();
		

}

function calcInput(param1, inputNum, event) {
	$('#input'+inputNum).keyup(function() { //при наборе в инпут
		var inputVal = $(this).val();
		
		if(/^\d+$/.test(inputVal)==false) { //проверка на число
			$(this).val('');
		}
		else {

		}

		if(inputNum == 3) {  //вычисление результата сложения примера, выполняется в самом конце
			if(inputVal == param1) {
				$(this).css({"borderColor": "transparent"});
				alert('Решено верно')
			}
			else if (inputVal == '' || inputVal != param1) {
				$(this).css({"borderColor": "red"});
			}
		}


		if(inputVal == param1) { //если число, введенное в инпут совпадает с примером, запускается следующий шаг и закрывается возможность ввода в инпут 
			$(this).addClass('ready');
			$(this).attr('disabled', 'disabled');
			$('.example__'+inputNum).css('backgroundColor', 'transparent');
			if(inputNum == 1) {
				step(2);
			}
			else if(inputNum == 2) {
				step(3);
			}

			
		}
		else if (inputVal == '') { //очистка подсветки числа из примера при пустом инпут
			$('.example__'+inputNum).css('backgroundColor', 'transparent');
		}
		else if (inputVal < param1 || inputVal > param1){ //подсветка числа из примера
			$('.example__'+inputNum).css('backgroundColor', 'orange');
		}
	});
}



});