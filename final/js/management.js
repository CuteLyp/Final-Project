function ajax (url, data) {
	return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('POST', url, true);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
        req.send(data);
    });
}

function test() {
	let data ='id=3';
	let url = 'http://localhost:8080/project/dispose';
	ajax(url, data).then(result => {
		//console.log(result);
		//console.log(result[1]);
		for(let i = 0; i < result.length; i++) {
			table(result[i], i+1);
			for(let j = 0; j < result[i].length; j++) {
				row(result[i][j], i+1, j+1);
			}
		}
	});
}

(function () {
	window.onload = () => {
		test();
	}
})();

function table (t, i) {
	const body = document.getElementById('container');
	const table = document.createElement('table');
	table.setAttribute('class', 'table table-sm');
	table.setAttribute('id', 'table-' + i);
	const thead = document.createElement('thead');
	thead.setAttribute('id', 'thead-' + i);
	const tr = document.createElement('tr');
	for(let j = 1; j <= 4; j++) {
		const th = document.createElement('th');
		th.setAttribute('scope', 'col');
		if(j === 1) {
			th.innerHTML = '#';
		} else if(j === 2) {
			th.innerHTML = 'Project Id';
		} else if(j === 3) {
			th.innerHTML = 'Student Id';
		} else if(j === 4) {
			th.innerHTML = 'Tendency';
		}
		tr.appendChild(th);
	}
	thead.appendChild(tr);
	table.appendChild(thead);
	body.appendChild(table);
}

function row (p, i, j) {
	const table = document.getElementById('table-' + i);
	const pTitle = document.createElement('p');
	const tbody = document.createElement('tbody');
	const tr = document.createElement('tr');
	const th = document.createElement('th');
	th.innerHTML = j;
	tr.appendChild(th);
	for(let i = 0; i < 4; i++) {
		const td = document.createElement('td');
		if(i === 0) {
			td.innerHTML = p.pid;
		} else if(i === 1) {
			td.innerHTML = p.id;
		} else if(i === 2) {
			td.innerHTML = p.tendency;
		}
		tr.appendChild(td);
	}
	tbody.appendChild(tr);
	table.appendChild(tbody);
}