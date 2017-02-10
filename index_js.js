
angular.module("app",
	["ui.router",
	"angularCSS",
	"me-lazyload",
	"homePage",
	"goodsPage",
	"joinPage",
	"cartPage",
	"minePage"])
	.config(function($stateProvider,$urlRouterProvider){

	    $urlRouterProvider.otherwise('/home')

	})