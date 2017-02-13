angular.module("myApp",
    ["ui.router",
        "angularCSS",
        "me-lazyload",
        "homePage",
        "goodsPage",
        "joinPage",
        "cartPage",
        "minePage",
        "detailGoodsPage",
		"detailCommentPage",
		"detailDetailPage"])

	.config(function($stateProvider,$urlRouterProvider){

		$urlRouterProvider.otherwise('/index/home');

		$stateProvider
			.state({
				name:"index",
				url:'/index',
				templateUrl:'src/footer/footer.html',
				controller:function(){
					console.log("进入index....");
					// angular.element('#container').addClass('animated slideInRight')
				}
			})
			.state("detail",{
				url:'/detail',
				templateUrl:'src/detail/detail.html',
				controller:function(){
					console.log("detail....");
					// angular.element('#container').addClass('animated slideInRight')
				}
			})


	})
