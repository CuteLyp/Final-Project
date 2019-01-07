function login () {    
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if(username !== undefined && password !== undefined) {
        let data = "username=" + username + "&password=" + password; 
        loginCheck(data).then(result => {
            if(result.username !== undefined && result.username !== null) {
                for(a in result) {
                    sessionStorage.setItem(a, result[a]);
                }
                //location.reload();
                window.location.href = 'index.html';
            } else if(result.response){
                document.getElementById('response').innerHTML = result.response;
            }
        });   
    } else {
        return false;
    }
    
}

function loginCheck (data) {
    let url = 'http://localhost:8080/login.do';
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('POST', url, true);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //req.setRequestHeader("Content-type", "application/json");
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
        //req.send("username="+username+"&password="+password);
        //req.send("username=3&password=1234");
    });
}