(function () {
    window.onload = () => {
        loadData();
        topList();
        
        queryStates(2);

        let login = document.getElementById('a-login');
        login.onclick = loginPage;
        let management = document.getElementById('a-management');
        management.onclick = managementPage;
        let logout = document.getElementById('a-logout');
        logout.onclick = logout;

        const body = document.getElementById('container');
        const div = document.getElementById('loading');
        body.style.display = 'none';
        const img = document.createElement('img');
        div.appendChild(img);
        img.setAttribute('src', '../images/loader.gif');

        
        const button = document.createElement('button');
        button.innerHTML = 'Button';
        button.addEventListener('click', () => {
            console.log(1);
            //document.getElementById('test7').remove();
        });
        //div.appendChild(button);
        let student = document.getElementById('student');
        let lecture = document.getElementById('lecture');
        if(student) {
            studentBar(document.getElementById('su').innerHTML);
        } else if(lecture) {
            console.log(document.getElementById('lu').innerHTML);
        }
    }
})();

function ajaxRequest (url) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('GET', url, true);
        req.withCredentials = true;
        req.setRequestHeader('Content-Type', 'application/json');
        req.onload = () => {
            if(req.status === 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = () => {
            reject(Error('Network Error'));
        };
        req.send();
    });
}

function loadData (page) {
    let url = '';
    if(page === '' || page == null) {
        url = 'http://localhost:8080/project/all/1';
    } else {
        url = 'http://localhost:8080/project/all/' + page;
    }
    ajaxRequest (url).then(response => {
        //console.log(response);
        const body = document.getElementById('container');
        if(body.style.display === 'none') {
            body.style.display = 'block';
            document.getElementById('loading').remove();
        }
        if(response != null) {
            document.getElementById('project-list').innerHTML = '';
            for(let i of response.list) {
                insertion(i);
            }
            document.getElementById('page-info-list').innerHTML = '';
            pagination(response.pageNum, response.pages);
        }
    });
}

function insertion (project) {
    const outerDiv = document.createElement('div');
    outerDiv.setAttribute('class', 'project-id');
    const innerDiv = document.createElement('div');
    innerDiv.setAttribute('class', 'project-title');
    const a = document.createElement('a');
    innerDiv.appendChild(a);
    a.setAttribute('href', '/projects/'+ project.id);
    a.setAttribute('class', 'subProject');
    a.innerHTML = project.title;
    a.onclick = detailsProjectPage;
    a.appendChild(document.createElement('br'));
    outerDiv.appendChild(innerDiv);
    for(let i = 1; i <= 4; i++) {
        const b = document.createElement('b');
        const span = document.createElement('span');
        if(i === 1) {
            b.innerHTML = 'Language: ';
            span.innerHTML = project.language;
        } else if(i === 2) {
            b.innerHTML = 'Supervisor: ';
            span.innerHTML = project.supervisor;
        } else if(i === 3) {
            b.innerHTML = 'Degree: ';
            span.innerHTML = project.degree;
        } else {
            b.innerHTML = 'CCS: ';
            span.innerHTML = project.level1;
        }
        outerDiv.appendChild(document.createElement('br'));
        outerDiv.appendChild(b);
        outerDiv.appendChild(document.createElement('br'));
        outerDiv.appendChild(span);
    }
    const div = document.getElementById('project-list');
    div.appendChild(outerDiv);
}

function pagination (pageNum, pages) {
    //console.log('Current page is: ' + pageNum + ' Pages: ' + pages);
    //first page li
    const bar = document.getElementById('page-info-list');
    const first = document.createElement('li');
    first.setAttribute('class', 'page-item');
    if(pageNum === 1) {
        first.classList.add('disabled');
    }
    const firstA = document.createElement('a');
    firstA.setAttribute('href', '#page-1');
    firstA.setAttribute('class', 'page-link');
    firstA.innerHTML = '&laquo;';
    firstA.onclick = () => {
        loadData(1);
        return false;
    };
    first.appendChild(firstA);
    bar.appendChild(first);
    //
    for(let i = 1; i <= 5; i++) {
        const li = document.createElement('li');
        li.setAttribute('class', 'page-item');
        const a = document.createElement('a');
        if (pageNum > 3 && pageNum + 2 <= pages) {
            if ((pageNum - 3 + i) === pageNum) {
                li.classList.add('active');
            }
            a.setAttribute('href', '#page-' + (pageNum - 3 + i));
            a.setAttribute('class', 'page-link');
            a.innerHTML = (pageNum - 3 + i) + '';
        } else if(pages > 5 && pageNum + 2 > pages) {
            if ((pages - 5 + i) === pageNum) {
                li.classList.add('active');
            }
            a.setAttribute('href', '#page-' + (pages - 5 + i));
            a.setAttribute('class', 'page-link');
            a.innerHTML = (pages - 5 + i) + '';
        } else {
            if (i === pageNum) {
                li.classList.add('active');
            }
            if (i > pages) {
                li.classList.add('disabled');
            }
            a.setAttribute('href', '#page-' + i);
            a.setAttribute('class', 'page-link');
            a.innerHTML = i + '';
        }
        if(pages - i >= 0) {
            li.onclick = turningPage;
        }
        li.appendChild(a);
        bar.appendChild(li);
    }
    //last page li
    const last = document.createElement('li');
    last.setAttribute('class', 'page-item');
    if(pageNum === pages) {
        last.classList.add('disabled');
    }
    const lastA = document.createElement('a');
    lastA.setAttribute('href', '#page-' + pages);
    lastA.setAttribute('class', 'page-link');
    lastA.innerHTML = '&raquo;';
    lastA.onclick = () => {
        loadData(pages);
        return false;
    };
    last.appendChild(lastA);
    bar.appendChild(last);
}

