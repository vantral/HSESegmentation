function openSearch(evt, searchName) {
// Declare all variables
var i, tabcontent, tablinks;

// Get all elements with class="tabcontent" and hide them
tabcontent = document.getElementsByClassName("tabcontent");
for (i = 0; i < tabcontent.length; i++) {
  tabcontent[i].style.display = "none";
}

// Get all elements with class="tablinks" and remove the class "active"
tablinks = document.getElementsByClassName("tablinks");
for (i = 0; i < tablinks.length; i++) {
  tablinks[i].className = tablinks[i].className.replace(" active", "");
}

// Show the current tab, and add an "active" class to the button that opened the tab
current = document.getElementById(searchName);
current.style.display = "block";
evt.currentTarget.className += " active";
}



$(function() {
  $('#my_fancy_form').on('submit', function() {
    event.preventDefault();
    var url = '/search';
    var data = $('#my_fancy_form').serialize();

    $.ajax(url + '?' + data).then(function(data) {
      $('#output').text(data);
    });
  });
});