<div class="carousel">
  <a href="//satyr.io/1280x720/1"><img src="//satyr.io/600x400/1" width="600" height="400" alt="" /></a>
  <a href="//satyr.io/1280x720/2"><img src="//satyr.io/600x400/2" width="600" height="400" alt="" /></a>
  <a href="//satyr.io/1280x720/3"><img src="//satyr.io/600x400/3" width="600" height="400" alt="" /></a>
  <a href="//satyr.io/1280x720/4"><img src="//satyr.io/600x400/4" width="600" height="400" alt="" /></a>
  <a href="//satyr.io/1280x720/5"><img src="//satyr.io/600x400/5" width="600" height="400" alt="" /></a>
</div>

var $carousel = $('.carousel');

$carousel
	.slick()
	.magnificPopup({
		type: 'image',
		delegate: 'a:not(.slick-cloned)',
		gallery: {
			enabled: true
		},
		callbacks: {
			open: function () {
				var current = $carousel.slick('slickCurrentSlide');
				$carousel.magnificPopup('goTo', current);
			},
			beforeClose: function () {
				$carousel.slick('slickGoTo', parseInt(this.index));
			}
		}
	});