function turningPage () {
    let page = this.firstChild.innerHTML;
    loadData(page);
    return false;
}

function topList() {
    let url = 'http://localhost:8080/project/topList';
    ajaxRequest(url).then(response => {
        //1 max 2 title 3 id
        //console.log(response);
        if(response != null) {
            const ul = document.getElementById('submit-bar-top-ul');
            for(let i of response) {
                const a = document.createElement('a');
                a.setAttribute('class','list-group-item d-flex justify-content-between align-items-center');
                a.setAttribute('href', '/projects/' + i.id);
                a.onclick = detailsProjectPage;
                const small = document.createElement('small');
                small.innerHTML = i.title;
                const span = document.createElement('span');
                span.setAttribute('class', 'badge badge-primary badge-pill');
                span.innerHTML = i.amount;
                a.appendChild(small);
                a.appendChild(span);
                ul.appendChild(a);
            }
        }
    });
}

//登陆之后studentbar/ lecturebar
function queryStates(id) {
    let url = 'http://localhost:8080/states/' + id;
    ajaxRequest(url).then(response => {
        //console.log(response);
        const tbody = document.getElementById('table-tbody');
        tbody.innerHTML = '';
        for(let i = 0; i < 5; i++) {
            if(response != null) {
                if(response.length > i) {
                    const tr = document.createElement('tr');
                    const th = document.createElement('th');
                    th.setAttribute('scope', 'row');
                    th.innerHTML = (i+1) + '';
                    const id = document.createElement('td');
                    id.innerHTML = response[i].id;
                    const state = document.createElement('td');
                    if(response[i].state === 'Accepted') {
                        state.setAttribute('class','accept');
                    } else if(response[i].state === 'Rejected') {
                        state.setAttribute('class','reject');
                    } else if(response[i].state === 'Pending') {
                        state.setAttribute('class','pending');
                    }
                    state.innerHTML = response[i].state;
                    tr.appendChild(th);
                    tr.appendChild(id);
                    tr.appendChild(state);
                    tbody.appendChild(tr);
                } else {
                    const tr = document.createElement('tr');
                    const th = document.createElement('th');
                    th.setAttribute('scope', 'row');
                    th.innerHTML = (i+1) + '';
                    const id = document.createElement('td');
                    id.innerHTML = 'You have not chose yet';
                    const state = document.createElement('td');
                    tr.appendChild(th);
                    tr.appendChild(id);
                    tr.appendChild(state);
                    tbody.appendChild(tr);
                }
            } else {
                const tr = document.createElement('tr');
                const th = document.createElement('th');
                th.setAttribute('scope', 'row');
                th.innerHTML = (i+1) + '';
                const id = document.createElement('td');
                id.innerHTML = 'You have not chose yet';
                const state = document.createElement('td');
                tr.appendChild(th);
                tr.appendChild(id);
                tr.appendChild(state);
                tbody.appendChild(tr);
            }
        }
    });
}

function logout () {
    let url = 'http://localhost:8080/user/logout.do';
    ajaxRequest(url).then(result => {
        console.log(result);
    });
    return false;
}

function loginPage () {
    window.location.href = 'login.html';
    return false;
}
function managementPage () {
    window.location.href = 'management.html';
    return false;
}


function test10 () {
    let url = 'http://localhost:8080/user/testTimeOut';
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('GET', url, true);
        req.withCredentials = true;
        req.onload = () => {
            if(req.status === 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = () => {
            reject(Error('Network Error'));
        };
        req.send();
    });
}

function testTimeOut() {
    test10().then(result => {
        console.log(result.username);
        //localStorage.setItem(result.username, result.username.value);
    });
}

function detailsProjectPage () { 
    console.log(this.href.split('/').pop());
    let id = this.href.split('/').pop();
    sessionStorage.setItem("pid", id); 
    window.location.href = 'project.html';
    //window.opener.function();
    return false;
};


function test6() {
    let id = this.href.split('/').pop();
    sessionStorage.setItem("pid", id);
    return false;
}
//insertBefore