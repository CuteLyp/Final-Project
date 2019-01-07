(function () {
	window.onload = () => {
		getData ();
	};
})();

function ajax (url) {
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

function getData () {
	let id = sessionStorage.getItem("pid");
	let url = 'http://localhost:8080/project/' + id;
	ajax(url).then(result => {
		console.log(result);
		display(result);
	});
}


function display(p) {
	const body = document.getElementById('container');
	const title = document.createElement('b');
	title.innerHTML = p.title;
	const description = document.createElement('p');
	const reference = document.createElement('p');
	description.innerHTML = p.description;
	reference.innerHTML = p.reference;
	body.appendChild(title);
	body.appendChild(description);
	body.appendChild(reference);
}