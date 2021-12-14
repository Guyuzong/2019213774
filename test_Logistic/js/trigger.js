window.addEventListener('load', function() {
    //输入梯度步长提示框 
    var setlam = document.querySelector('.setlam');
    var setlam_submit = document.querySelector('.setlam-submit');
    var inputlam = document.querySelector('.inputlam');
    //画布部分
    var canvas = document.querySelector('.canvas');
    var main = document.querySelector('.main');
    var val = document.querySelector('.val');

    //按钮块
    var start = document.querySelector('#start');
    var last = document.querySelector('#last');
    var next = document.querySelector('#next');
    var end = document.querySelector('#end');
    var add = document.querySelector('#add');
    var judge = document.querySelector('#judge');

    //修改数据弹出框
    //三个输入框
    var cx = document.querySelector('#cx');
    var cy = document.querySelector('#cy');
    var category = document.querySelector('#category');

    var pop_up = document.querySelector('.pop-up');
    var closeBtn = document.querySelector('#closeBtn');
    var title = document.querySelector('#title');
    var confirm_Btn = document.querySelector('#confirm-Btn');
    var category_val = document.querySelector('#category-val');
    var confirm_Btn = document.querySelector('#confirm-Btn');

    //遮盖层
    var mask = document.querySelector('.pop-up-bg');

    //提示信息tip
    var tip1 = document.querySelector('.tip1');
    var tip2 = document.querySelector('.tip2');
    var tip3 = document.querySelector('.tip3');
    var tip4 = document.querySelector('.tip4');

    //提示信息tip数组
    var tip = [tip1, tip2, tip3, tip4];
    //设置提示信息的显示
    function settip(a) {
        for (var i = 1; i < tip.length; i++) {
            if (i == a)
                tip[i].style.display = 'block';
            else
                tip[i].style.display = 'none';
        }
    }

    //按钮禁用
    function button_disabled (a) {
        document.getElementById("last").disabled = a;
        document.getElementById("next").disabled = a;
        document.getElementById("end").disabled = a;
        document.getElementById("add").disabled = a;
        document.getElementById("judge").disabled = a;
    }
    
    button_disabled (true);


    //点击确认按钮 让mask 和pop-up 隐藏起来
    setlam_submit.addEventListener('click', function() {
        mask.style.display = 'none';
        setlam.style.display = 'none';
        if (!isnull(inputlam.value)) {
            tip1.style.display="block";
            prelam = inputlam.value;
            logisticRegression();

            setScale_total(); //定义所有比例尺
            setAxis_total() //定义所有坐标轴
            draw_axis_total(); //画所有的坐标轴

            console.log(parameter_draw); //参数数组型);
            console.log(parameter_cut);

        } else {
            mask.style.display = 'block';
            setlam.style.display = 'block';
        }
    })

    //开始
    start.addEventListener('click', function() {

        if (a == 0) {
            draw_axis_total(); //画所有的坐标轴
            draw_dot(parameter_draw[0]);
            a++;
            console.log(a);
        } else {
            rease_canvas_taotal();
            draw_dot(parameter_draw[0]);
            draw_axis_total();
            a = 1;
            console.log(a);
        }

        tip1.style.display="block";
        //动态生成end提示表格
        draw_table();
        //启用按钮
        button_disabled (false);
    });

    //上一步
    last.addEventListener('click', function() {
        if (a > parameter_cut.length + 2) {
            a = parameter_cut.length + 2;

        }
        if (a > 3) {
            svg1.selectAll("*").remove();
            settip(1);
            a--;

            draw_dot(parameter_draw[a - 2]);
            draw_line(parameter_draw[a - 2], svg1);
            logistic_value(parameter_draw[a - 2]);
            draw_axis_total();

            console.log(parameter_draw[a - 2]);
            console.log(a);
        }
    });

    //下一步
    next.addEventListener('click', function() {
        // alert("11);
        if (a == 1) {
            draw_line(parameter_draw[0], svg1);
            a++;
            console.log(a);
        } else if (a == 2) {
            svg1.selectAll("*").remove();
            settip(1);

            draw_parameter_total(); //绘制三大曲线
            setstyle(); //设置动画
            draw_line(parameter_draw[1], svg1);
            draw_dot(parameter_draw[1]);
            logistic_value(parameter_draw[1]);
            a++;

            //绘制所有坐标轴
            draw_axis_total();
            console.log(parameter_draw[a - 2]);
            console.log(a);
        } else if ((a < parameter_cut.length + 2) && (a >= 3)) {
            svg1.selectAll("*").remove();

            draw_dot(parameter_draw[a - 1]);
            draw_line(parameter_draw[a - 1], svg1);
            logistic_value(parameter_draw[a - 1]);
            draw_axis_total();

            a++;
            console.log(parameter_draw[a - 2]);
            console.log(a);

        } else if (a == parameter_cut.length + 2) {
            rease_canvas_taotal();

            settip(2);
            draw_parameter_total();
            draw_dot(parameter_draw[parameter_draw.length - 1]);
            draw_line(parameter_draw[parameter_draw.length - 1], svg1);
            draw_axis_total();

            console.log(parameter_draw[parameter_draw.length - 1]);

            a++;
            console.log(a);
        } else return;

    });

    //最后一步
    end.addEventListener('click', function() {
        // alert("11");
        if (a <= parameter_cut.length + 3) {
            rease_canvas_taotal();

            draw_parameter_total(); //绘制所有参数曲线
            draw_dot(parameter_draw[parameter_draw.length - 1]);
            draw_line(parameter_draw[parameter_draw.length - 1], svg1);
            draw_axis_total();
            console.log(param);
            console.log(parameter_draw[parameter_draw.length - 1]);
            a = parameter_cut.length + 3;
            console.log(a);

            settip(2);
        }
    });

    // 显示画布上鼠标触碰的坐标
    canvas.addEventListener('mousemove', function(e) {

        var x = Scale[0][0].invert(e.pageX - main.offsetLeft - padding.left);
        var y = Scale[0][1].invert(e.pageY - main.offsetTop - padding.top);

        val.style.left = e.pageX - main.offsetLeft +5+ 'px';
        val.style.top = e.pageY - main.offsetTop- padding.top + 'px';
        val.style.opacity = 1;

        if ((e.pageX - main.offsetLeft) > width || (e.pageY - main.offsetTop) > height)
            val.style.opacity = 0;
        else
            document.getElementById('val').innerHTML = 'x坐标:' + x.toFixed(2) + '  y坐标:' + y.toFixed(2);
    })

    //当鼠标离开，将透明度改为0
    canvas.addEventListener('mouseout', function(e) {
        val.style.opacity = 0;
    })

    //点击add按钮 让mask 和pop - up 显示出来
    add.addEventListener('click', function() {
        mask.style.display = 'block';
        pop_up.style.display = 'block';
        category.style.display = 'block';
        // category_just.style.display = 'block';

        //按钮禁用
        button_disabled (true);
    })

    //点击judge按钮 让mask 和pop-up 显示出来
    judge.addEventListener('click', function() {
        mask.style.display = 'block';
        pop_up.style.display = 'block';
        category.style.display = 'none';
    })

    //点击 closeBtn 就隐藏 mask 和 pop-up
    closeBtn.addEventListener('click', function() {
        mask.style.display = 'none';
        pop_up.style.display = 'none';

        //启用按钮
        button_disabled (false);
    })

    // 开始拖拽
    title.addEventListener('mousedown', function(e) {
        // 当鼠标按下， 就获得鼠标在盒子内的坐标
        var x = e.pageX - pop_up.offsetLeft;
        var y = e.pageY - pop_up.offsetTop;
        // 鼠标移动的时候，把鼠标在页面中的坐标，减去 鼠标在盒子内的坐标就是模态框的left和top值
        document.addEventListener('mousemove', move)

        function move(e) {
            pop_up.style.left = e.pageX - x + 'px';
            pop_up.style.top = e.pageY - y + 'px';
        }

        //鼠标弹起，就让鼠标移动事件移除
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', move);
        })
    })

    //修改数据提示框确认按钮
    confirm_Btn.addEventListener('click', function() {
        mask.style.display = 'none'; //隐藏遮盖层
        pop_up.style.display = 'none'; //隐藏pop-up框
        console.log(category.style.display == 'none');

        //根据第三个输入框是否存在判断属于哪个模块
        if (category.style.display == 'none') { //预测模块
            predictClass(cx.value, cy.value); //对该样例进行预测
            console.log(judgePy);
            cx.value = null;
            cy.value = null;
            predict_value(); //显示相应信息
            settip(3);
        } else { //添加样本数据点模块
            //抹除几个画布的内容
            svg1.selectAll("*").remove();
            svg2.selectAll("*").remove();
            svg3.selectAll("*").remove();
            svg4.selectAll("*").remove();

            add_data(cx.value, cy.value, category_val.value); //添加样本点到数据数组中
            logisticRegression();
            setScale_total(); //定义所有比例尺
            setAxis_total() //定义所有坐标轴
            draw_axis_total(); //画所有的坐标轴
            console.log(parameter_draw);
            console.log(parameter_cut);
            alert("请点击start按钮！！");
            cx.value = null;
            cy.value = null;
            category_val.value = null;
            a = 0; //将a赋值为0，方便作图
        }

    })

})