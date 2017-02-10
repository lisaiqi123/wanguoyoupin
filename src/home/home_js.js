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
	.controller("homeCtrl",function($scope,$interval,$http,$document){
		//进入home页面
		$("#navigation li").eq(0).find("a").css({"color":"#f9031a"});
		for(var j = 0; j < $(".home_menu").length; j++){
			$("#navigation li").eq(j).find("a").css({"color":"#9c9e9c"});
		}
		$("#navigation li").eq(0).find("a").css({"color":"#f9031a"});
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

		//通告
		var noticeNum = 0;
		$interval(function () {
			noticeNum++;
			if(noticeNum >= $(".notice_notice ul li").length){
				noticeNum = 0;
			}
			$(".notice_notice ul").css({"top":-$(".notice_notice ul").find("li").eq(0).height() * noticeNum + "px"});
		},3000);

		var url = "../../data/baby.json";
		window.arr1 = [];
		$http.get(url).success(function (data) {
			data.result.list.forEach(function (ele,index) {
				if(index < 4){
					arr1.push(ele);
				}
				console.log(ele)
			})
			$scope.homeArr1 = arr1;
		})

		var url = "../../data/baby.json";
		$http.get(url).success(function (data) {
			$scope.homeArr3 = data.result.list;
		})

		$scope.homelistClick = function (index) {
			console.log(index);
		}

	})
	.directive("homelistTitle",function () {
		return{
			restrict:'EC',
			replace:true,
			scope:{
				title:"@",
				name:'@'
			},
			template:'<div class="homelisttitle"><span class="{{name}}"></span>{{title}}</div>'
		}
	})