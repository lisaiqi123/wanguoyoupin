angular.module('minePage',[])
    .config(function($stateProvider){
        $stateProvider
            .state('index.mine',{
                url:'/mine',
                templateUrl:'src/mine/mine.html',
                controller:"mineCtrl"
            })
    })
    .controller("mineCtrl",function () {
        //在闪购超市页面会自动将menu栏背景图换了
        for(var j = 0; j < $(".home_menu").length; j++){
            $("#navigation li").eq(j).find("a").css({"color":"#9c9e9c"});
        }
        $("#navigation li").eq(4).find("a").css({"color":"#f9031a"});
    })
