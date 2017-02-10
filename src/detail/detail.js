angular.module("detailPage",[])
    .config(function($stateProvider){
        $stateProvider
            .state("detail",{
                url:'/detail',
                templateUrl:'src/detail/detail.html',
                controller:"detailCtrl"
            })
    })
    .controller("detailCtrl",function($scope,$interval,$http,$document){
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

    })