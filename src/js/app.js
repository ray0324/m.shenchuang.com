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

require(["jquery", "fastclick", "swiper", "viewer"], function(
  $,
  FastClick,
  swiper,
  viewer
) {
  FastClick.attach(document.body);

  //导航条功能代码
  !(function() {
    var $dropMenu = $(".drop-menu");
    var $toolbar = $(".toolbar");
    var $nav = $(".nav");
    var $tab = $(".tab");

    $toolbar.on("click", function(e) {
      e.stopPropagation();

      if (!$(this).hasClass("active")) {
        $(this).addClass("active");
        $dropMenu.show();
        document.body.style.overflowY = "hidden";
        setTimeout(function() {
          $dropMenu.addClass("active");
        }, 5);
      } else {
        $(this).removeClass("active");
        $dropMenu.removeClass("active");
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
