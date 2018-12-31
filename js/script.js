$(function(){
	'use strict';

	/*========================================
		SmoothScroll
	==========================================*/
	smoothScroll.init({
		updateURL: false
	});

	/*========================================
		Adjust Menu Button's Color
	==========================================*/
	var c_height = $('.main-section').outerHeight() - 40,
		$menu_btn = $('.menu-btn'),
		$body = $('body');
		
	function menu_btn_color(){
		if( $(window).scrollTop() >= c_height ){
			$menu_btn.removeClass('white-btn');
		}else{
			$menu_btn.addClass('white-btn');
		}
	}
	menu_btn_color();


	$(window).on('resize', function(){

		c_height = $('.main-section').outerHeight() - 40;

		setTimeout(function(){
			AOS.refreshHard();
		}, 800);

	}).on('load', function(){

		$body.addClass('loaded');

		/*========================================
			Testimonials Slider
		==========================================*/
		$('.testimonials-slider').owlCarousel({
			items: 1
		});

		/*========================================
			Project Images Slider
		==========================================*/
		$('.project-slider').owlCarousel({
			items: 1,
			autoHeight: true
		});

		/*========================================
			Portfolio Items
		==========================================*/
		$('.portfolio-items').shuffle();

		/*========================================
			AnimateOnScroll
		==========================================*/
		AOS.init({
			offset: 40,
			disable: 'mobile',
			duration: 600
		});


	}).on('scroll', function(){

		menu_btn_color();

	});

	/*========================================
		Material Design Ripples
	==========================================*/
	Waves.attach('.btn-custom, .menu li > a', 'waves-classic');
	Waves.init();

	/*========================================
		Material Design Textbox
	==========================================*/
	$('.material-input > .form-control').blur(function() {
		if ($(this).val()){
			$(this).addClass('used');
		}else{
			$(this).removeClass('used');
		}
	});

	/*========================================
		Portfolio Items Ripple Effect
	==========================================*/
	$('.portfolio-items > li > .inner').each(function(){
		var $this = $(this),
			_w = $this.outerWidth(),
			_h = $this.outerHeight(),
			_s = _w > _h ? _w : _h,
			_s = _s * 2.6;
		$this.append('<div class="ripple" ></div>');
		$this.find('.ripple').css({
			height: _s,
			width: _s
		});
	}).on('mouseenter', function(e){
		var $this = $(this),
			_s = parseInt($this.find('.ripple').css('height')),
			_offset = $this.offset(),
			_x = e.pageX - $this.offset().left,
			_y = e.pageY - $this.offset().top,
			_x = _x - (_s/2),
			_y = _y - (_s/2);
		$this.find('.ripple').css({
			'top': _y,
			'left': _x
		});
	});

	/*========================================
		Menu Functions
	==========================================*/
	$menu_btn.on('click', function(e){
		e.preventDefault();
		$body.toggleClass('show-menu');
	});
	$('.menu li > a').on('click', function(e){
		$body.removeClass('show-menu');
	});


	/*=========================================================================
		Contact Form (NOT WORKING IN DEMO ONLY)
	=========================================================================*/
	$('#contact-form').validator().on('submit', function (e) {
		if (!e.isDefaultPrevented()) {
			e.preventDefault();
			var $this = $(this),
				//You can edit alerts here
				alerts = {
					success:
					"<div class='form-group' >\
						<div class='alert alert-success' role='alert'> \
							<strong>Message Sent!</strong> We'll be in touch as soon as possible\
						</div>\
					</div>",
					error:
					"<div class='form-group' >\
						<div class='alert alert-danger' role='alert'> \
							<strong>Oops!</strong> Sorry, an error occurred. Try again.\
						</div>\
					</div>"
				};
			$('#contact-form-result').html(alerts.success);
			$('#contact-form').trigger('reset');
			$('#contact-form .used').removeClass('used');
		}
	});
});
