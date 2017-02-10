

angular.module("goodsPage",[])
    .config(function($stateProvider){
        $stateProvider
            .state("goods",{
                url:'/goods',
                templateUrl:'src/goods/goods.html',
                controller:'goodsCtrl',
                css:{
                    href:"src/goods/goods.recommend/goods.recommend.css",
                    persist:true
                }
            })
            .state('goods.recommend',{
                url:'/recommend',
                templateUrl:'src/goods/goods.recommend/goods.recommend.html',
                css:{
                    href:"src/goods/goods.recommend/goods.recommend.css",
                    persist:true
                }
            })
            .state('goods.pro',{
                url:'/pro',
                params:{
                    id:0
                },
                templateUrl:'src/goods/goods.pro/goods.pro.html',
                css:{
                    href:"src/goods/goods.pro/goods.pro.css",
                    persist:true
                },
                controller:function($scope,$stateParams,proarr){
                    let id = $stateParams.id;

                    console.log('id:' + id);
                    $scope.data = proarr.arr[id];
                }
            })
    })
    .controller("goodsCtrl",function($scope,$state,$stateParams,proarr){

        $scope.click = function(id){
            console.log("ID:" + id)
            $state.go('goods.pro',{id:id})
        }

        let arr = [
            {id:0,name:'母婴用品'},
            {id:1,name:'营养保健'},
            {id:2,name:'酒水饮料'},
            {id:3,name:'休闲零食'},
            {id:4,name:'粮油调味'},
            {id:5,name:'美妆护肤'},
            {id:6,name:'智能家居'},
            {id:7,name:'水果生鲜'},
            {id:8,name:'进口汽车'},
            {id:9,name:"跨境服务"}
        ]
        $scope.arr = arr;
        proarr.arr = arr;
    })
    .service('proarr',function(){
        this.arr = []
    })

    //自定义指令给中间内容根据不同屏幕高度赋高
    .directive('autoHeight',function ($window) {
    return {
        restrict : 'A',
        scope : {},
        link : function($scope, element, attrs) {
            var winowHeight = $window.innerHeight; //获取窗口高度
            var headerHeight = 46;
            var footerHeight = 47.5;
            element.css('min-height',
                (winowHeight - headerHeight - footerHeight) + 'px');
        }
    };
});