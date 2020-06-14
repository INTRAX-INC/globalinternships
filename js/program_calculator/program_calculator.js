'use strict';

var programCalculator = (function($) {
  var options = {
    compiledTemplate: true,
    templateLocation: 'https://cdn.jsdelivr.net/gh/dennowong/globalinternships@latest/html/programCalculatorTemplate.html',
    handlebarsTemplateInternalName: 'programCalculatorTemplate.html',
    mainContainer: '#program-calculator',
    csv_location: 'https://cdn.jsdelivr.net/gh/dennowong/globalinternships@latest/js/program_calculator/premium_prices.csv'
  };

  function sortList(id) {
    var originList = $(id);
    originList.sort(function (a, b) {
      return $(a).text() < $(b).text() ? -1 : 1;
    });
    $(id).parent().html(originList);
  }

  function CSVToArray(strData, strDelimiter) {
// Check to see if the delimiter is defined. If not,
// then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
            (
                    // Delimiters.
                    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                    // Quoted fields.
                    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                    // Standard fields.
                    "([^\"\\" + strDelimiter + "\\r\\n]*))"
                    ),
            "gi"
            );
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
// Get the delimiter that was found.
      var strMatchedDelimiter = arrMatches[ 1 ];
      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (
              strMatchedDelimiter.length &&
              (strMatchedDelimiter != strDelimiter)
              ) {
// Since we have reached a new row of data,
// add an empty row to our data array.
        arrData.push([]);
      }
// Now that we have our delimiter out of the way,
// let's check to see which kind of value we
// captured (quoted or unquoted).
      if (arrMatches[ 2 ]) {
// We found a quoted value. When we capture
// this value, unescape any double quotes.
        var strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp("\"\"", "g"),
                "\""
                );
      } else {
// We found a non-quoted value.
        var strMatchedValue = arrMatches[ 3 ];
      }
// Now that we have our value string, let's add
// it to the data array.
      arrData[ arrData.length - 1 ].push(strMatchedValue);
    }
