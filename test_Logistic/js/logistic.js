//训练数据
var train_data = [
    [0.5, 0.5, 1],
    [0.7, 0.32, 1],
    [0.4, 0.9, 1],
    [0.11, 0.32, 0],
    [0.88, 0.25, 1],
    [0.75, 0.12, 1],
    [0.5, 0.1, 0],
    [0.2, 0.3, 0],
    [0.45, 0.18, 0],
    [0.3, 0.6, 0]
];
//测试数据
var text_data = [
    [0.9, 0.2, 1]
];

var dataset = []; //xy坐标数据

var parameter_draw = [
    [0, 0, 0, 0]
]; //参数数组型
var parameter_cut = []; //截取参数用来画曲线

var prelam = 0.0; //人为设置的
var judgePy = []; //预测过程中p（y|x）

function Param() { // 1. 构造函数模式
    this.d = null; // 定义3个实例私有的数据
    this.g = null; //颜色序号
    this.w = []
}
Param.prototype = { // 2. 原型模式
    constructor: Param,
    change1: function(val) {
        this.d = val;
    },
    change2: function(i, val) {
        this.w[i] = val;
    },
    change3: function(val) {
        this.g = val;
    },
};

//从data数组中读取数据
function Read(data) {
    var Data = [];
    for (var i = 0; i < data.length; i++) {
        var arr = [];
        var value = new Param();
        for (var j = 0; j < data[0].length - 1; j++) {
            value.change2(j, data[i][j]);
            arr[j] = data[i][j];
            // console.log(value.w[j]);
        }
        value.d = data[i][data[0].length - 1];
        value.g = 2;
        Data[i] = value;
        dataset[i] = arr;
        // console.log(dataset[i]);
    }
    return Data;
}

//初始化param
function recoverparam() {
    for (var i = 0; i < dataSet[0].w.length; i++) {
        param.w[i] = 0.0;
        //console.log(param.w[i]);
    }
    param.d = 0.0;
}

//训练集
var dataSet = Read(train_data);
// console.log(dataSet[1].w[3]);
//var testDataSet = Read(text_data); //测试集
var param = new Param();
recoverparam();
//console.log(dataSet[0].w);

//展示训练集
function displayDataSet() {
    for (var i = 0; i < dataSet.length; i++) {
        console.log(dataSet[i].w);
        console.log('分类：' + dataSet[i].d);
    }
}

// //每mod步打印一次迭代过程，并记录当前参数
function displayIterProcess(iter, objLw, newObjLw, mod) {
    // console.log(mod);
    if (iter % mod == 0) {
        var draw = [];
        //console.log('迭代' + iter + '：目标函数值【' + newObjLw + '】，两次迭代目标函数差值【' + (newObjLw - objLw) + '】');
        //console.log('模型参数:');
        for (var i = 0; i < param.w.length; i++) {
            draw.push(param.w[i]);
        }
        draw.push(param.d);
        draw.push(iter);
        parameter_draw.push(draw);

    }
}

//按一定长度截取参数 用来画曲线
function cut_parameter() {
    var cutmod = Math.round(parameter_draw.length / 10);
    console.log(cutmod);
    //将之前存取参数均匀划分， 存入数组中， 用作绘制参数曲线path
    for (var i = 1; i < parameter_draw.length; i++) {

        if ((i - 1) % cutmod == 0) {

            var draw = [];
            // console.log(111);
            draw.push(parameter_draw[i][0]);
            draw.push(parameter_draw[i][1]);
            draw.push(parameter_draw[i][2]);
            draw.push(-parameter_draw[i][0] / parameter_draw[i][1]);
            draw.push(-parameter_draw[i][2] / parameter_draw[i][1]);
            draw.push(parameter_draw[i][3]);

            parameter_cut.push(draw);
        }
    }
}

//计算wx+b的值
function innerWX(p, data) {
    if (p.w.length != data.w.length) {
        console.log('参数与实例的维度不匹配，不能进行内积计算');
        return;
    }
    var innerP = 0.0;
    for (var i = 0; i < p.w.length; i++) {
        innerP += (p.w[i] * data.w[i]);
    }
    innerP += p.d;
    return innerP;
}

//计算logistic函数的值，即f(x)=exp(wx)/(1+exp(wx)),该表达式在求解梯度过程中出现，
function logiFun(p, d) {
    var inner = innerWX(p, d);
    var le = Math.exp(inner) / (1 + Math.exp(inner));
    return le;
}

//计算对数似然函数的值
function Lw(p) {
    var l = 0.0;
    for (var i = 0; i < dataSet.length; i++) {
        var inner = innerWX(p, dataSet[i]);
        l += (dataSet[i].d * inner - (Math.log(1 + Math.exp(inner))));
    }
    return l;
}

