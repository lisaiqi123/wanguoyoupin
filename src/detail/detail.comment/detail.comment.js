angular.module("detailCommentPage",[])
    .config(function($stateProvider){
        $stateProvider
            .state("detail.comment",{
                url:'/detailComment',
                templateUrl:'src/detail/detail.comment/detail.comment.html',
                controller:"detailCommentCtrl"
            })
    })
    .controller("detailCommentCtrl",function($scope,$interval,$http,$document){

    })