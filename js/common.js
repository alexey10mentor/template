$(document).ready(function() {

    if ($(".swiper-container").length > 0) {
        var swiper = new Swiper('.swiper-container', {
            // direction: 'vertical', // вертикальный слайдер
            slidesPerView: 3,
            spaceBetween: 30,
            // effect: 'fade', // анимация
            loop: true,
            observer: false, // помощь инициализации
            observeParents: false,
            slidesPerGroup: 1,
            slideToClickedSlide: false, // клик на слайд = переход на слайд
            watchOverflow: true, // уберет навигацию когда она не нужна
            // autoplay: {
            //        delay: 2500,
            //        disableOnInteraction: false,
            //     	},
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                // type: 'progressbar', //прогрессивная полоса
            },
            scrollbar: {
                el: '.swiper-scrollbar', //нижний скролл
                hide: true,
            },
            breakpoints: {
                1200: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 2,
                },
                640: {
                    slidesPerView: 1,
                }
            }
        });
    }

    //    <div class="swiper-container">
    //     <div class="swiper-wrapper">
    //         <div class="swiper-slide"></div>
    //     </div>
    //     <div class="swiper-pagination"></div>
    //     <div class="swiper-button-prev"></div>
    //     <div class="swiper-button-next"></div>
    // </div>


    if ($(".gallery-top").length > 0) {
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            slidesPerView: 4,
            loop: true,
            freeMode: true,
            loopedSlides: 5,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });
        var galleryTop = new Swiper('.gallery-top', {
            spaceBetween: 10,
            loop: true,
            loopedSlides: 5,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            thumbs: {
                swiper: galleryThumbs,
            },
        });
    }


    //    <div class="slider_container">
    //     <div class="slider_ratio"></div>
    //   	<div class="slider_contnet">
    // 	    <div class="swiper-container gallery-top">
    // 	        <div class="swiper-wrapper">
    // 	            <div class="swiper-slide"></div>
    // 	        </div>
    // 		 <div class="swiper-pagination"></div>
    // 		 <div class="swiper-button-prev"></div>
    // 		 <div class="swiper-button-next"></div>
    // 	    </div>
    // 	    <div class="swiper-container gallery-thumbs">
    // 	        <div class="swiper-wrapper">
    // 	            <div class="swiper-slide"></div>
    // 	        </div>
    // 	    </div>
    // 	</div>
    // </div> 





    // Помощь анимации

    // data-wow-delay="0.3s" // задержка анимации
    // data-wow-offset="10" // — расстояние в пикселях от нижнего края браузера до верхней границы элемента необходимое для начала анимации;
    new WOW().init();




    //Попап менеджер FancyBox
    // data-fancybox="gallery" создание галереи
    // data-caption="<b>Подпись</b><br>"  Подпись картинки
    // data-width="2048" реальная ширина изображения
    // data-height="1365" реальная высота изображения
    // data-type="ajax" загрузка контента через ajax без перезагрузки
    // data-type="iframe" загрузка iframe (содержимое с другого сайта)
    $(".fancybox").fancybox({
        hideOnContentClick: true,
        protect: false, //защита изображения от загрузки, щелкнув правой кнопкой мыши. 
        loop: true, // Бесконечная навигация по галерее
        arrows: true, // Отображение навигационные стрелки
        infobar: true, // Отображение инфобара (счетчик и стрелки вверху)
        toolbar: true, // Отображение панели инструментов (кнопки вверху)
        buttons: [ // Отображение панели инструментов по отдельности (кнопки вверху)
            // 'slideShow',
            // 'fullScreen',
            // 'thumbs',
            // 'share',
            //'download',
            //'zoom',
            'close'
        ],
        touch: false,
        animationEffect: "fade", // анимация открытия слайдов "zoom" "fade" "zoom-in-out"
        transitionEffect: 'fade', // анимация переключения слайдов "fade" "slide" "circular" "tube" "zoom-in-out" "rotate'
        animationDuration: 500, // Длительность в мс для анимации открытия / закрытия
        transitionDuration: 1366, // Длительность переключения слайдов
        slideClass: '', // Добавить свой класс слайдам
        closeExisting: true,
    });

    // Маска для формы телефона https://github.com/RobinHerbots/Inputmask

    $("input[type='tel']").inputmask({
        mask: '+7 (999) 999 99-99',
        showMaskOnHover: false,
        autoUnmask: true,
    });


    //Валидация форм https://jqueryvalidation.org/documentation/

    $("#form").validate({
        rules: {
            "name": {
                required: true,
                minlength: 1,
            },
            "tel": {
                required: true,
                minlength: 10,
            },
            "mail": {
                email: true,
                required: true,
            }
        },
        messages: {
            "name": {
                required: "Введите имя",
            },
            "mail": {
                email: "Введите E-mail",
                required: "Введите E-mail",
            },
            "tel": {
                required: "Введите телефон",
                minlength: "Введите не менее 10 цифр",
            }
        },
        //       errorPlacement: function(error,element) { 
        //     return true; 
        // },
    });


    //Аякс отправка форм
    $("form").submit(function() {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $("form").trigger("reset");
            $.fancybox.open($("#pop"));
            setTimeout(function() {
                $.fancybox.close();
            }, 1500);
        });
        return false;
    });



    // Скролл // Документация https://kingsora.github.io/OverlayScrollbars/#!demos/content

    let scroll = $('.scrollbar');

    OverlayScrollbars(scroll, {
        paddingAbsolute: true,
        scrollbars: {
            clickScrolling: true
        },
        callbacks: {
            onInitialized: function() {

            },
        },
    }); // .scroll({ y : "100%"  })




    //Плавный скролл до блока .div по клику на .scroll

    $('a[data-target="anchor"]').on('click', function() {
        var target = $(this).attr('href'),
            bl_top = $(target).offset().top;
        $('body, html').animate({ scrollTop: bl_top }, 700);
        return false;
    });

    // Скрыть - раскрыть блок

    $('.menuToggle').on('click', function() {
        $(this).addClass('active');
        $('.menu').slideToggle(300, function() {
            if ($(this).css('display') === "none") {
                $(this).removeAttr('style');
                $('.menuToggle').removeClass('active');
            }
            // if( $(this).css('display') === "block"){
            //     $(this).css('display', 'flex');
            // }

        });

    });


    // Боковое меню

    $('.menuToggle').on('click', function() {
        $('body').toggleClass('none-scroll');
        $('.main-nav').toggleClass('active');
        $('.overlay-page').toggleClass('active');
        $(this).toggleClass('active');
    });



    $('.overlay-page').on('click', function() {
        $('body').removeClass('none-scroll');
        $('.main-nav').removeClass('active');
        $('.menuToggle').removeClass('active');
        $(this).removeClass('active');


    });

    // аккордеон

    $(".open_toggle").on('click', function(e) {
        e.preventDefault();
        if ($(this).next("div").is(":visible")) {
            $(this).next("div").slideUp(200);
            $(this).removeClass("active");

        } else {
            $(".block_toggle").slideUp(200);
            $(this).next("div").slideDown(200);
            $(this).parents().siblings().children(".open_toggle").removeClass("active");
            $(this).addClass("active");


        }
    });


    // табы

    $('ul.tab_list a').click(function(e) {
        e.preventDefault();
        $('ul.tab_list .active').removeClass('active');
        $(this).addClass('active');
        var tab = $(this).attr('href');
        $('.block_content').not(tab).css({ 'display': 'none' });
        $(tab).fadeIn(400);
    });

    // Конпка вверх
    $(window).scroll(function() {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });

    $('#toTop').click(function() {
        $('body,html').animate({ scrollTop: 0 }, 800);
    });



    // яндекс карта

    // <script src="https://api-maps.yandex.ru/2.1/?load=package.full&amp;lang=ru-RU"></script>


    if ($("#map").length > 0) {
        ymaps.ready(function() {
            var myMap = new ymaps.Map('map', {
                    center: [55.818847, 49.114732],
                    zoom: 14
                }, {
                    searchControlProvider: 'yandex#search'
                }),
                // Создаём макет содержимого.
                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                ),

                myPlacemark1 = new ymaps.Placemark([55.818847, 49.114732], {
                    balloonContent: 'адрес',
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#imageWithContent',
                    // Своё изображение иконки метки.
                    iconImageHref: 'img/marker.png',
                    // Размеры метки.
                    iconImageSize: [70, 80],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-20, -55],
                    // Смещение слоя с содержимым относительно слоя с картинкой.
                    iconContentOffset: [15, 15],
                    // Макет содержимого.
                    iconContentLayout: MyIconContentLayout
                });


            myMap.behaviors.disable('scrollZoom');


            myMap.geoObjects
                .add(myPlacemark1)
            myMap.setZoom(15, { duration: 750 });
        });
    }




    // if (window.matchMedia('(max-width: 1200px)').matches) // адаптивный js


});