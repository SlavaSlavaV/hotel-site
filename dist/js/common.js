$(document).ready(function () {

	// Menu active 

	$('.menu li a').each(function() {
		var location = window.location.href;
		var link = this.href; 
		if(location == link) {
				$(this).addClass('active');
		}
	});
		
	// Menu toggle

	$('.menu-toggle').on('click', function (event) {
		event.preventDefault();
		if (event.target.closest('.menu-toggle')) {
			$(this).toggleClass('menu-open');
			$(this).css('z-index', 1000)
			$('.top-menu').toggleClass('open-list');
		}
		else if (event.target.closest('.top-menu__link')) {
			$(this).removeClass('menu-open');
			$('.top-menu').removeClass('open-list');
		}
	});
	
	// Top Slider

	$('#top-slider').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		speed: 1000,
		prevArrow: '<span class="prev"></span>',
		nextArrow: '<span class="next"></span>',
		dots: true,
		dotsClass: 'dots',
	});

	$("#top-slider").on("beforeChange", function() {
		$('.slide-content').removeClass('animated fadeIn delay-0.7s').hide();
		
    setTimeout(function() {    
    $('.slide-content').addClass('animated fadeIn delay-0.7s').show();
    }, 1000);
	});

	// testimonials slider

	$('#testimonials-slider').slick({
		autoplay: true,
		autoplaySpeed: 10000,
		speed: 1000,
		prevArrow: '<span class="prev"></span>',
		nextArrow: '<span class="next"></span>',
	});
	
	// magnific popap gallery

	$('#gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeBtnInside: true,
		fixedContentPos: false,
		removalDelay: 400,
		disableOn: 767,
		mainClass: 'mfp-zoom-in mfp-img-mobile',
		tLoading: '',
		image: {
			verticalFit: true,
			tError: '<a href="%url%">The photo #%curr%</a> did not load.'
		},
		gallery: {
			enabled: true,
			preload: [0, 1]
		},
		zoom: {
			enabled: true,
			duration: 400, // Не забудьте изменить продолжительность в CSS
			opener: function(openerElement) {
				return openerElement.is('a') ? openerElement : openerElement.find('a');
			}
		},
		callbacks: {
			change: function() {
				this.items[0].src = this.items[0].src + '?=' + Math.random(); 
			},
			open: function() {
				$.magnificPopup.instance.next = function() {
					var self = this;
					self.wrap.removeClass('mfp-image-loaded');
					setTimeout(function() { 
						$.magnificPopup.proto.next.call(self); 
					}, 300);
				}
				$.magnificPopup.instance.prev = function() {
					var self = this;
					self.wrap.removeClass('mfp-image-loaded');
					setTimeout(function() { 
						$.magnificPopup.proto.prev.call(self); 
					}, 300);
				}
			},
			imageLoadComplete: function() { 
				var self = this;
				setTimeout(function() { 
					self.wrap.addClass('mfp-image-loaded');
				}, 16);
			}
		}		
	});

	//Animate number, jQuery-spincrement plugin
	
	function countup(className) {
		var countBlockTop = $('.' + className).offset().top;
		var windowHeight = window.innerHeight;
		var show = true;
	
		$(window).scroll(function () {
			if (show && (countBlockTop < $(window).scrollTop() + windowHeight)) {
				show = false;
	
				$('.' + className).spincrement({
					from: 0,
					duration: 4000,
					easing: 'easeOutExpo'
				});
			}
		})
	}
	
	// Animate number, проверка существует ли эл. на странице иначе будет ошибка
	
	if ($('#facts').length) {
		countup("count-1", $(".count-1").text());
		countup("count-2", $(".count-2").text());
		countup("count-3", $(".count-3").text());
		countup("count-4", $(".count-4").text());
	} 

	// Validation Form

	/* $("#comment-form").validate({
		rules: {
			usmessage: {
				required: true,
				minlength: 10,
				maxlength: 300
			},
			usname: {
				required: true,
				minlength: 3,
				maxlength: 40
			},
			usemail: {
				required: true,
				email: true,
			}
		},
		messages: {
			usmessage: {
				minlength: "Message length must be at least {0} characters!",
				maxlength: "The message can not contain more than {0} characters!",
				required: "Please leave a message!"
			},
			usname: {
				required: "Please specify your name!",
				minlength: "Name length must be at least {0} characters!",
				maxlength: "The name can not contain more than {0} characters!"
			},
			usemail: {
				required: "Email - required!",
				email: "name@domain.com"
			}
		},
		errorElement: "span",
		focusCleanup: true,
		submitHandler: function(form) {
			alert('valid');
		}
	});

	$.validator.methods.email = function( value, element ) {
		var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return this.optional( element ) || regexp.test(value);
	}; */

	// Lazy Load init

	$("img.lazyload").lazyload({
		effect: 'fadeIn'
	});

});
