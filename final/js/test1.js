(function () {
    window.onload = () => {
        const body = document.getElementById('container');
        const div = document.getElementById('loading');
        body.style.display = 'none';
        const img = document.createElement('img');
        div.appendChild(img);
        img.setAttribute('id', 'test7');
        img.setAttribute('src', '../static/images/loader.gif');

        const button = document.createElement('button');
        button.innerHTML = 'Button';
        button.addEventListener('click', e => {
            console.log(1);
            document.getElementById('test7').remove();
        });
        //div.appendChild(button);
        projectsRequest();
    }
})();

function projectsRequest() {
    const url = '/projects/all';
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onload = () => {
            if(req.status == 200) {
                resolve(JSON.parse(req.response));
            } else {
                rejext(Error(req.statusText));
            }
        }
        req.onerror = () => {
            reject(Error('Network Error'));
        }
        req.send();
    });
}

projectsRequest().then(response => {
    const body = document.getElementById('container');
    //document.getElementById('test7').remove();
    body.style.display = 'block';
    for(let i of response.list) {
        //insertProject(i);
        test0(i);
    }
    pagination(response.pageNum, response.pages);
});

function pagination(pageNum, pages) {
    console.log(pageNum + '/ ' + pages);
}

function test0(project) {
    const outerDiv = document.createElement('div');
    outerDiv.setAttribute('class', 'project-id');
    const innerDiv = document.createElement('div');
    innerDiv.setAttribute('class', 'project-title');
    const a = document.createElement('a');
    innerDiv.appendChild(a);
    a.setAttribute('href', '/projects/'+ project.id);
    a.setAttribute('class', 'subProject');
    a.innerHTML = project.title;
    a.appendChild(document.createElement('br'));
    const b1 = document.createElement('b');
    b1.innerHTML = 'Language: ';
    const span1 = document.createElement('span');
    span1.innerHTML = project.language;
    const b2 = document.createElement('b');
    b2.innerHTML = 'Supervisor: ';
    const span2 = document.createElement('span');
    span2.innerHTML = project.supervisor;
    const b3 = document.createElement('b');
    b3.innerHTML = 'Degree: ';
    const span3 = document.createElement('span');
    span3.innerHTML = project.degree;
    const b4 = document.createElement('b');
    b4.innerHTML = 'CCS: ';
    const span4 = document.createElement('span');
    span4.innerHTML = project.level1;
    outerDiv.appendChild(innerDiv);
    outerDiv.appendChild(document.createElement('br'));
    outerDiv.appendChild(b1);
    outerDiv.appendChild(document.createElement('br'));
    outerDiv.appendChild(span1);
    outerDiv.appendChild(document.createElement('br'));
    outerDiv.appendChild(b2);
    outerDiv.appendChild(document.createElement('br'));
    outerDiv.appendChild(span2);
    outerDiv.appendChild(document.createElement('br'));
    outerDiv.appendChild(b3);
    outerDiv.appendChild(document.createElement('br'));
    outerDiv.appendChild(span3);
    outerDiv.appendChild(document.createElement('br'));
    outerDiv.appendChild(b4);
    outerDiv.appendChild(document.createElement('br'));
    outerDiv.appendChild(span4);
    outerDiv.appendChild(document.createElement('br'));

    const div = document.getElementById('project-list');
    div.appendChild(outerDiv);
}



$(document).ready(function () {
    $(".dropdown-item").click(function () {
        var code = $(this).attr("id");
        $.ajax({
            url: "/projects/category",
            type: "GET",
            dataType: "json",
            data: {
                code: code
            },
            beforeSend: function () {
                $("#body-content").hide();
                $("#loading").show();
            },
            success: function (data) {
                $("#project-list").empty();
                if(data.size != 0) {
                    $.each(data.list, function (index, project) {
                        content = '<div data-id="' + project.id + '" style="border-top: 1px solid gainsboro; ' +
                            'margin-bottom: 2%; padding-left: 1%;">'
                            + '<div style="text-align: center; overflow:hidden; ' +
                            'white-space:nowrap; text-overflow: ellipsis;">'
                            + '<a href="/projects/' + project.id + '" class="subproject">'
                            + project.title + '</a>' + '</div><br>'
                            + '<b>Language:</b><br>' + project.language
                            + '<br><b>Supervisor:</b><br>' + project.supervisor
                            + '<br><b>Degree:</b><br>' + project.degree
                            + '<br><b>CCS:</b><br>' + project.level1
                            + '</div>';
                        $("#project-list").append(content);
                    })
                } else {
                    content = "No relevant projects";
                    $("#project-list").append(content);
                }

            },
            complete: function () {
                $("#body-content").show();
                $("#loading").hide();
            },
            error: function () {
                alert("fail");
            },
        })
    })
})

