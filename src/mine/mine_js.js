angular.module('minePage',[])
    .config(function($stateProvider){
        $stateProvider
            .state('mine',{
                url:'/mine',
                templateUrl:'src/mine/mine.html',
                css:{
                    href:"src/mine/mine.css",
                    persist: true
                }
            })
    })
