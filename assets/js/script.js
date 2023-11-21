$(function(){

    // 문의하기 팝업 open
    $('.btn_inquiry_open').on('click', function(e){
        e.preventDefault();
        $('.pop_inquiry').fadeIn();
        $('body').addClass('scroll_stop');
        // 팝업 스크롤바 커스텀
        $('.pop_wrap .pop_box .pop_body').mCustomScrollbar();
    })
    
    // 문서내에서 sub_top 을 포함하고 있으면 header 배경색 제거
    if($('.sub_top').length > 0) {
        $('#header').addClass('transparent');
    }
    // top banner close
    $('.top_banner .tb_close').on('click', function(){
        $('.top_banner').slideUp();
    })
    // ham btn click
    $('#header .ham_btn').on('click', function(){
        $('#header .gnb').addClass('open');
        $('body').addClass('scroll_stop');
    })
    $('#header .gnb .close_btn, #header .gnb .dim').on('click', function(){
        $('#header .gnb').removeClass('open');
        $('body').removeClass('scroll_stop');
    })

    // 소개영상 click
    $('.gnb ul li a.youtube_btn').on('click', function(e) {
        e.preventDefault();
        $('.pop_youtube').fadeIn();
        $('body').addClass('scroll_stop');
    })

    myMenu();
    $(window).on('resize', function() {
        $('#header .my_util_box .dim').fadeOut();
        $('#header .my_util_box .my_menu').hide();
        myMenu();
    })

    function myMenu() {
        if($(window).innerWidth() > 640) { // web
            // my menu hover
            $('#header .my_util_box .my_thumb').on('mouseenter', function() {
                $('#header .my_util_box .my_menu').show();
            })
            $('.my_util_box').on('mouseleave', function() {
                $('#header .my_util_box .my_menu').hide();
            })
        } else { // mobile
            $('#header .my_util_box .my_thumb').on('click', function() {
                $('#header .my_util_box .my_menu').show();
                $('#header .my_util_box .dim').fadeIn();
            })
            $('#header .my_menu .my_menu_btn, #header .my_util_box .dim').on('click', function() {
                $('#header .my_util_box .my_menu').hide();
                $('#header .my_util_box .dim').fadeOut();
            })
        }
    }

    // scroll event
    let st;
    $(window).on('scroll', function(){
        st = $(this).scrollTop();
        if(st >= $('#container').offset().top) {
            $('#header').addClass('fixed');
        } else {
            $('#header').removeClass('fixed');
        }
    })

    
    $('.pop_wrap .dim, .pop_wrap .pop_close, .pop_wrap .btn.cancel, .pop_wrap .btn.ok').on('click', function(){
        $(this).parents('.pop_wrap').fadeOut();
        $('body').removeClass('scroll_stop');
    })

    // 문의하기 팝업 open
    $('.btn_inquiry_open').on('click', function(e){
        e.preventDefault();
        $('.pop_inquiry').fadeIn();
        $('body').addClass('scroll_stop');
        // 팝업 스크롤바 커스텀
        $('.pop_wrap .pop_box .pop_body').mCustomScrollbar();
    })

    // 문의하기 팝업 필수입력
    $('.pop_inquiry .input_box .ess_input').on('input', function(){
        let blankInput = $('.pop_inquiry .input_box .ess_input').filter(function(index, ele){
            return $(ele).val().length <= 0;
        });
        let blankInputZero = (blankInput.length === 0);
        
        $('.pop_inquiry .btn.ok').attr('disabled', !blankInputZero);
    })

    // 문의하기 보내기버튼 클릭시
    $('.pop_inquiry .btn.ok').on('click', function(){
        $('.pop_inquiry_submit').fadeIn();
        $('body').addClass('scroll_stop');
    })

    // 팝업 스크롤바 커스텀
    $('.pop_wrap .pop_box .pop_body').mCustomScrollbar();

    // 앱버튼 클릭시
    $('.app_down_link .down_btn').on('click', function(e) {
        e.preventDefault();
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { // mobile 이면,
            if($(this).hasClass('ios')) { // 아이폰이면
                location.href = 'https://apps.apple.com/';
            } else { // 구글플레이면
                location.href = 'https://play.google.com/store/apps/details?id=kr.co.selfood.android';
            }
        } else { // web 이면,
            if($(this).hasClass('ios')) { // 아이폰이면
                $('.pop_ios_qr').fadeIn();
            } else { // 구글플레이면
                $('.pop_google_qr').fadeIn();
            }

            $('body').addClass('scroll_stop');

        }
    });

    // data-page 있으면 서브뎁스 표시
    let pageName = $('#container').attr('data-page');
    if(pageName) {
        $('a[data-page="'+pageName+'"]').addClass('on');
    }

    let pageObj = {
        init: function() {
            if($('.page_main').length > 0) this.mainPage.init();
            if($('.page_member').length > 0) this.memberPage.init();
        },
        mainPage: {
            init: function() {
                this.swiper();
            },
            swiper: function() {
                var swiper = new Swiper(".mv_slider .swiper", {
                    loop: true,
                    pagination: {
                        el: ".mv_slider .swiper-pagination",
                        clickable: true,
                    },
                    navigation: {
                        nextEl: ".mv_slider .swiper_next",
                        prevEl: ".mv_slider .swiper_prev",
                    },
                });

            },
        },
        memberPage: {
            init: function(){
                this.backBtn();
                this.essInput();
                this.pwToggle();
            },
            backBtn: function() { // back btn
                $('.back_btn').on('click', function(e){
                    history.back();
                })
            },
            essInput: function() { // 필수값 입렵시 submit_btn disabled false
                if($('.phone_certi_cont').length === 0) { // 휴대폰인증 페이지 아닐때에만 적용
                    $('.member_box .ess_input').on('input', function(){
                        let blankInput = $('.member_box .ess_input').filter(function(index, ele){
                            return $(ele).val().length <= 0;
                        });
                        console.log(blankInput);
                        let blankInputZero = (blankInput.length === 0);
                        
                        $('.submit_btn').attr('disabled', !blankInputZero);
                    })
                }
            },
            pwToggle: function() { // 비밀번호 보기/닫기
                $('.pw_toggle').on('click', function(){
                    if($(this).hasClass('show')) { // 비밀번호 닫기
                        $(this).removeClass('show');
                        $(this).parents('.pw_confirm').find('input[type="text"]').attr('type', 'password');
                    } else { // 비밀번호 보기
                        $(this).addClass('show');
                        $(this).parents('.pw_confirm').find('input[type="password"]').attr('type', 'text');
                    }
                })
            }
        }
    }
    
    pageObj.init();
    

})


// RENEWAL

$(function(){

    $('.renewal_card_wrapper .renewal_card_list li .btn_wrap > .card_heart').click(function() {
        $(this).toggleClass('active')
    })
})