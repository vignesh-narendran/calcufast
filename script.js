$(document).ready(() => {
	fillLife(3);

	easy = fillData(25);
	medium = fillData(50);
	difficult = fillData(100);

	count = 6;
	levelUp(count);
});
const fillLife = (count) => {
	$('#lives-i').html('');
	$('#lives-i').removeClass();
	switch (count) {
		case 3:
			$('#lives-i').addClass('lives-good-c');
			break;
		case 2:
			$('#lives-i').addClass('lives-warn-c');
			break;
		case 1:
			$('#lives-i').addClass('lives-poor-c');
		case 0:
			$('.scorecard-c').show();
			break;
		default:
			$('#lives-i').hide();
			break;
	}
	while (count) {
		$('#lives-i').append('&#x2764; &nbsp');
		count--;
	}
};

const fillData = (rangeVal) => {
	var fillDataArr = [];
	for (var i = 1; i <= rangeVal; i++) {
		fillDataArr.push(i);
	}
	return fillDataArr;
};

const levelUp = (gameCount) => {
	getQuestions(gameCount > 20 ? difficult : gameCount > 10 ? medium : easy);
};

const getQuestions = (level) => {
	console.log(level);
};
