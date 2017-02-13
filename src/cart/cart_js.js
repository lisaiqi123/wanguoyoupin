angular.module("cartPage",[])
    .config(function($stateProvider){
        $stateProvider
            .state("index.cart",{
                url:'/cart',
                templateUrl:'src/cart/cart.html',
                controller:"cartCtrl",
                css:{
                    href:"src/cart/cart.css",
                    persist:true
                }
            })
    })
    .controller("cartCtrl",function($scope,$http){
        //在首页页面会自动将menu栏背景图换了
        for(var j = 0; j < $(".home_menu").length; j++){
            $("#navigation li").eq(j).find("a").css({"color":"#9c9e9c"});
        }
        $("#navigation li").eq(3).find("a").css({"color":"#f9031a"});

        //从后台得到购物车数据ng-repeat到页面中
        $http.get("/huoqu").success(function (data) {
            $scope.shopping=  data;
        })

        //定义一个金额变量
        var money_all = 0;
        var checkedNum = 0;
        //列表单选
        $scope.YesOrNo = function (index) {
            if($(".shop_order_one input").eq(index).prop("checked") == true){
                checkedNum++;
                money_all = parseFloat($(".shop_order_one_money span").eq(index).html()) * $(".order_num").eq(index).html() + money_all;
            }else{
                checkedNum--;
                money_all = money_all - parseFloat($(".shop_order_one_money span").eq(index).html()) * $(".order_num").eq(index).html();
                if(money_all <= 0){
                    money_all = 0;
                }
            }
            $(".count_money").html(money_all.toFixed(2));
            //判断单项被选中几项
            $(".shop_order_one input").each(function (i) {
                if($(this).prop("checked") == true){
                    if(checkedNum == $(".shop_order_one input").length){
                        $(".count_all input").prop("checked",true);
                    }
                }else{
                    $(".count_all input").prop("checked",false);
                }
            })

        }
        //全选
        $(".count_all input").click(function () {
            //点击全选令金额初值赋零
            money_all = 0;
            //列表的checked项和全选的属性值一样
            $(".shop_order_one input").prop("checked",$(this).prop("checked"));
            //判断如果全选了，遍历列表中的每一项让每项相加
            if($(this).prop("checked") == true){
                //列表选中状态赋初值为列表长度
                checkedNum = $(".shop_order_one input").length;
                $(".shop_order_one_money span").each(function (i) {
                    money_all = parseFloat($(this).html()) * $(".order_num").eq(i).html() + money_all;
                });
                $(".count_money").html(money_all.toFixed(2));
            }else{
                //列表选中状态赋初值为列表长度
                checkedNum = 0;
                //若没有全选，金额赋值为0
                money_all = 0;
                $(".count_money").html(money_all.toFixed(2));
            }
        })


        //调取数据
        function ind() {
            var jianCount = 0;
            $http.get("/huoqu").success(function (data) {
                // console.log(data);
                //給购物车总件数赋初值
                for(var i = 0; i < data.length; i++){
                    jianCount = jianCount + data[i].count;
                }
                localStorage.orderNum = jianCount;
                $scope.shopping = data;
            })
            if(localStorage.orderNum <= 0){
                $(".orderNum").hide();
            }else{
                $(".orderNum").show();
                $scope.orderNum = localStorage.orderNum;
            }
        }
        ind();
        //定义一个变量存储购物车总件数
        var orderNum = localStorage.orderNum;
        //点击加好加入购物车
        $scope.add = function (index) {
            orderNum++;
            $(".orderNum").show();
            localStorage.orderNum = orderNum;
            $(".orderNum").html(localStorage.orderNum);
            var num = $(".order_num").eq(index).html();
            num++;
            $(".order_num").eq(index).html(num);
            console.log(num)
            //get方法添加到数据库
            var imgSrc = $(".shop_order_ul li dd img").eq(index).attr("src");
            var price = $(".shop_order_one_money").eq(index).find("span").html();
            var name = $(".shop_order_title").eq(index).html();
            var addUrl = "/addShopping?name="+name+"&price="+price+"&img="+imgSrc+"&count="+num;
            $http.get(addUrl).success(function (data) {
                console.log(data);
                //随着点击钱数增加
                money_all = 0;
                $(".shop_order_one_money span").each(function (i) {
                    if($(".shop_order_one input").eq(i).prop("checked") == true){
                        money_all = parseFloat($(".shop_order_one_money span").eq(i).html()) * $(".order_num").eq(i).html() + money_all;
                    }
                });
                console.log(money_all);
                $(".count_money").html(money_all.toFixed(2));
            })
        }
        //点击减号减少件数（如果件数为零，移出购物车）
        $scope.sub = function (index) {
            var num = $(".order_num").eq(index).html();
            num--;
            if(num <= 0){
                num = 0;
                orderNum--;
                localStorage.orderNum = orderNum;
                $(".orderNum").html(orderNum);
            }else{
                orderNum--;
                if(orderNum <= 0){
                    orderNum = 0;
                    $(".orderNum").hide();
                }else{
                    $(".orderNum").show();
                }
                localStorage.orderNum = orderNum;
                $(".orderNum").html(orderNum);
            }
            $(".order_num").eq(index).html(num);
            //点击减改变件数count
            var imgSrc = $(".shop_order_ul li dd img").eq(index).attr("src");
            var price = $(".shop_order_one_money").eq(index).find("span").html();
            var name = $(".shop_order_title").eq(index).html();
            console.log(num);
            var addUrl = "/minus?name="+name+"&price="+price+"&img="+imgSrc+"&count="+num;
            $http.get(addUrl).success(function (data) {
                if(data.err == 1){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    $scope.shopping = data;
                }
                //随着点击钱数减少
                money_all = 0;
                $(".shop_order_one_money span").each(function (i) {
                    if($(".shop_order_one input").eq(i).prop("checked") == true){
                        money_all = parseFloat($(".shop_order_one_money span").eq(i).html()) * $(".order_num").eq(i).html() + money_all;
                    }
                });
                console.log(money_all);
                $(".count_money").html(money_all.toFixed(2));
            })
        }

    })