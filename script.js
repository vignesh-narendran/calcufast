$(document).ready(() => {
	resetAll();
	setIntFun = () => {
		$('progress').val($('progress').val() - 1.25);
		if ($('progress').val() == 0) {
			clearInterval(timer);
			resetChance();
			if (lcount > 0) fillLife(--lcount);
		}
	};

	$('#start-btn-i').click(() => {
		resetChance();
		$('.instruction-c').hide();
		$('.question-c').text(levelUp(count));
		$('.game-c').show();
	});

	$('.ip-c').click((e) => {
		$('.answer-box-c').val($('.answer-box-c').val() + e.target.value);
	});

	$('#bs-i').click(() => {
		var removeChar = $('.answer-box-c').val();
		if (removeChar.length)
			$('.answer-box-c').val(removeChar.slice(0, removeChar.length - 1));
	});

	$('#enter-i').click(() => {
		if (eval(finalQuestion) == $('.answer-box-c').val()) {
			count++;
		} else {
			fillLife(--lcount);
		}
		resetChance();
	});

	$('#play-again-i').click(() => {
		clearInterval(timer);
		resetAll();
	});
});

//reset timer and questions
const resetChance = () => {
	$('.answer-box-c').val('');
	$('.question-c').text(levelUp(count));
	$('progress').val(100);
	clearInterval(timer);
	timer = setInterval(setIntFun, 100);
};

//set lives
const fillLife = (lcount) => {
	$('#lives-i').html('').removeClass();
	switch (lcount) {
		case 3:
			$('#lives-i').addClass('lives-good-c');
			break;
		case 2:
			$('#lives-i').addClass('lives-warn-c');
			break;
		case 1:
			$('#lives-i').addClass('lives-poor-c');
			break;
		case 0:
			$('.scorecard-span-c').text(count);
			$('.scorecard-c').show();
			clearInterval(timer);
			$('.keys-c').attr('disabled', 'disabled');
			break;
		default:
			$('#lives-i').hide();
			break;
	}
	while (lcount) {
		$('#lives-i').append('&#x2764; &nbsp');
		lcount--;
	}
};

//initiate questions data
const fillData = (rangeVal) => {
	var fillDataArr = [];
	for (var i = 1; i <= rangeVal; i++) {
		fillDataArr.push(i);
	}
	return fillDataArr;
};

//change level of the game
const levelUp = (gameCount) => {
	return (
		getQuestions(gameCount > 20 ? difficult : gameCount > 10 ? medium : easy) +
		' = '
	);
};

//get operands and operator
const getQuestions = (level) => {
	do {
		var op1 = level[randomize(level.length)];
		var op2 = level[randomize(level.length)];
		var op = operator[randomize(operator.length)];
		finalQuestion = `${op1} ${op} ${op2}`;
	} while (eval(finalQuestion) < 0);
	return finalQuestion;
};

//choose a random number for the given input
const randomize = (input) => {
	return Math.floor(Math.random() * input);
};

//reset all values to default
const resetAll = () => {
	fillLife(3);
	$('.game-c').hide();
	$('.scorecard-c').hide();
	$('.keys-c').removeAttr('disabled');
	$('.instruction-c').show();
	$('progress').val(100);
	easy = fillData(15);
	medium = fillData(25);
	difficult = fillData(50);
	operator = ['+', '-', '*'];
	count = 0;
	lcount = 3;
	timer = null;
	finalQuestion = 'NA';
};