// Return the parsed data.
    return(arrData);
  }

  function readData() {
    var file = options.csv_location;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.withCredentials = false;
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var result = [];
          var allText = rawFile.responseText;
          if (allText) {
            result = CSVToArray(allText);
            genLists(result);
          }
        }
      }
    };
    rawFile.send(null);
  }

  function genLists(result) {
    var originList = [];
    var destList = [];
    var priceList = {};
    var priceList2 = {};
    var checkList = {};
    var data = {};
    for (var i = 0; i < result.length; i++) {
      var ovalue = result[i][0].toLowerCase().replace(/\s/g, '_').replace(/[^a-z\_]+/g, '');
      if (ovalue) {
        var ovalueOrigin = ovalue + '-o';
        var ovalueDest = ovalue + '-o_' + result[i][1].toLowerCase().replace(/\s/g, '_').replace(/[^a-z\_]+/g, '') + '-d';
        if (!checkList[ovalue]) {
          checkList[ovalue] = 0;
        }
        checkList[ovalue]++;
        if (checkList[ovalue] === 1) {
          originList.push({value: ovalueOrigin, name: result[i][0].replace(/[\'\"]+/g, '_')});
        }

        destList.push({value: ovalueDest, class: ovalueOrigin, name: result[i][1].replace(/[\'\"]+/g, '_')});
        priceList[ovalueDest] = {'currency': result[i][2], 'price': result[i][3], 'inclusions': result[i][4]};
        priceList2[ovalueDest] = {'currency': result[i][2], 'price': result[i][5], 'inclusions': result[i][6]};
      }
    }
    data.originList = originList;
    data.destList = destList;
    data.priceList = priceList;
    data.priceList2 = priceList2;
    parseTemplate(data);
  }

  function addEvents(data) {
    var $pco = $('#pc_origin').select2({
      theme: "classic",
      placeholder: "Select Country",
      allowClear: true,
      sorter: function(data) {
        return data.sort(function (a, b) {
          if (a.text > b.text) {
            return 1;
          }
          if (a.text < b.text) {
            return -1;
          }
          return 0;
        });
      }
    });
    var $pcd = $('#pc_destination').select2({
      theme: "classic",
      placeholder: "Select Destination",
      allowClear: true,
      sorter: function(data) {
        return data.sort(function (a, b) {
          if (a.text > b.text) {
            return 1;
          }
          if (a.text < b.text) {
            return -1;
          }
          return 0;
        });
      }
    });

    $('#pc_origin').change(function () {
      if ($(this).val() === "" || $(this).val() === null) {
        $('.price-choose-destination').removeClass('pc-selector-active');
      }
      else {
        $('.price-choose-destination').addClass('pc-selector-active');
      }
      $('#pc_destination option').remove();
      for (var i in data.destList) {
        if (data.destList[i].class === $pco.val()) {
          $('#pc_destination').append('<option value="' + data.destList[i].value + '" class="' + data.destList[i].class + '">' + data.destList[i].name + '</option>');
        }
      }
      $('#pc_destination').prepend('<option value="" selected></option>');
      $('#pc_destination').select2("val", "");
    });

    $('#pc_destination').change(function () {
      if ($(this).val() === "" || $(this).val() === null) {
        $('.price-result').addClass('price-hidden');
        $('.price-result-2').addClass('price-hidden');
        return;
      }

      $('.price-result').removeClass('price-hidden');

      if(data.priceList2[$('#pc_destination').val()]['price'] > 0) {
        $('.price-result-2').removeClass('price-hidden');
      } else {
        $('.price-result-2').addClass('price-hidden');
      }

      ga('send', 'event', 'Program Price Calculated', 'Calculated', $('#select2-chosen-1').text() + " to " + $('#select2-chosen-2').text()); // analytics

      if (data.priceList[$('#pc_destination').val()]['currency'] === 'Yen') {
        $('.starting-price').html('<div class="p-currency">' + accounting.formatMoney(data.priceList[$('#pc_destination').val()]['price'], "￥", 0) + '</div><div class="long-currency">(Japanese Yen)</div>');
        $('.starting-price-2').html('<div class="p-currency">' + accounting.formatMoney(data.priceList2[$('#pc_destination').val()]['price'], "￥", 0) + '</div><div class="long-currency">(Japanese Yen)</div>');
      } else if (data.priceList[$('#pc_destination').val()]['currency'] === 'Euro') {
        $('.starting-price').html('<div class="p-currency">' + accounting.formatMoney(data.priceList[$('#pc_destination').val()]['price'], "€ ", 0, ".", ",") + '</div><div class="long-currency">(Euros)</div>');
        $('.starting-price-2').html('<div class="p-currency">' + accounting.formatMoney(data.priceList2[$('#pc_destination').val()]['price'], "€ ", 0, ".", ",") + '</div><div class="long-currency">(Euros)</div>');
      } else {
        $('.starting-price').html('<div class="p-currency">' + accounting.formatMoney(data.priceList[$('#pc_destination').val()]['price'], "$", 0) + '</div><div class="long-currency">(U.S. Dollars)</div>');
        $('.starting-price-2').html('<div class="p-currency">' + accounting.formatMoney(data.priceList2[$('#pc_destination').val()]['price'], "$", 0) + '</div><div class="long-currency">(U.S. Dollars)</div>');
      }

      var whats_included_list = "";

      switch (parseInt(data.priceList[$('#pc_destination').val()]['inclusions'])) {
        case 1:
          whats_included_list = '<ul><li>Application</li><li>On-Program Support</li><li>Work Authorization Assistance</li><li>Internship Placement</li></ul>';
          break;
        case 2:
          whats_included_list = '<ul><li>Application</li><li>Insurance</li><li>On-Program Support</li></ul>';
          break;
        case 3:
          whats_included_list = '<ul><li>Application</li><li>On-Program Support</li><li>Internship Placement</li></ul>';
          break;
        case 4:
          whats_included_list = '<ul><li>Application</li><li>On-Program Support</li><li>Internship Placement</li><li>does not include Tier 5 visa cost</li></ul>';
          break;
        case 5:
          whats_included_list = '<ul><li>Business Internship Placement</li><li>Application</li><li>Insurance</li><li>J1  Visa Services</li><li> On-Program Support</li><li>Base Fee for 2 months</li><li>80 € for each additional month up to 6 months</li></ul>';
          break;
        case 6:
          whats_included_list = '<ul><li>Application</li><li>J1 Visa Services</li><li>On-Program Support</li><li>Internship Placement</li><li>Base fee for 2 and 3 months</li><li>1660 € for 4 - 6 months</li></ul>';
          break;
        case 7:
          whats_included_list = '<ul><li>Business Internship Placement</li><li>Application</li><li>Insurance</li><li>J1  Visa Services</li><li> On-Program Support</li><li>Base Fee for 2 months</li><li>$90 for each additional month</li></ul>';
          break;
        case 8:
          whats_included_list = '<ul><li>Application</li><li>Insurance</li><li>J1  Visa Services</li><li> On-Program Support</li><li>Internship Placement</li><li>Base Fee for 2 months</li><li>$105 for each additional month</li></ul>';
          break;
        case 9:
            whats_included_list = '<ul><li>Hospitality Internship Placement</li><li>Application</li><li>Insurance</li><li>J1  Visa Services</li><li> On-Program Support</li><li>Base Fee for 6 months</li><li>100 € for each additional month up to 12 months</li></ul>';
            break;
        case 10:
            whats_included_list = '<ul><li>Hospitality Internship Placement</li><li>Application</li><li>Insurance</li><li>J1  Visa Services</li><li> On-Program Support</li><li>Base Fee for 6 months</li><li>$100 for each additional month until 12 months</li></ul>';
            break;
      }

      var whats_included_list2 = "";
      switch (parseInt(data.priceList2[$('#pc_destination').val()]['inclusions'])) {
        case 1:
          whats_included_list2 = '<ul><li>Application</li><li>On-Program Support</li><li>Work Authorization Assistance</li><li>Internship Placement</li></ul>';
          break;
        case 2:
          whats_included_list2 = '<ul><li>Application</li><li>On-Program Support</li><li>Work Authorization Assistance</li><li>Internship Placement</li></ul>';
          break;
        case 3:
          whats_included_list2 = '<ul><li>Application</li><li>On-Program Support</li><li>Internship Placement</li></ul>';
          break;
        case 4:
          whats_included_list2 = '<ul><li>Application</li><li>On-Program Support</li><li>Internship Placement</li><li>does not include Tier 5 visa cost</li></ul>';
          break;
        case 5:
          whats_included_list2 = '<ul><li>Application</li><li>Insurance</li><li>J1  Visa Services</li><li> On-Program Support</li><li>Business Internship Placement</li><li>Base Fee for 2 months</li><li>80 € for each additional month up to 6 months</li></ul>';
          break;
        case 6:
          whats_included_list2 = '<ul><li>Application</li><li>J1 Visa Services</li><li>On-Program Support</li><li>Internship Placement</li><li>Base fee for 2 and 3 months</li><li>1770 € for 4 - 6 months</li></ul>';
          break;
        case 7:
          whats_included_list2 = '<ul><li>Application</li><li>Insurance</li><li>J1  Visa Services</li><li> On-Program Support</li><li>Business Internship Placement</li><li>Base Fee for 2 months</li><li>$90 for each additional month</li></ul>';
          break;
        case 8:
          whats_included_list2 = '<ul><li>Application</li><li>Insurance</li><li>J1  Visa Services</li><li> On-Program Support</li><li>Internship Placement</li><li>Base Fee for 2 months</li><li>$105 for each additional month</li></ul>';
          break;
        case 9:
          whats_included_list2 = '<ul><li>Hospitality Internship Placement</li><li>Application</li><li>Insurance</li><li>J1  Visa Services</li><li> On-Program Support</li><li>Base Fee for 6 months</li><li>100 € for each additional month up to 12 months</li></ul>';
          break;
        case 10:
          whats_included_list2 = '<ul><li>Hospitality Internship Placement</li><li>Application</li><li>Insurance</li><li>J1  Visa Services</li><li> On-Program Support</li><li>Base Fee for 6 months</li><li>$100 for each additional month until 12 months</li></ul>';
          break;
      }

      $('.whats-included-list').html(whats_included_list);
      $('.whats-included-list-2').html(whats_included_list2);
      $('.price-result').removeClass('price-hidden');
    });

  }

  function parseTemplate(data) {
    /* if (options.compiledTemplate) {
      var rendered = Handlebars.templates[options.handlebarsTemplateInternalName](data);
      $(options.mainContainer).html(rendered);
      addEvents(data);
    }
    else { */
      $.get(options.templateLocation, function (template) {
        var compiled = Handlebars.compile(template);
        var rendered = compiled(data);
        $(options.mainContainer).html(rendered);
        addEvents(data);
      });
    /* } */
  }

  function main() {
    readData();
  }

  return {
    main: main
  };

})(jQuery);

jQuery(document).ready(function() {
  programCalculator.main();
});
