var width = 600;
var height = 600;
var width1 = 300;
var height1 = 300;
var a = 0; //判断需要画第几组数据

var padding = {
    left: 30,
    right: 30,
    top: 30,
    bottom: 30
};
var color = ["red", "blue", "black"]; //颜色数组
var name_style = ["dash1 ", "dash2 ", "dash3 "]; //为曲线添加动画时命名
var text_draw = ["y", "w1", "w2", "b"] //坐标轴文本提示

//声明比例尺
//主图比例尺
var xScale;
var yScale;
//参数w0比例尺
var xScale1;
var yScale1;
//参数w1比例尺
var xScale2;
var yScale2;
//参数b比例尺
var xScale3;
var yScale3;

//比例尺数组
var Scale = [
    [xScale, yScale],
    [xScale1, yScale1],
    [xScale2, yScale2],
    [xScale3, yScale3]
]

//定义比例尺
function setScale(p, k) {
    if (k == 0) {
        p[0] = d3.scale.linear()
            .domain([0, 1.2 * d3.max(dataset, function(d) {
                return d[0];
            })])
            .range([0, width - padding.left - padding.right]);

        p[1] = d3.scale.linear()
            .domain([0, 1.2 * d3.max(dataset, function(d) {
                return d[1];
            })])
            .range([height - padding.top - padding.bottom, 0]);
    } else {
        //x轴方向比例尺
        p[0] = d3.scale.linear()
            .domain([0, 1.2 * d3.max(parameter_cut, function(d) {
                return d[5];
            })])
            .range([0, width1 - padding.left - padding.right]);
        //y轴方向比例尺
        if (k == 3) { //最后一幅图坐标轴朝下
            p[1] = d3.scale.linear()
                .domain([1.2 * d3.min(parameter_cut, function(d) {
                    return d[k - 1];
                }), 0])
                .range([height1 - padding.top - padding.bottom, 0]);
        } else {

            p[1] = d3.scale.linear()
                .domain([0, 1.2 * d3.max(parameter_cut, function(d) {
                    return d[k - 1];
                })])
                .range([height1 - padding.top - padding.bottom, 0]);
        }
    }

}

//声明坐标轴
//主图坐标轴
var xAxis;
var yAxis;
//w0坐标轴
var xAxis1;
var yAxis1;
//w1坐标轴
var xAxis2;
var yAxis2;
//b坐标轴
var xAxis3;
var yAxis3;

//坐标轴数组
var Axis = [
    [xAxis, yAxis],
    [xAxis1, yAxis1],
    [xAxis2, yAxis2],
    [xAxis3, yAxis3]
];
//定义坐标轴
function setaxis(p, q, k) {
    //x轴
    if (k == 0) {
        p[0] = d3.svg.axis()
            .scale(q[0])
            .orient("bottom"); //坐标轴方向
    } else if (k == 3) {
        p[0] = d3.svg.axis()
            .scale(q[0])
            .ticks(8)
            .orient("top"); //坐标轴方向
    } else {
        p[0] = d3.svg.axis()
            .scale(q[0])
            .ticks(8)
            .orient("bottom"); //坐标轴方向
    }
    //y轴
    p[1] = d3.svg.axis()
        .scale(q[1])
        .orient("left");
}

// console.log(d3.max(parameter_draw, function(d) {
//     return d[3];
// }));


//画坐标轴
function draw_axis(svg, p, q, k) {
    //添加X轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding.left + "," + Math.abs(p - padding.bottom) + ")")
        .call(q[0]);

    //添加y轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        .call(q[1]);

    //添加坐标轴提示
    if (k == 3) {
        //添加坐标轴提示
        svg.append("g")
            .append("text")
            .text(text_draw[k])
            .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr("dy", "4em") //沿x轴平移n个字体的大小
            .attr("dx", "-22em") //沿y轴平移n个字体的大小
    } else {
        svg.append("g")
            .append("text")
            .text(text_draw[k])
            .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr("dy", "4em") //沿x轴平移n个字体的大小
            .attr("dx", "-1em") //沿y轴平移n个字体的大小
    }
}

//绘制分界直线
function draw_line(p, svg) {
    svg.append("line") //画直线
        .attr("x1", function(d) {
            return padding.left + Scale[0][0](0);
        })
        .attr("y1", function(d) {
            return Scale[0][1](-p[2] / p[1]) + padding.bottom;
        })
        .attr("x2", function(d) {
            return padding.left + Scale[0][0](-p[2] / p[0]);
        })
        .attr("y2", function(d) {
            return padding.bottom + Scale[0][1](0);
        })
        .attr("stroke", "blue")
        .attr("stroke-width", "2px");
}

