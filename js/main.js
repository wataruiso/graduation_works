'use strict';

const persp = 'perspective(500px)';
const pages = $('.section');

//fragment anime
const rotateZ_memories = [];
const fragArray = [];
const frags = document.querySelectorAll('.frag');

function arrangeFrag() {
    const frag_size_range = 120;
    const min_frag_size = 40;
    frags.forEach((frag, index) => {
        let random = Math.floor(Math.random() * frag_size_range + min_frag_size);
        rotateZ_memories.push(random);
        fragArray.push(index + 1);
    })
    shuffleFrag(fragArray);
}

function shuffleFrag(fragArray) {
    for (let i = fragArray.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        let tmp = fragArray[i];
        fragArray[i] = fragArray[r];
        fragArray[r] = tmp;
    }
}
//fragment anime




//opening-section
let opening;
pages.on('click', function () {
    if (opening) return;
    opening = true;

    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        // $(this).stop().animate({ scrollTop: 0 }, 1000);
        setTimeout(() => {
            $(this).removeClass('z100');
            $('.dammy_height', this).removeClass('scrollable');
            $(this).getNiceScroll().resize();
            opening = false;
        }, 1000);

    } else {
        $(this).addClass('active z100');
        $('.dammy_height', this).addClass('scrollable');
        $(this).niceScroll('.dammy_height', {
            scrollspeed: 100, //どのくらい進むか
            mousescrollstep: 100,  //スクロールしたあとの余韻のレベル
            // cursorcolor: 'rgba(0, 205, 0, .6)',
            // autohidemode: 'hidden',
        });
        $(this).getNiceScroll().resize();
        opening = false;
    }
})
//opening-section


//setting-section
function setSections() {
    $('.section').each(function(index) {
        setTimeout(() => {
            $(this).addClass('reveal');
        }, 100 * index);
    })
}   
//setting-section



$(document).ready(function () {

    setSections();
    arrangeFrag();


})




pages.on('scroll', function () {

    let scroll = $(this).scrollTop();
    let pageIndex = $(this).index();
    // console.log(scroll);

    //fragment anime
    if (pageIndex === 0) {
        const frag_fire_point = 5000;
        let frag_scroll = scroll - frag_fire_point;
        let frag_value = frag_scroll < 0 ? 0 : frag_scroll / 20;
        const canvas2 = $('.canvas2');


        if (frag_scroll < 0) {
            $('.frag_wrapper').css({
                'bottom': scroll / 60,
                'transform': `rotateX(${-50 + scroll / 150}deg) rotateY(${-50 + scroll / 80}deg)`,
            });
            canvas2.removeClass('hide');
        } else {
            canvas2.addClass('hide');
        }

        for (let i = 1; i < frags.length + 1; i++) {
            let rotateZ_memory = rotateZ_memories[i - 1];
            let index = fragArray[i - 1];
            let frag_memory = frag_value * rotateZ_memory / (i * 2);
            let color_prop = frag_value == 0 ? 'transparent' : `rgba(0, 205, ${frag_memory}, .6)`;
            if (i % 2 === 0) $(`.frag${index}`).css({
                'transform': `${persp} 
                          translate(-${frag_memory}%, ${frag_memory}%)  
                          rotateX(-${frag_memory}deg) rotateY(-${frag_memory}deg)`,
                'border-bottom-color': color_prop

            });
            else $(`.frag${index}`).css({
                'transform': `${persp} 
                          translate(${frag_memory}%, ${frag_memory}%) 
                          rotateX(${frag_memory}deg) rotateY(${frag_memory}deg)`,
                'border-bottom-color': color_prop
            });
        }
    }
    //fragment anime  





})



