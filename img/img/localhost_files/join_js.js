angular.module("joinPage",[])
    .config(function($stateProvider){
        $stateProvider
            .state("index.join",{
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
        //新鲜预定页面会自动将menu栏背景图换了
        for(var j = 0; j < $(".home_menu").length; j++){
            $("#navigation li").eq(j).find("a").css({"color":"#9c9e9c"});
        }
        $("#navigation li").eq(2).find("a").css({"color":"#f9031a"});
    })