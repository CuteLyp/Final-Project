(function () {
	window.onload = () => {
		maintainCookie();
		manageProjectFunction();
	}
})();

function ajaxRequest (url, data, type, submitedType) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.responseType = 'json';
        if(type === 'get') {
        	req.open('GET', url, true);
        } else if(type === 'post'){
        	req.open('POST', url, true);
        }
        req.withCredentials = true;
        if(submitedType === 'json') {
        	req.setRequestHeader('Content-Type', 'application/json');
        } else {
    		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    	}
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
        if(data !== undefined) {
            req.send(data);
        } else {
            req.send();
        }
    });
}

var username = '';
var identity = '';
function maintainCookie() {
    let cookie = [];
    cookie = document.cookie.split(";");
    for(let i of cookie) {
        const s1 = i.split("=")[0].trim();
        const s2 = i.split("=")[1].trim();
        if(s1 === 'username') {
            username = s2;
        } else if(s1 === 'identity') {
            identity = s2;
        }
    }
}

function manageProjectFunction() {
	const data = 'username=' + username;
	const url = 'http://localhost:8080/project/dispose';
	if(username !== '') {
		ajaxRequest(url, data, 'post').then(result => {
			//console.log(result);
			for(let i = 0; i < result.length; i++) {
				if(result[i][0].draft !== 'true') {
					const outer = generateButton(result[i][0], i+1);
					const tbody = generateTable(result[i], i+1, outer);
					for(let j = 0; j < result[i].length; j++) {
						if(result[i][j].sid !== undefined) {
							generateItems(tbody, result[i][j], i+1, j+1);
						}
					}
					generateSubmitButton(tbody);
				} else {
					generateButtonForDraft(result[i][0], i+1);
					//生成draft表
				}
			}
		});
	} else {
		window.location = 'login.html';
	}
}

function generateButtonForDraft(p, i) {
	//console.log(p);
	const body = document.getElementById('draft');
	const span = document.createElement('span');
	span.innerHTML = i + '. ' + p.pt;
	const div1 = document.createElement('div');
	div1.setAttribute('class', 'row table-item');
	const div2 = document.createElement('div');
	const a1 = document.createElement('a');
	const a2 = document.createElement('a');
	a1.setAttribute('class', 'btn btn-warning');
	a1.setAttribute('data-id', p.pid);
	a1.setAttribute('href', '#');
	a1.innerHTML = 'Edit';
	a1.onclick = editProject;
	a2.setAttribute('class', 'btn btn-danger');
	a2.setAttribute('data-id', p.pid);
	a2.setAttribute('href', '#');
	a2.innerHTML = 'Delete';
	a2.onclick = deleteProject;
	div1.appendChild(span);
	div2.setAttribute('style', 'float: right');
	div2.appendChild(a1);
	div2.appendChild(a2);
	const div3 = document.createElement('div');
	div3.setAttribute('style', 'clear: both');
	div1.appendChild(div2);
	div1.appendChild(div3);
	body.appendChild(div1);
}

function generateButton(p, i) {
	const moduleDiv = document.getElementById('submitted');
	//row
	const outer = document.createElement('div');
	outer.setAttribute('class', 'row table-item');

	const div = document.createElement('div');
	div.setAttribute('class', 'sub-header');
	//project name and id 一行
	const span = document.createElement('span');
	span.innerHTML = i + '. ' + p.pt;
	const float = document.createElement('div');
	float.setAttribute('style', 'float: right');
	const details = document.createElement('a');
	details.setAttribute('class', 'btn btn-primary');
	details.setAttribute('data-toggle', 'collapse');
	//
	details.setAttribute('href', '#table-' + i);
	details.setAttribute('role', 'button');
	details.setAttribute('aria-expanded', 'false');
	details.setAttribute('aria-controls', 'table-' + i);
	details.innerHTML = 'Details';
	div.appendChild(span);
	float.appendChild(details);
	const edit = document.createElement('a');
	edit.setAttribute('href', '#');
	edit.setAttribute('data-id', p.pid);
	edit.innerHTML = 'Edit';
	edit.setAttribute('class', 'btn btn-warning');
	edit.onclick = editProject;
	float.appendChild(edit);
	const deleteA = document.createElement('a');
	deleteA.setAttribute('href', '#');
	deleteA.setAttribute('data-id', p.pid);
	deleteA.innerHTML = 'Delete';
	deleteA.setAttribute('class', 'btn btn-danger');
	deleteA.onclick = deleteProject;
	float.appendChild(deleteA);

	div.appendChild(float);
	const temp = document.createElement('div');
	temp.setAttribute('style', 'clear: both');
	div.appendChild(temp);
	outer.appendChild(div);
	moduleDiv.appendChild(outer);
	return outer;
}

