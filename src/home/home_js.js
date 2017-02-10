angular.module("homePage",[])
	.config(function($stateProvider){
		$stateProvider
			.state("home",{
				url:'/home',
				templateUrl:'src/home/home.html',
				controller:"homeCtrl"
			})
			.state("home.hot",{
				url:'/home.hot',
				templateUrl:'src/home/home.hot/home.hot.html',
				css:{
					href:"src/home/home.hot/home.hot.css",
					persist:true
				}
			})
	})
	.controller("homeCtrl",function($scope){
		//swiper大图轮播
		var mySwiper = new Swiper ('.swiper-container', {
			direction: 'horizontal',
			loop: true,
			autoplay: 2000,
			speed: 500,
			observer:true,
			observeParents:true,
			// 如果需要分页器
			pagination: '.swiper-pagination',
		})

		//menu
		$scope.menuArr = [
			{id:0,"img":"img/img/menu_1.png","name":"新品"},
			{id:1,"img":"img/img/menu_2.png","name":"热卖"},
			{id:2,"img":"img/img/menu_3.png","name":"促销"},
			{id:3,"img":"img/img/menu_4.png","name":"订单"},
			{id:4,"img":"img/img/menu_5.png","name":"全部"}];
	})