function test1() {
    alert("success");
}

//分页模块
function pagination(pageNum) {
    $.ajax({
        url : "/projects/all",
        type : "GET",
        dataType : "json",
        data : {
            pageNum : pageNum
        },
        beforeSend: function() {
            $("#body-content").hide();
            $("#loading").show();
        },
        success: function(data) {
            $("#project-list").empty();
            $.each(data.list, function (index, project) {
                content = '<div data-id="' + project.id + '" style="border-top: 1px solid gainsboro; ' +
                    'margin-bottom: 2%; padding-left: 1%;">'
                    + '<div style="text-align: center; overflow:hidden; ' +
                    'white-space:nowrap; text-overflow: ellipsis;">'
                    + '<a href="/projects/' + project.id + '" class="subproject">'
                    + project.title + '</a>' + '</div><br>'
                    + '<b>Language:</b><br>' + project.language
                    + '<br><b>Supervisor:</b><br>' + project.supervisor
                    + '<br><b>Degree:</b><br>' + project.degree
                    + '<br><b>CCS:</b><br>' + project.level1
                    + '</div>';
                $("#project-list").append(content);
            });
            $("#page-info-list").empty();

            var firstNum = data.pageNum - 2;
            var secondNum = data.pageNum - 1;
            var thirdNum = data.pageNum;
            var fourthNum = data.pageNum + 1;
            var fifthNum = data.pageNum + 2;
            var prePage = data.pageNum - 1;
            var nextPage = data.pageNum + 1;
            if(data.pageNum < 4 || data.pages < 6) {
                firstNum = 1;
                secondNum = 2;
                thirdNum = 3;
                fourthNum = 4;
                fifthNum = 5;
            } else if (data.pageNum > data.pages - 2) {
                firstNum = data.pages - 4;
                secondNum = data.pages - 3;
                thirdNum = data.pages - 2;
                fourthNum = data.pages - 1;
                fifthNum = data.pages;
            }
            if(data.isFirstPage) {
                prePage = 1;
            }
            if(data.isLastPage) {
                nextPage = data.pages;
            }
            paginatitonPreli = '<li class="page-item"><a class="page-link" onclick="pagination('
                + prePage + ')">Previous</a></li>';
            if(data.pageNum != 1) {
                $("#page-info-list").append(paginatitonPreli);
            }
            $.each(data.navigatepageNums, function (index) {
                paginationLi = '<li class="page-item"><a class="page-link" onclick="pagination('
                    + data.navigatepageNums[index] + ')">' + data.navigatepageNums[index] + '</a></li>';
                $("#page-info-list").append(paginationLi);
            })

            if(data.pages < 5) {
                var pageNumber = data.pages;
                while(pageNumber != 5) {
                    pageNumber++;
                    paginationLi = '<li class="page-item disabled"><a class="page-link">' + pageNumber
                        + '</a></li>';
                    $("#page-info-list").append(paginationLi);
                }
            }

            paginationNextLi = '<li class="page-item"><a class="page-link" onclick="pagination('
                + nextPage + ')">Next</a></li>';
            $("#page-info-list").append(paginationNextLi);

        },
        complete: function() {
            $("#body-content").show();
            $("#loading").hide();
        },
        error : function () {
            alert("fail");
        },
    });
}

//分类模块

var singleDiv = '<div>' + '<div>' + '<a href="">' + '</a><br>' + '</div>'
    + '<span></span>' + '<span></span><br>' + '<span></span><br>' + '<span></span><br>'
    + '</div>';


//登陆模块
var storage = window.localStorage;
var username = storage["username"];
var password = storage["password"];
var isPassword = storage["ispassword"];
var isAutoLogin = storage["isautologin"];
if("yes" == isPassword) {
    if("yes" == isAutoLogin) {
        if((("" != username)||(null != username)) && (("" != passoword)||(null != password))) {
            $("username").val(username);
            $("password").val(password);
            $.ajax({
                url : "/loginCheck",
                type : "POST",
                dataType : "json",
                contentType : "application/json;charset=utf-8",
                data : JSON.stringify({
                    username : username,
                    password : password
                }),
                success : function (data) {
                    alert(data);
                },
                error : function () {
                    alert("用户名或密码错误");
                }
            });
        }
    }
}
function loginButton () {
    //修改username和password为id
    var username = $("username").val;
    var password = $("password").val;
    var storage = window.localStorage;
    if(document.getElementById("isRememberIdPwd").check) {
        storage["username"] = username;
        storage["password"] = password;
        storage["isStorePwd"] = "yes";
    } else {
        storage["username"] = username;
        storage["password"] = passowrd;
    }
}