function generateSubmitButton(tbody) {
	const tr = document.createElement('tr');
	for(let i = 0; i < 4; i++) {
		const td = document.createElement('td');
		if(i === 3) {
			const a = document.createElement('a');
			a.setAttribute('class', 'btn-sm btn-success');
			a.setAttribute('href', '#');
			a.innerHTML = 'Submit';
			td.appendChild(a);
		}
		tr.appendChild(td);
	}
	tbody.appendChild(tr);
}

function generateTable (t, i, outer) {
	//const body = document.getElementById('submitted');
	const div = document.createElement('div');
	div.setAttribute('id', 'table-' + i);
	div.setAttribute('class', 'table-responsive collapse');
	const table = document.createElement('table');
	table.setAttribute('id', 'table'+i);
	table.setAttribute('class', 'table table-striped');
	const thead = document.createElement('thead');
	//thead.setAttribute('id', 'thead' + i);
	const tbody = document.createElement('tbody');
	const tr = document.createElement('tr');
	for(let j = 0; j < 4; j++) {
		const th = document.createElement('th');
		th.setAttribute('scope', 'col');
		if(j === 0) {
			th.innerHTML = '#';
		} else if(j === 1) {
			th.innerHTML = 'Student ID';
		} else if(j === 2) {
			th.innerHTML = 'Tendency';
		} else {
			th.innerHTML = 'Operation';
		}
		tr.appendChild(th);
	}
	thead.appendChild(tr);
	table.appendChild(thead);
	table.appendChild(tbody);
	div.appendChild(table);
	outer.appendChild(div);
	return tbody;
}

function generateItems (tbody, p, i, j) {
	const table = document.getElementById('table' + i);
	const tr = document.createElement('tr');
	const th = document.createElement('th');
	th.innerHTML = j;
	tr.appendChild(th);
	for(let i = 0; i < 3; i++) {
		const td = document.createElement('td');
		const button1 = document.createElement('a');
		const button2 = document.createElement('a');
		if(i === 0) {
			td.innerHTML = p.sid;
		} else if(i === 1) {
			td.innerHTML = p.tendency;
		} else if(i === 2) {
			if(p.designated === p.sid) {
				button2.innerHTML = 'Cancel';
				button2.setAttribute('href', '#');
				button2.setAttribute('pdid', p.pid);
				button2.setAttribute('class', 'btn-sm btn-danger');
				button2.onclick = cancelCandidate;
				td.appendChild(button2);
			} else {
				button1.innerHTML = 'Designate';
				button1.setAttribute('href', '#');
				button1.setAttribute('sdid', p.sid);
				button1.setAttribute('pdid', p.pid);
				button1.setAttribute('class', 'btn-sm btn-primary');
				button1.onclick = delegateCandidate;
				td.appendChild(button1);
			}
		}
		tr.appendChild(td);
	}
	tbody.appendChild(tr);
}