//梯度上升更新w和b
function gradient(lam) {
    for (var i = 0; i < param.w.length; i++) {
        var tmp = 0.0; //保存梯度上升过程的中间值
        for (var j = 0; j < dataSet.length; j++) {
            tmp += (dataSet[j].d - logiFun(param, dataSet[j])) * dataSet[j].w[i] * lam;
        }
        param.w[i] += (tmp);
    }
    var tmp = 0.0;
    for (var j = 0; j < dataSet.length; j++) {
        tmp += (dataSet[j].d - logiFun(param, dataSet[j])) * lam;
    }
    param.d += tmp;
}

//迭代
function logisticRegression() {
    //由目标函数为最大似然，因此最终求得的是目标函数的最大值，
    var lamda = prelam; //梯度下降的步长
    var delta = 0.001; //结束迭代的阈值
    //目标函数的值
    var objLw = Lw(param);

    gradient(lamda); //梯度更新
    var newObjLw = Lw(param);
    var iter = 0;

    console.log('初始: ');
    displayIterProcess(iter, objLw, newObjLw, 1);
    while (Math.abs(newObjLw - objLw) > delta) {
        objLw = newObjLw;
        gradient(lamda);
        newObjLw = Lw(param);
        ++iter;
        displayIterProcess(iter, objLw, newObjLw, 5);
    }
    //记录最终结果的参数
    console.log('迭代结束共迭代' + iter + '步');
    displayIterProcess(iter, objLw, newObjLw, 1);
    //截取参数
    cut_parameter();
}

//写迭代过程中相关数值
function logistic_value(p) {
    var l = 0.0;
    for (var i = 0; i < dataSet.length; i++) {
        var inner = 0.0;
        //求得wx+b
        inner = (p[0] * dataSet[i].w[0]) + (p[1] * dataSet[i].w[1]) + p[2];
        //计算对数似然函数值
        l += (dataSet[i].d * inner - (Math.log(1 + Math.exp(inner))));
    }
    //设置span内容
    document.getElementById("pre-α").innerHTML = prelam;
    document.getElementById("pre-w0").innerHTML = p[0];
    document.getElementById("pre-w1").innerHTML = p[1];
    document.getElementById("pre-b").innerHTML = p[2];
    document.getElementById("pre-Lw").innerHTML = l;
}

//判断文本框是否为空
function isnull(val) {
    var str = val.replace(/(^\s*)|(\s*$)/g, ''); //去除空格
    if (str == '' || str == undefined || str == null) {
        return true;
    } else {
        return false;
    }
}

//设置颜色参数
function set_colors(p, data) {
    var z = 0.0;
    for (var i = 0; i < data.w.length; i++) {
        z += (p[i] * data.w[i]);
    }
    z += p[2];
    //  console.log(z);
    if (z > 0)
        data.g = 1;
    else if (z < 0)
        data.g = 0;
    else
        data.g = 2;
    // console.log(data.g);
}

//添加数据集
function add_data(a, b, c) {
    var adddata = new Param();
    var adddraw = [];
    adddata.w[0] = a;
    adddata.w[1] = b;
    adddata.d = c;
    adddraw[0] = a
    adddraw[1] = b;
    dataset.push(adddraw);
    dataSet.push(adddata);

    console.log(adddata);

    parameter_draw.length = 0;
    parameter_draw[0] = [0, 0, 0, 0];
    parameter_cut.length = 0;
}

//给定测试集，预测分类
function predictClass(a, b) {
    /*
    分别计算P(Y = 1 | x) = exp(w.x) / (1 + exp(w.x))
    和P(Y = 0 | x) = 1 / (1 + exp(w.x))
    然后取值大的作为x的分类
    */
    var testdata = new Param();
    testdata.w[0] = a;
    testdata.w[1] = b;
    testdata.d = null;

    var py1 = 0.0;
    var py0 = 0.0;
    var inner = innerWX(param, testdata);
    py1 = Math.exp(inner) / (1 + Math.exp(inner));
    py0 = 1 - py1;
    console.log('实例：');
    console.log(testdata.w);
    judgePy.push(py1);
    judgePy.push(py0);
    if (py1 >= py0) {
        console.log('预测分类【' + 1 + '】');
        testdata.d = 1;
        judgePy.push("1");
        judgePy.push(">");
    } else {
        console.log('预测分类【' + 0 + '】');
        testdata.d = 0;
        judgePy.push("0");
        judgePy.push("<");
    }
}

//写预测value
function predict_value() {
    document.getElementById("py-w0").innerHTML = param.w[0];
    document.getElementById("py-w1").innerHTML = param.w[1];
    document.getElementById("py-b").innerHTML = param.d;
    document.getElementById("py0").innerHTML = judgePy[1];
    document.getElementById("py1").innerHTML = judgePy[0];
    document.getElementById("py-judge").innerHTML = judgePy[3];
    document.getElementById("py-result").innerHTML = judgePy[2];
}

// logisticRegression();
// console.log(parameter_draw); //参数数组型);
// console.log(parameter_cut);