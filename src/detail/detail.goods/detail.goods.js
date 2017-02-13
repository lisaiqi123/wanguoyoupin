angular.module("detailGoodsPage",[])
    .config(function($stateProvider){
        $stateProvider
            .state("detail.goods",{
                url:'/detailGoods',
                templateUrl:'src/detail/detail.goods/detail.goods.html',
                controller:"detailGooodsCtrl",
                css:{
                    href:"src/detail/detail.goods/detail.goods.css"
                }
            })
    })
    .controller("detailGooodsCtrl",function($scope,$interval,$http,$document){
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

        $scope.picArr = ["../../img/img/orange1.jpg","../../img/img/orange2.jpg","../../img/img/orange3.jpg",
        "../../img/img/orange4.jpg","../../img/img/orange5.jpg"];

        $scope.area = "不配送地区 呼和浩特市 包头市 乌海市 赤峰市。。";
    })
    .directive("detailArea",function () {
        return{
            restrict:'EC',
            replace:true,
            scope:{
                area:"=",
                title:"@"
            },
            template:'<div>{{ title }}</div>'
        }
    })