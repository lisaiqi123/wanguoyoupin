angular.module("detailDetailPage",[])
    .config(function($stateProvider){
        $stateProvider
            .state("detail.detail",{
                url:'/detailDetail',
                templateUrl:'src/detail/detail.detail/detail.detail.html',
                controller:"detailDetailCtrl"
            })
    })
    .controller("detailDetailCtrl",function($scope,$interval,$http,$document) {

    })