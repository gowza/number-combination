var selectedNumbers = [];

function generateCombination(n, numbers) {
  if (n === 1) {
    return numbers;
  }

  if (numbers.length === 0) {
    return [];
  }

  var i;
  var output = [];
  var b = generateCombination(n - 1, numbers.slice(1));

  for (i = 0; i < b.length; i += 1) {
    output.push(numbers[0] + b[i]);
  }

  return output.concat(generateCombination(n, numbers.slice(1)));
}

function selectNumber(selectionElm) {
  var number = selectionElm.textContent;
  var selection = $(selectionElm);

  selection.toggleClass('selected');

  if (selection.hasClass('selected')) {
    selectedNumbers.push(number);
  } else {
    selectedNumbers = selectedNumbers.filter(function(selectedNumber) {
      return selectedNumber !== number;
    });
  }

  selectedNumbers = selectedNumbers.sort();
}

function displayClipboardMessage() {
  var modal = $('.modal');

  modal.addClass('active');

  setTimeout(function () {
    modal.addClass('active-fade');

    setTimeout(function () {
      modal.removeClass('active active-fade');
    }, 300)
  }, 500);
}

$(function() {
  var numberSelections = $('.number-selector > div > div');
  var combinationsInputs = $('.combinations-input');
  var copyButtons = $('.copy-button');

  numberSelections.click(function(event) {
    var twos = document.getElementById('twos');
    var threes = document.getElementById('threes');
    var twosButton = $('#twos-button');
    var threesButton = $('#threes-button');

    event.preventDefault();

    selectNumber(event.target);

    // Generate twos and threes combinations.
    twos.value = generateCombination(2, selectedNumbers).join(' ');
    threes.value = generateCombination(3, selectedNumbers).join(' ');

    twosButton.prop('disabled', twos.value.length === 0);
    threesButton.prop('disabled', threes.value.length === 0);
  });

  copyButtons.click(function(event) {
    var data = $(event.target).parent('div').find('p > input');

    data[0].select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    displayClipboardMessage();
  });

  // Prevent editing input elements used to display combinations.
  combinationsInputs.on('keydown', function(event) {
    event.preventDefault();
  });
});
