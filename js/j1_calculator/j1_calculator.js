'use strict';

var j1Calculator = (function($) {
  var options = {
    compiledTemplate: true,
    templateLocation: '/js/j1_calculator/j1CalculatorTemplate.html',
    handlebarsTemplateInternalName: 'j1CalculatorTemplate.html',
    mainContainer: '#j1-calculator',
    dataFileLocation: 'https://cdn.jsdelivr.net/gh/dennowong/globalinternships/js/j1_calculator/j1_calculator_pricebook.js'
  };

  function addEvents() {
    $('#j1-price-step-minus').click(function() {
      var text = $('#j1-current-months').text().split(/([0-9]+)\s/);
      text[1] = parseInt(text[1]);
      if(text[1] > 1) {
        text[1]--;
      }
      if(text[1] === 1) {
        text[2] = 'month';
      }
      else {
        text[2] = 'months';
      }

      $('#j1-current-months').text(text[1]+' '+text[2]);
      calculatePrice();
    });

    $('#j1-price-step-plus').click(function() {
      var text = $('#j1-current-months').text().split(/([0-9]+)\s/);
      text[1] = parseInt(text[1]);
      if(text[1] < 18 ) {
        text[1]++;
      }

      if(text[1] === 1) {
        text[2] = 'month';
      }
      else {
        text[2] = 'months';
      }

      $('#j1-current-months').text(text[1]+' '+text[2]);
      calculatePrice();
    });

    $('#j1-country').change(function() {
      if($('#j1-country option:selected').val() === "" || $('#j1-country option:selected').val() === "undefined") {
        $('.j1-selector-toggle').removeClass('j1-selector-active');
      }
      else {
        $('.j1-selector-toggle').addClass('j1-selector-active');
        calculatePrice();
      }
    });

    $('#j1-country').select2({
      theme: 'classic',
      placeholder: "Select Country",
      allowClear: true,
      width: '100%',
      sortResults: function (results, container, query) {
        results.sort(function (a, b) {
          return a.text < b.text ? -1 : 1;
        });
        return results;
      }
    });
  }

  function calculatePrice() {
    var pricebook = $('#j1-country option:selected').attr('data-pricebook');
    var text = $('#j1-current-months').text().split(/([0-9]+)\s/);
    var numMonths = text[1];
    var currPricebook = priceBooks.filter(function(element) {
      return element.id == pricebook;
    });
    var currency = currencies.filter(function(element) {
      return element.name == currPricebook[0].currency;
    });
    var currPrice = 0;
    var americas_prices = [0,65, 130, 300, 365, 430, 600, 665, 730, 900, 965, 1030, 1200, 1265, 1330, 1395, 1460, 1525];
    var germany_prices = [0, 0, 0, 90, 90, 90, 180, 180, 180, 320, 320, 320, 460, 460, 460, 460, 460, 460];
    var korea_prices = [0, 50, 100, 150, 200, 250, 370, 480, 600, 620, 800, 950, 1070, 1180, 1300, 1410, 1530, 1650];

    if(numMonths >= currPricebook[0].monthStartsCounting && currPricebook[0].name == "Americas") {
      currPrice = currPricebook[0].basePrice + americas_prices[numMonths-1];
    } else  if(numMonths >= currPricebook[0].monthStartsCounting && currPricebook[0].name == "Germany") {
      currPrice = currPricebook[0].basePrice + germany_prices[numMonths-1];
    } else  if(numMonths >= currPricebook[0].monthStartsCounting && currPricebook[0].name == "Korea") {

      currPrice = currPricebook[0].basePrice + korea_prices[numMonths - 1];
    } else if (numMonths >= currPricebook[0].monthStartsCounting) {
      currPrice = currPricebook[0].basePrice + ((numMonths - currPricebook[0].monthStartsCounting + 1) * currPricebook[0].monthlyFee);
    }
    else {
      currPrice = currPricebook[0].basePrice;
    }

    $('#j1-starting-price').html(currency[0].symbol + parseInt(currPrice));
    $('#j1-currency').html('('+currency[0].longName+')');

    if (numMonths > 12) {
      $('#j1-add-text').html('(only available to trainees)');
    }
    else {
      $('#j1-add-text').html('');
    }
  }

  function processData() {
    var data = {};
    data.countrySource = countrySource;
    parseTemplate(data);
  }

  function parseTemplate(data) {
    if (options.compiledTemplate) {
      var rendered = Handlebars.templates[options.handlebarsTemplateInternalName](data);
      $(options.mainContainer).html(rendered);
      addEvents();
    }
    else {
      $.get(options.templateLocation, function (template) {
        var compiled = Handlebars.compile(template);
        var rendered = compiled(data);
        $(options.mainContainer).html(rendered);
        addEvents();
      });
    }
  }

  function loadData() {
    $.getScript(options.dataFileLocation)
      .done(function() {
        processData();
      });
  }

  function main() {
    loadData();
  }

  return {
    main: main
  };

})(jQuery);

jQuery(document).ready(function() {
  j1Calculator.main();
});
