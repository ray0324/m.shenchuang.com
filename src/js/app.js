require.config({
  paths: {
    jquery: "vendor/jquery/jquery-3.1.0.min",
    fastclick: "vendor/fastclick",
    swiper: "vendor/swiper/js/swiper.jquery.min",
    viewer: "vendor/viewer/viewer.min"
  },
  shim: {
    swiper: {
      deps: ["jquery"],
      exports: "swiper"
    },
    viewer: {
      deps: ["jquery"],
      exports: "viewer"
    }
  }
});

require(["jquery", "fastclick", "swiper", "viewer"], function($, FastClick) {
  FastClick.attach(document.body);

  //导航条功能代码
  !(function() {
    var $dropMenu = $(".drop-menu");
    var $toolbar = $(".toolbar");
    var $nav = $(".nav");
    var $tab = $(".tab");
    var LOCKED = false;

    $toolbar.on("click", function(e) {
      e.stopPropagation();
      console.log(LOCKED);
      if (LOCKED) return;
      // 锁定
      LOCKED = true;
      // 动画完成后解锁
      setTimeout(function() {
        LOCKED = false;
      }, 350);

      if (!$(this).hasClass("active")) {
        $(this).addClass("active");
        $dropMenu.show();
        // 锁定浏览器 禁止滚动
        document.body.style.overflowY = "hidden";
        setTimeout(function() {
          $dropMenu.addClass("active");
        }, 0);
      } else {
        $(this).removeClass("active");
        $dropMenu.removeClass("active");
        // 清除浏览器滚动锁定
        document.body.style = "";
        setTimeout(function() {
          $dropMenu.hide();
        }, 350);
      }
    });

    $nav.on("click", function(e) {
      e.stopPropagation();
    });

    $dropMenu.on("click", function(e) {
      e.stopPropagation();
      $toolbar.removeClass("active");
      $(this).removeClass("active");
      setTimeout(
        function() {
          $(this).hide();
        }.bind(this),
        350
      );
    });

    // tab切换
    $.each($tab, function(idx, ele) {
      var $ele = $(ele);
      console.log($ele);
      $ele.on("click", ".tab-head-item", function(e) {
        var $this = $(this);
        var index = $this.index();
        $this
          .addClass("cur")
          .siblings()
          .removeClass("cur");
        $ele
          .find(".tab-body-item")
          .eq(index)
          .addClass("cur")
          .siblings()
          .removeClass("cur");
        console.log();
      });
    });
  })();

  if (document.querySelectorAll(".swiper-container").length > 0) {
    $(".swiper-container").swiper({
      pagination: ".swiper-pagination",
      paginationClickable: true,
      spaceBetween: 10,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev"
    });
  }

  if (document.querySelectorAll(".images").length > 0) {
    $(".images").viewer({
      navbar: false,
      title: false,
      toolbar: false
    });
  }
});
