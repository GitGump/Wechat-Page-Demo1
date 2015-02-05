window.onload = function() {
    $('.loading').remove();
    $('.swipe-tip,.music-control').show();
    $('#fullpage').show().fullpage({
        verticalCentered: false,

        //控制锚和页面切换间效果
        // anchors: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'],
        // easing: 'easeOutBack',

        //头部底部的滑动衔接
        continuousVertical: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        //开始播放音乐
        afterRender: function() {
            $('#bgm')[0].play();
        },
    });


    //音乐控制
    $('.music-control').click(function() {
        if ($(this).hasClass('close')) {
            $('#bgm')[0].play();
            $(this).addClass('play').removeClass('close');
            $(this).find('p').text('开启').addClass('fadeIn');
        } else if ($(this).hasClass('play')) {
            $('#bgm')[0].pause();
            $(this).removeClass('play').addClass('close');
            $(this).find('p').text('关闭').addClass('fadeIn');
        }
        setTimeout(function() {
            $('.music-control').find('p').removeClass('fadeIn');
        }, 1000)
    })
}
