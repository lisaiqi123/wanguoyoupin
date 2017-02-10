angular.module("joinPage",[])
    .config(function($stateProvider){
        $stateProvider
            .state("join",{
                url:'/join',
                templateUrl:'src/join/join.html',
                controller:'joinCtrl',
                css:{
                    href:"src/join/join.css",
                    persist:true
                }
            })
    })
    .controller("joinCtrl",function($scope){

    })