let level1Code = '';
let level2Code = '';
let level3Code = '';
function editProject() {
	projectId = this.getAttribute('data-id');
	const url = 'http://localhost:8080/project/single';
	const data = 'id=' + this.getAttribute('data-id');
	ajaxRequest(url, data, 'post').then(response => {
		//console.log(response);
		level1Code = response.project.level1;
		level2Code = response.project.level2;
		level3Code = response.project.level3;
	
		const project = response.project;
		const level1Val = project.level1;
		const level2Val = project.level2;
		const level3Val = project.level3;
		const s = document.getElementById('nav-sidebar').childNodes[5];
		const e1 = document.createEvent("MouseEvents");
        e1.initEvent("click", true, true);
        s.dispatchEvent(e1);
        document.getElementById('ipTitle').value = project.title;
        document.getElementById('ipLanguage').value = project.language;
        document.getElementById('ipSupervisor').value = project.supervisor;
        document.getElementById('ipReference').value = project.reference;
        document.getElementById('ipDescription').value = project.description;
        if(project.available) {
        	document.getElementById('ipAvailable').checked = true;
        }
        if(project.draft) {
        	document.getElementById('ipDraft').checked = true;
        }
        if(project.degree !== '') {
        	const degreeOptions = document.getElementById('ipDegree');
        	if(project.degree === 'bachelor') {
        		degreeOptions.selectedIndex = 1;
        	} else if(project.degree === 'master') {
        		degreeOptions.selectedIndex = 2;
        	} else {
        		degreeOptions.selectedIndex = 3;
        	}
        }
	});
}

function chain() {
	return new Promise((resolve, reject) => {
		resolve();
	});
}

function deleteProject() {
	const answer = confirm("Are you sure to delete this project?")
	const id = this.getAttribute('data-id');
	const url = 'http://localhost:8080/project/delete';
	const data = 'code=' + id;
  	if (answer) {
    	ajaxRequest(url, data, 'post').then(response => {
    		if(response === 1) {
    			alert("success");
    			setTimeout(() => {
    				location.reload();
    			}, 1000);
    		}
    	});
  	}
}

let manageProject = true;
let addProject = false;
let temp = document.getElementById('addProjectModule');
document.getElementById('addProjectModule').remove();
function changeModule(p) {
	const s = p.firstChild.innerHTML;
	if((manageProject && s === 'Manage Projects') ||
		(addProject && s === 'Add Projects')) {
		return false;
	}
	const active = document.getElementById('nav-sidebar');
	const body = document.getElementById('content-body');
	const manageProjectModule = document.getElementById('manageProjectModule');
	const addProjectModule = document.getElementById('addProjectModule');
	const z1 = active.childNodes[3];
	const z2 = active.childNodes[5];

	if(manageProject) {
		z1.classList.remove('active');
		z2.classList.add('active');
		manageProject = false;
		addProject = true;
		body.appendChild(temp);
		temp = manageProjectModule;
		document.getElementById('manageProjectModule').remove();
		chain().then(() => {
			loadCategory();
		}).then(() => {
			if(level2Code !== '') {
				loadCategory(level1Code);
			}
		}).then(() => {
			if(level3Code !== '') {
				loadCategory(level2Code);
			}
		});
	} else if(addProject) {
		z2.classList.remove('active');
		z1.classList.add('active');
		addProject = false;
		manageProject = true;
		body.appendChild(temp);
		temp = addProjectModule;
		const level1Select = document.getElementById('ipLevel1');
		const level2Select = document.getElementById('ipLevel2');
    	const level3Select = document.getElementById('ipLevel3');
    	clearOptions(level1Select);
    	clearOptions(level2Select);
        clearOptions(level3Select);
		document.getElementById('addProjectModule').remove();
	}
}

function chooseSelected(level) {
	let options_array = '';
	if(level === 1) {
		options_array = document.getElementById('ipLevel1').options;
		for(let i = 1; i <= options_array.length; i++) {
			if(options_array[i] !== undefined) {
				if(options_array[i].getAttribute('data-id') === level1Code) {
					document.getElementById('ipLevel1').selectedIndex = i;
				}
			}
		}
	} else if(level === 2) {
		options_array = document.getElementById('ipLevel2').options;
		for(let i = 1; i <= options_array.length; i++) {
			if(options_array[i] !== undefined) {
				if(options_array[i].getAttribute('data-id') === level2Code) {
					document.getElementById('ipLevel2').selectedIndex = i;		
				}
			}
		}
	} else if(level === 3) {
		options_array = document.getElementById('ipLevel3').options;
		for(let i = 1; i <= options_array.length; i++) {
			if(options_array[i] !== undefined) {
				if(options_array[i].getAttribute('data-id') === level3Code) {
					document.getElementById('ipLevel3').selectedIndex = i;		
				}
			}
		}
	}
	//console.log(options_array.length);	
}


