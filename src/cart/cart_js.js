angular.module("cartPage",[])
    .config(function($stateProvider){
        $stateProvider
            .state("cart",{
                url:'/cart',
                templateUrl:'src/cart/cart.html',
                controller:"cartCtrl",
                css:{
                    href:"src/cart/cart.css",
                    persist:true
                }
            })
    })
    .controller("cartCtrl",function($scope,$http){
        //在首页页面会自动将menu栏背景图换了
        for(var j = 0; j < $(".home_menu").length; j++){
            $("#navigation li").eq(j).find("a").css({"color":"#9c9e9c"});
        }
        $("#navigation li").eq(3).find("a").css({"color":"#f9031a"});
        //从后台得到购物车数据ng-repeat到页面中
        $http.get("/huoqu").success(function (data) {
            $scope.shopping = data;
        })
    })