function requestSelect () {
    $.ajax({
        url : "/test",
        type : "POST",
        dataType : "json",
        //contentType : "application/json",
        //出问题 没有这只是键值对
        data : {
            id : $("input[name='user_id']").val()
        },
        success: function(data) {
            if(data != null) {
                $("#query-box-span").html("成功");
                $("#query-user-id").html(data.id);
                $("#query-user-name").html(data.name);
                $("#query-user-age").html(data.age);
                $("#query-user-username").html(data.username);
                $("#query-user-password").html(data.password);
                $("#query-user-identity").html(data.identity);
            } else {
                alert("error");
            }
        },
        error: function() {
            $("#select-box-span").html("失败");
        }
    });
}

//增加用户示例
function insertUser () {
    $.ajax({
        url : "/insertUser",
        type : "POST",
        dataType : 'json',
        contentType : "application/json;charset=utf-8",
        data : JSON.stringify({
            name : $("input[name='insert-user-name']").val(),
            age : $("input[name='insert-user-age']").val(),
            username : $("input[name='insert-user-username']").val(),
            password : $("input[name='insert-user-password']").val(),
            identity : $('select option:selected').val()
            //选取select中options的值
        }),
        success : function (data) {
            if(data == 1) {
                alert("插入成功");
            } else {
                alert("插入失败");
            }
        },
        error : function () {
            alert("插入失败");
        }
    });
}


//删除示例
function deleteUser () {
    $.ajax({
        url : "/deleteUser",
        type : "POST",
        dataType : "json",
        data : {
            id : $("input[name='delete-user']").val()
        },
        success : function () {
            alert("删除成功");
        },
        error : function () {
            alert("删除失败");
        }
    });
}

//发布项目
function insertProject() {
    $.ajax({
        url : "/insertProject",
        type : "POST",
        dataType : "json",
        contentType : "application/json;charset=utf-8",
        data : JSON.stringify({
            title : $("input[name='title']").val(),
            language : $("input[name='language']").val(),
            supervisor : $("input[name='supervisor']").val(),
            category : $("input[name='category']").val(),
            reference : $("input[name='reference']").val(),
            description : $("textarea[name='description']").val()
        }),
        success : function () {
            alert("success");
        },
        error : function () {
            alert("fail");
        }
    });
}

//搜索项目
function queryProject () {
    $.ajax({
        url : "/queryProject",
        type : "POST",
        dataType : "json",
        contentType : "application/json;charset=utf-8",
        data : {
            title : $("input[name='query-project-title']").val(),
            supervisor : $("input[name='query-project-supervisor']").val(),
            language : $("input[name='query-project-language']").val(),
            category : $("input[name='query-project-category']").val(),

        },
        success: function(data) {
            alert(data.id + data.title + data.supervisor + data.language + data.category);
        },
        error: function() {
            alert("fail");
        }
    });
}

//
function editProject () {
    $.ajax({
        url : "/editProject",
        type : "POST",
        dataType : "json",
        contentType : "application/json;charset=utf-8",
        data : JSON.stringify({
            title : $("td[id='project-edit-title']").val(),
            /*
            title : $,
            supervisor : ,
            language : ,
            reference : ,
            description : ,
            category : ,
            */
        }),
        success : function (data) {
            alert(data.title);
        },
        error : function () {
            alert("获取失败");
        }
    });
}

function test () {
    $("#test").append(html);
    //只能获取最后一个project
}
/*
//弹窗
$(function () {
    var screenwidth, screenheight, top, getPosLeft, getPosTop;
    screenwidth = $(window).width();
    screenheight = $(window).height();
    top = $(document).scroll();
    getPosLeft = screenwidth / 2 - 260;
    getPosTop = screenheight / 2 - 150;

    $("#box").css({"left": getPosLeft, "top": getPosTop});
})
*/

var studentBar = '<div id="submit-bar-approved" class="submit-bar-approved">' +
    '<span style="display: block; float: left; width: 50%;">Approved:</span>' +
    '<span style="display: block; float: right; width: 50%;">Operation:</span>' +
    '<div id="submit-bar-approved-list" align="center">You have not sign in</div>' +
    '</div>';
var lectureBar = '<div id="submit-bar-lecture" class="submit-bar-lecture">' + '</div>';