let level1 = 0;
let level2 = 0;
function queryCCSCategory () {
    const level1Select = document.getElementById('ipLevel1');
    const level2Select = document.getElementById('ipLevel2');
    const level3Select = document.getElementById('ipLevel3');
    const index1 = level1Select.selectedIndex;
    const index2 = level2Select.selectedIndex;
    const index3 = level3Select.selectedIndex;
    let code1 = 0;
    let code2 = 0;
    let code3 = 0;
    if(index1 !== 0) {
        code1 = document.getElementById('ipLevel1').getElementsByTagName('option')[index1].getAttribute('data-id');
    }
    if(index2 !== 0) {
        code2 = document.getElementById('ipLevel2').getElementsByTagName('option')[index2].getAttribute('data-id');
    }
    if(index3 !== 0) {
        code3 = document.getElementById('ipLevel3').getElementsByTagName('option')[index3].getAttribute('data-id');
    }
    //console.log(level1 + '/ ' + level2 + '/ ' + level3);
    const first = document.createElement('option');
    first.innerHTML = 'Choose...';    
    if(code1 === 0) {
        //console.log(1);
        clearOptions(level2Select);
        clearOptions(level3Select);
        level1 = 0;
    } else if (code1 !== 0 && code2 === 0 && code3 === 0){
        //console.log(2);
        loadCategory(code1);
        level1 = code1; 
    } else if(code1 !== level1 && (code2 !== 0 || code3 !== 0)) {
        //console.log(3);
        clearOptions(level2Select);
        clearOptions(level3Select);
        loadCategory(code1);
        level1 = code1;
    } else if(code2 === 0 || code2 !== level2){
        //console.log(4);
        clearOptions(level3Select);
        loadCategory(code2);
        level2 = code2;
    }
}

function insertOption (i, select) {
    let option = document.createElement('option');
    option.innerHTML = i.name;
    option.setAttribute('data-id', i.id);
    select.appendChild(option);
}

function clearOptions(e) {
    const option = document.createElement('option');
    option.innerHTML = 'Choose...';
    e.innerHTML = '';
    e.appendChild(option);
}

function loadCategory (code, level) {
    code = code === undefined ? 0 : code;
    let url = 'http://localhost:8080/project/level?code=' + code;
    let level1Select = document.getElementById('ipLevel1');
    let level2Select = document.getElementById('ipLevel2');
    let level3Select = document.getElementById('ipLevel3');
    let length = level1Select.getElementsByTagName('option').length;
    ajaxRequest(url, '', 'get', 'json').then(response => {
    	//console.log(response);
        if(code === 0 && length < 2) {
        	console.log(1);
            for(let i = 0; i < response.length; i++) {
                insertOption(response[i], level1Select);
            }
            chooseSelected(1);
        } else if(level2Select.selectedIndex !== 0 && level1Select.selectedIndex !== 0) {
            console.log(3);
            for(let i = 0; i < response.length; i++) {
                insertOption(response[i], level3Select);
            }
            chooseSelected(3);
        } else {
        	console.log(2);
            for(let i = 0; i < response.length; i++) {
                insertOption(response[i], level2Select);
            }
            chooseSelected(2);
        }
        
    });
}

