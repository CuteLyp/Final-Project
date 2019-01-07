var html = "";
$(document).ready(function () {
    $.ajax({
        url : "/allProjects",
        type: "POST",
        dataType: "json",
        contentType : "application/json;charset=utf-8",
        success : function (data) {
            var length = data.length;
            alert(length);
            //遍历数组
            $.each(data, function (index, project) {
                //alert(project.id + "," + project.title);
                //alert(index);索引[数组下标]

                html = '<a href="' + project.title + '">'
                    + '<div data-id="' + project.id + '" style="border: 1px solid black;">'
                    + '<div style="text-align: center">title:' +  project.title + '</div><br>'
                    + '<span>language:' + project.language + '</span><br>'
                    + '<span>supervisor:' + project.supervisor + '</span><br>'
                    + '<span>reference:' + project.reference + '</span><br>'
                    + '<span>description:' + project.description + '</span>'
                    + '</div><br>'
                    + '</a>';
                $(".projectList").append(html);
            })
        },
        error : function () {
            alert("fail");
        }
    });
})


//全部项目加载
var html = "";


$(document).ready(function () {
    $.ajax({
        url : "/allProjects",
        type: "POST",
        dataType: "json",
        contentType : "application/json;charset=utf-8",
        success : function (data) {
            //var length = data.length;
            //alert(length);
            //遍历数组
            /*
             insertSingleProject(data);
            for(var i = 0; i < data.length; i++) {
                alert(i + data[i]);
            }
            */
            generateItems(data);
            /*
            $.each(data, function (index, project) {
                //alert(project.id + "," + project.title);
                //alert(index);索引[数组下标]

                html = '<a href="' + project.title + '">'
                    + '<div data-id="' + project.id + '" style="border: 1px solid black;">'
                    + '<div style="text-align: center">title:' +  project.title + '</div><br>'
                    + '<span>language:' + project.language + '</span><br>'
                    + '<span>supervisor:' + project.supervisor + '</span><br>'
                    + '<span>reference:' + project.reference + '</span><br>'
                    + '<span>description:' + project.description + '</span>'
                    + '</div><br>'
                    + '</a>';
                $("#projectList").append(html);
            })
            */




        },
        error : function () {
            alert("fail");
        }
    });

})

var singleProjectDiv = '<a href="" name="1" onclick="detailsOfProject()">'
    + '<div singleProject-id="" style="border: 1px solid black;">'
    + '<div id="singleProject-title" style="text-align: center">title:</div><br>'
    + '<span id="singleProject-language">language:</span><br>'
    + '<span id="singleProject-supervisor">supervisor:</span><br>'
    + '<span id="singleProject-reference">reference:</span><br>'
    + '<span id="singleProject-description">description:</span>'
    + '</div><br>'
    + '</a>';

function generateItems (data) {
    var numberOfProjects = data.length;
    for(var i = 0; i < numberOfProjects; i++) {
        insertData(data[i]);
    }
}

function insertData (data) {
    $div = $(singleProjectDiv);
    $div.find('#singleProject-title').html(data.title);
    $div.find('#singleProject-language').html(data.language);
    $div.find('#singleProject-supervisor').html(data.supervisor);
    $div.find('#singleProject-reference').html(data.reference);
    $div.find('#singleProject-description').html(data.description);
    $div.appendTo($('div#projectList'));
}
function detailsOfProject () {
    var id = $(this).attr("name");
    alert(id);
}

$(function () {
    var id;
    $("a").click(function () {
        id = $(this).index();
        alert(data[id].title);
        html2 = '<div>' + data[id].title + '</div>';
        $(".projectList").append(html2);
    })
})


var html = "";
var html2 = "";
$(document).ready(function () {
    $.ajax({
        url : "/allProjects",
        type: "POST",
        dataType: "json",
        contentType : "application/json;charset=utf-8",
        success : function (data) {
            $(function () {
                var id;
                $("a").click(function () {
                    id = $(this).index();
                    html2 = '<div id="' + data[id].id + '" style="border: 1px solid black;">'
                        + '<div style="text-align: center">title:' +  data[id].title + '</div><br>'
                        + '<span>language:' + data[id].language + '</span><br>'
                        + '<span>supervisor:' + data[id].supervisor + '</span><br>'
                        + '<span>reference:' + data[id].reference + '</span><br>'
                        + '<span>description:' + data[id].description + '</span>'
                        + '</div><br>';
                    $(".projectList").replaceWith(html2);
                })
            });
            //遍历数组
            $.each(data, function (index, project) {
                //alert(project.id + "," + project.title);
                //alert(index);索引[数组下标]
                html = '<a>'
                    + '<div data-id="' + project.id + '" style="border: 1px solid black;">'
                    + '<div style="text-align: center">title:' +  project.title + '</div><br>'
                    + '<span>language:' + project.language + '</span><br>'
                    + '<span>supervisor:' + project.supervisor + '</span><br>'
                    + '<span>reference:' + project.reference + '</span><br>'
                    + '<span>description:' + project.description + '</span>'
                    + '</div><br>'
                    + '</a>';
                $(".projectList").append(html);
            })
        },
        error : function () {
            alert("fail");
        }
    });
})