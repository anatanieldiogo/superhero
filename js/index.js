const splash = document.querySelector('.hero-splash');

document.addEventListener('DOMContentLoaded', (e) => {
  $('.hero-splash').css('display', 'flex')

  setTimeout(() => {
    $('.hero-splash').css('opacity', '0')
    $('.hero-splash').hide()

  }, 2000);

})

//----SEARCH SYSTEM----//
document.addEventListener("click", function (event) {
  // If user clicks inside the element, do nothing
  if (event.target.closest(".search-results")) return;



  $('.search-results').css("display", "none");

  if (event.target.closest(".hero-search")) {
    if ($('.hero-search').val() != '') {
      $('.search-results').css("display", "block");
    }

  }
});


$('.search-form span').click(function () {
  $('.hero-search').val('')
  $('.hero-search').focus()
  $('.search-form span').css('display', 'none')
})

$('.hero-search').click(function () {
  if ($('.hero-search').val() != '') {
    $('.search-form span').css('display', 'flex')
  }

})