var projectId = '';
function collection () {
	let url = 'http://localhost:8080/project/insert';
	let degreeSelect = document.getElementById('ipDegree');
	let degreeSelectedId = degreeSelect.selectedIndex;
	let level1Select = document.getElementById('ipLevel1');
	let level1SelectedId = level1Select.selectedIndex;
	let level2Select = document.getElementById('ipLevel2');
	let level2SelectedId = level2Select.selectedIndex;
    let level3Select = document.getElementById('ipLevel3');
    let level3SelectedId = level3Select.selectedIndex;
	if(level2SelectedId === -1) {
		alert("You should choose at least one css category")
		return false;
	}
	let isAvailable = document.getElementById("ipAvailable").checked;
	let isDraft = document.getElementById("ipDraft").checked;
	data = {
		id : projectId === '' ? 0 : projectId,
		title : document.getElementById('ipTitle').value,
		supervisor : document.getElementById('ipSupervisor').value,
		language : document.getElementById('ipLanguage').value,
		degree : degreeSelect[degreeSelectedId].text,
		level1 : level1Select[level1SelectedId].text,
		level2 : level2Select[level2SelectedId].text,
        level3 : level3Select[level3SelectedId].text,
        isAvailable : isAvailable,
        isDraft : isDraft,
		reference : document.getElementById('ipReference').value,
		description : document.getElementById('ipDescription').value
	}
	//console.log(data);
	ajaxRequest(url, JSON.stringify(data), 'post', 'json').then(response => {
		console.log(response);
        if(response === 1) {
            alert("success");
            setTimeout(() => {
                location.reload();
            }, 1000);
        } else if(response === 0) {
            alert("failed");
        }
	});
}

function clean() {
	let degreeSelect = document.getElementById('ipDegree');
	let degreeSelectedId = degreeSelect.selectedIndex;
	let level1Select = document.getElementById('ipLevel1');
	let level1SelectedId = level1Select.selectedIndex;
	let level2Select = document.getElementById('ipLevel2');
	let level2SelectedId = level2Select.selectedIndex;
    let level3Select = document.getElementById('ipLevel3');
    let level3SelectedId = level3Select.selectedIndex;
	if(level2SelectedId === -1) {
		alert("You should choose at least one css category")
		return false;
	}
	let isAvailable = document.getElementById("ipAvailable").checked;
	let isDraft = document.getElementById("ipDraft").checked;
	data = {
		title : document.getElementById('ipTitle').value,
		supervisor : document.getElementById('ipSupervisor').value,
		language : document.getElementById('ipLanguage').value,
		degree : degreeSelect[degreeSelectedId].text,
		level1 : level1Select[level1SelectedId].text,
		level2 : level2Select[level2SelectedId].text,
        level3 : level3Select[level3SelectedId].text,
        isAvailable : isAvailable,
        isDraft : isDraft,
		reference : document.getElementById('ipReference').value,
		description : document.getElementById('ipDescription').value
	}
}

function insertion (i, select) {
	const option = document.createElement('option');
	option.innerHTML = i.name;
	select.appendChild(option);
}

function cancelCandidate() {
	const pid = this.getAttribute('pdid');
	const answer = confirm('Are you sure to cancel?');
	const data = 'sid=' + 0 + "&pid=" + pid;
	const url = 'http://localhost:8080/project/designate' + '?' + data;
  	if (answer) {
    	ajaxRequest(url, '', 'get').then(response => {
    		console.log(response);
    		if(response === 1) {
    			alert("success");
    			setTimeout(() => {
    				location.reload();
    			}, 1000);
    		}
    	});
  	}
}

function delegateCandidate() {
	const sid = this.getAttribute('sdid');
	const pid = this.getAttribute('pdid');
	const answer = confirm('Are you sure to delegate this project to this student?');
	const data = 'sid=' + sid + "&pid=" + pid;
	const url = 'http://localhost:8080/project/designate' + '?' + data;
  	if (answer) {
    	ajaxRequest(url, '', 'get').then(response => {
    		console.log(response);
    		if(response === 1) {
    			alert("success");
    			setTimeout(() => {
    				location.reload();
    			}, 1000);
    		}
    	});
  	}
}

function changeButtons() {
	//this.style.color = ;
}

function confirmChanges() {
	const answer = confirm('Are you sure to submit these changes?');
	if (answer) {
		delegateCandidate();
		cancelCandidate();
	}
}

function chain1() {
	return new Promise((resolve, reject) => {
		resolve();
	});
}

function testChain() {
	chain1().then(() => {
		console.log(1);
	}).then(() => {
		console.log(2);
	})
}
//testChain();