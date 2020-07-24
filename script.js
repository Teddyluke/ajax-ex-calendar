// MILESTONE 1 : Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.

function printMonth(currentMonth) {
  var daysInMonth = currentMonth.daysInMonth();
  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var target = $(".giorni-mese");
  target.html("");
  for (var i = 1; i <= daysInMonth; i++) {
    var datecomplete = moment({ year :currentMonth.year(), month :currentMonth.month(), day :i});
    var dayshtml = compiled({
      "value": i,
      "datecomplete": datecomplete.format("YYYY-MM-DD")
    });
    target.append(dayshtml);
  }
}

function printHoliday(currentMonth) {
  var year = currentMonth.year();
  var month = currentMonth.month();
  $.ajax({
  url: "https://flynn.boolean.careers/exercises/api/holidays",
  method: "GET",
  data: {
    "year": year,
    "month": month
  },
  success: function (data, state) {
    var holidays = data["response"];
    for (var i = 0; i < holidays.length; i++) {
      var element = $(".giorni-mese li[data-datecomplete='"+holidays[i]["date"]+"']")
      element.addClass("holidays");
      element.append("  " + holidays[i]["name"]);
    }
  },
  error: function  (error) {
  }
});
}

// MILESTONE 2 : Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività.
function nextMonth(currentMonth,monthNames) {
  var nextMonthClick = $(".fa-chevron-right");
  nextMonthClick.click(function () {
    currentMonth.add(1, "months");
    printMonth(currentMonth);
    printHoliday(currentMonth);
    var template = $("#template2").html();
    var compiled = Handlebars.compile(template);
    var target = $("#current-month");
    target.html("");
    target.append(currentMonth.month());
  })
};

function prevMonth(currentMonth) {
  var prevMonthClick = $(".fa-chevron-left");
  prevMonthClick.click(function () {
    currentMonth.subtract(1, "months");
      printMonth(currentMonth);
      printHoliday(currentMonth);
      var template = $("#template2").html();
      var compiled = Handlebars.compile(template);
      var target = $("#current-month");
      target.html("");
      target.append(currentMonth.month());
  })

};


function init() {
  var currentMonth = moment("2018-01-01");
  printMonth(currentMonth);
  printHoliday(currentMonth);
  nextMonth(currentMonth);
  prevMonth(currentMonth);
}


$(document).ready(init);
