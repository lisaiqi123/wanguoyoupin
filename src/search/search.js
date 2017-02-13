angular.module("searchPage",[])
    .config(function($stateProvider){
        $stateProvider
            .state({
                name:"index.search",
                url:'/search',
                templateUrl:'src/search/search.html',
                controller:"searchCtrl",
                css:{
                    href:"src/search/search.css",
                    persist: true
                }
            })
    })
    .controller("searchCtrl",function($scope,$interval,$http){
        var url = "../../data/baby.json";
        $http.get(url).success(function (data) {
            $scope.searchArr3 = data.result.list;
        })
        //根据关键字查询相关商品
        $scope.searchbtn = function () {
            var foodName = $scope.foodName;
            console.log(foodName);
            var urlArr = "http://www.vrserver.applinzi.com/aixianfeng/apicategory.php?category="+foodName;
            $http.get(urlArr).success(function (data) {

                $scope.searchArr3 = data.data;
                console.log(data.data);
                // if(data.data != null){
                //     $(".search_no").hide();
                //     $(".hot_search").hide();
                //     $(".hot_history").hide();
                //     $(".clear_btn").hide();
                //     //购物车logo件数
                //     $(".shop_pic").show();
                //     $(".search_num").html(localStorage.orderNum);
                //     $scope.searchArr3 = data.data;
                //     console.log(data.data);
                // }else{
                //     $(".search_no").show();
                //     $(".hot_search").show();
                //     $(".hot_history").show();
                //     $(".clear_btn").show();
                //     $(".shop_pic").hide();
                //     $(".search_no img").on("click",function () {
                //         $(this).parent().hide();
                //     })
                //     $(".search_ul").children().remove();
                // }
            })
        }
    })