
var scrollToTop = {
	init:function () {
		this.listenerScroll()
		$(".page-scroll-to-top").click(function (){
			$(document).scrollTop(0)
		})
	},
	listenerScroll :function () {
		let status = "hide"
		$(window).on("scroll", function (e) {
			let scrollTop = $(document).scrollTop()
			if(scrollTop >= 200 ){
				if(status == "show") return;
				status = "show"
				$(".page-scroll-to-top").fadeIn(175)
			}else{
				if(status == "hide") return;
				status = "hide"
				$(".page-scroll-to-top").fadeOut(175)
			}
		})
	}
}

scrollToTop.init();