//绘制点集
function draw_dot(w) {
    for (var i = 0; i < dataSet.length; i++) {
        set_colors(w, dataSet[i]);
        if (dataSet[i].d == 1) {
            var rect = svg1.append("rect") //添加一个矩形
                .attr("fill", function(d) {
                    return color[dataSet[i].g];
                })
                .attr("x", function(d) {
                    return padding.left + Scale[0][0](dataSet[i].w[0]) - 5;
                })
                .attr("y", function(d) {
                    return Scale[0][1](dataSet[i].w[1]) + padding.bottom - 5;
                })
                .attr("width", 10)
                .attr("height", 10)
        } else {
            var circle = svg1.append("circle")
                .attr("fill", function(d) {
                    return color[dataSet[i].g];
                })
                .attr("cx", function(d) {
                    // console.log(xScale(d[0]));
                    return padding.left + Scale[0][0](dataSet[i].w[0]); //设置圆心x坐标
                })
                .attr("cy", function(d) {
                    //   console.log(yScale(d[1]));
                    return Scale[0][1](dataSet[i].w[1]) + padding.bottom;
                })
                .attr("r", 5); //半径
        }
    }
}

//绘制参数的path
function draw_parameter(svg, p, q) {

    var linePath = d3.svg.line() //创建一个直线生成器
        .x(function(d) {
            return p[0](d[5]);
        })
        .y(function(d) {
            return p[1](d[q]);
        })
        .interpolate("basis") //插值模式,让线段变得更加圆滑
    ;

    svg.append("path")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        //.attr("class", name_style[q]) // Assign a class for styling 
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("stroke", function(d) {
            return color[1];
        })
        .attr("value", function(d) {
            return 20;
        })
        .attr("d", function(d) {
            return linePath(parameter_cut);
        });
    draw_floatdiv(svg, p);
}

//为参数path添加动画
function setstyle() {
   
    //获取class标签为line的元素
    for (var i = 0; i < 3; i++) {
        var path = document.getElementsByClassName('line');
        var length = path[i].getTotalLength(); //获取折线的总共的长度
       
        path[i].style.strokeDasharray = length;
        path[i].style.strokeDashoffset = length;
        path[i].style.animation = name_style[i] + "10s 10";
        
        var rule = "@keyframes " + name_style[i] +
            "{0%{stroke-dashoffset:" + length + ";}100%{ stroke-dashoffset: 0;}  }";
        var style = document.createElement('style');
        
        style.type = 'text/css';
        style.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(style);

    }
    // path[0].style.animation = name_style[0] + "10s 1 ";
}

//设置path悬浮框
function draw_floatdiv(svg, p) {
    var div = d3.select("body")
        .append("div")  
        .attr("class", "tooltip") 
        .style("opacity", 1);
    svg.select("path")       
        .on("click", getData)       
        .on("mouseenter", showTip)       
        .on("mousemove", showTip)       
        .on("mouseout", hideTip)   
    function showTip() {        //定义悬浮框的位置        
        div.html(setTip(this))  
            .style("color", "black") 
            .style("left", (d3.event.pageX) + "px")           
            .style("top", (d3.event.pageY - 12) + "px");       
        div.transition()           
            .duration(300)           
            .style("opacity", 1)    
    }     
    function getData() {       
      
        console.log(yScale1.invert(d3.event.pageY - 40 - height1 - padding.top));  
    }   
   
    function hideTip() {       
        div.transition()           
            .duration(100)           
            .style("opacity", 0)   
    }
}

//动态生成表格并触碰变色
function draw_table() {
    var tbody = document.querySelector('tbody');
    var childs = tbody.childNodes;
    // //先删除已有子结点
    for (var i = childs.length - 1; i >= 0; i--) {
        tbody.removeChild(childs[i]);
    }
    //添加新的数据进table
    for (var i = 0; i < parameter_cut.length; i++) {
        //创建 tr行
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        //行里面创建单元格
        for (var j = 0; j < parameter_cut[i].length - 1; j++) {
            // 创建单元格 
            var td = document.createElement('td');
            td.innerHTML = parameter_cut[i][j];
            tr.appendChild(td);
        }
    }
    //表格触碰变色
    //获得所tr
    var trs = document.querySelector('tbody').querySelectorAll('tr');
    for (var i = 0; i < trs.length; i++) {
        trs[i].onmouseover = function() {
                // console.log(11);
                this.className = 'bg';
            }
        trs[i].onmouseout = function() {
            this.className = '';
        }
    }

}

//定义所有的比例尺
function setScale_total() {
    setScale(Scale[0], 0);
    setScale(Scale[1], 1);
    setScale(Scale[2], 2);
    setScale(Scale[3], 3);

}

//定义所有的坐标轴
function setAxis_total() {
    setaxis(Axis[0], Scale[0], 0);
    setaxis(Axis[1], Scale[1], 1);
    setaxis(Axis[2], Scale[2], 2);
    setaxis(Axis[3], Scale[3], 3);
}

//绘制所有坐标轴
function draw_axis_total() {
    draw_axis(svg1, height, Axis[0], 0);
    draw_axis(svg2, height1, Axis[1], 1);
    draw_axis(svg3, height1, Axis[2], 2);
    draw_axis(svg4, 0, Axis[3], 3);
}

//绘制所有曲线
function draw_parameter_total() {
    draw_parameter(svg2, Scale[1], 0);
    draw_parameter(svg3, Scale[2], 1);
    draw_parameter(svg4, Scale[3], 2);
}

//擦除所有画布内容
function rease_canvas_taotal()
{
    svg1.selectAll("*").remove();
    svg2.selectAll("*").remove();
    svg3.selectAll("*").remove();
    svg4.selectAll("*").remove();
}