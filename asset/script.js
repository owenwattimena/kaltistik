let $tinggi_awal = $('.content').height();
$("#show-menu").click(function () {
    $(".side-nav").toggleClass('open');
    // $(".content").toggleClass('menu-open');
    // $('.body .content').css('overflow', 'hidden');
    let $tinggi_content = $('.content').height();
    if ($tinggi_content > $tinggi_awal) {
        $('.side-nav').css('min-height', $tinggi_content);
    }
    else {
        $('.side-nav').css('min-height', '100%');
    }
})
$("#hide-menu").click(function () {
    $(".side-nav").toggleClass('open');
})
// document.cookie = $('footer p').text();
// let $cookie = document.cookie;
// console.log($cookie);

