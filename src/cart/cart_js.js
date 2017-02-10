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
        //从后台得到购物车数据ng-repeat到页面中
        $http.get("/huoqu").success(function (data) {
            $scope.shopping = data;
        })
    })