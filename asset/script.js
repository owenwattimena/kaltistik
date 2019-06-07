$(document).ready(function () {
});
$("#show-menu").click(function () {
    $(".side-nav").toggleClass('open');
    $(".content").toggleClass('menu-open');
    // $('.body .content').css('overflow', 'hidden');
})
$("#hide-menu").click(function () {
    $(".side-nav").toggleClass('open');
    $(".content").toggleClass('menu-open');
    // $('.body .content').css('overflow', 'hidden');
})