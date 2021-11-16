new Vue({
  el: '.schedule',
  data: {
    arr: [{
        day: '',
        class: 'week'
      },
      {
        day: '一',
        class: 'week'
      },
      {
        day: '二',
        class: 'week'
      },
      {
        day: '三',
        class: 'week'
      },
      {
        day: '四',
        class: 'week'
      },
      {
        day: '五',
        class: 'week'
      }
    ],
    clazz: [{
        num: '1',
        time: '8:00',
        class: 'clazz'
      },
      {
        num: '2',
        time: '',
        class: 'clazz'
      },
      {
        num: '3',
        time: '10:10',
        class: 'clazz'
      },
      {
        num: '4',
        time: '',
        class: 'clazz'
      },
      {
        num: '5',
        time: '14:00',
        class: 'clazz'
      },
      {
        num: '6',
        time: '',
        class: 'clazz'
      },
      {
        num: '7',
        time: '16:10',
        class: 'clazz'
      },
      {
        num: '8',
        time: '',
        class: 'clazz'
      },
      {
        num: '9',
        time: '18:30',
        class: 'clazz'
      },
      {
        num: '10',
        time: '',
        class: 'clazz'
      },
    ],
    lesson: [{
        course: 'Windows程序设计',
        teacher: '赵卫中',
        place: '@N217',
        Bgcolor: '#15C377',
        class: 'course'
      },
      {
        course: '微机原理与接口技术',
        teacher: '陈怡',
        place: '@N211',
        Bgcolor: '#15C377',
        class: 'course'
      },
      {
        course: '专业英语',
        teacher: '赵卫中',
        place: '@N113',
        Bgcolor: '#15C377',
        class: 'course'
      },
      {
        course: 'Web程序设计',
        teacher: '涂新辉',
        place: '@N520',
        Bgcolor: '#FCC525',
        class: 'course'
      },
      {
        course: '信息检索技术',
        teacher: '张茂元',
        place: '@N108',
        Bgcolor: '#FCC525',
        class: 'course'
      },
      {
        course: '汽车文化与人类文明',
        teacher: '宋景芬',
        place: '@8301',
        Bgcolor: '#FCC525',
        class: 'course'
      },
      {
        course: '人工智能',
        teacher: '戴上平',
        place: '@N113',
        Bgcolor: '#48B0FC',
        class: 'course'
      },
      {
        course: '操作系统原理',
        teacher: '李源',
        place: '@N211',
        Bgcolor: '#48B0FC',
        class: 'course'
      },
      {
        course: 'Windows程序设计',
        teacher: '赵卫中',
        place: '@N522',
        Bgcolor: '#48B0FC',
        class: 'course'
      },
      {
        course: '信息检索技术',
        teacher: '张茂元',
        place: '@N528',
        Bgcolor: '#FAA64B',
        class: 'course'
      },
      {
        course: '习近平新时代中国特色社会主义思想概论',
        teacher: '张艳斌',
        place: '@N215',
        Bgcolor: '#FAA64B',
        class: 'course'
      },
      {
        course: 'Web程序设计',
        teacher: '涂新辉',
        place: '@N108',
        Bgcolor: '#FAA64B',
        class: 'course'
      },
      {
        course: '编译原理',
        teacher: '蔡霞',
        place: '@N211',
        Bgcolor: '#FAA64B',
        class: 'course'
      },
      {
        course: '操作系统原理',
        teacher: '李源',
        place: '@N530',
        Bgcolor: '#33CABB',
        class: 'course'
      }
    ]
  }
})

$(".course").each(function() {
  $(this).mouseenter(function(){
    var a = "课程名： "+$(this).children().first().text() ;
    var b ="上课教师："+$(this).children().last().text();
    var c = "上课地点："+$(this).children().eq(2).text();
    $(".message").html(a +"<br/>"+ b+"<br/>"+ c);
              });

  $(this).mouseleave(function(){
    $(".message").html("  ");
              });
 });