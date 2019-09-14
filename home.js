function homeLogin(){
    var id = document.getElementById('user-id').value;
    var pw = document.getElementById('user-pw').value;

    github.login(id, pw).then(function(data){
        document.getElementById('user-info').innerHTML = "\<p\>"+data.login+"\<\/p\>"
        document.getElementById('user-info').innerHTML += "\<button onclick='setHash(\"homeGetMyReposList\")'\>MyReposList\<\/button\>"
    }).then(homeGetMyReposList)
}

function homeGetMyReposList(){
    github.getReposList(github.user_name).then(function(data){
        document.getElementById('repos-list').innerHTML=""
        for (let repos of data){
            document.getElementById('repos-list').innerHTML += "\<li\>"+repos.full_name+"\<\/li\>"
        }
    })
}

function searchRepos(){
    var repos_name = document.getElementById('repos-name').value;

    github.searchRepos(repos_name).then(function(data){
        console.log(data);
        var list = "\<ol\>";
        for (let repos of data.items){
            list += "\<li\>"+repos.full_name+"\<\/li\>";
        }
        list += "\<\/ol\>";
        document.getElementById('main').innerHTML = list
    })
}

function login(){
    var id = document.getElementById('user-id').value;
    var pw = document.getElementById('user-pw').value;

    github.login(id, pw).then(function(data){
        if (data.type == "User"){
            document.getElementById('nav').innerHTML = `
                <a href="#repos">Repos</a>
                <a href="#chat">Chat</a>
                <a href="#logout">Logout</a>
            `;
            document.getElementById('main').innerHTML = "\<p\>"+data.login+"\<\/p\>"
            github.getReposList(github.user_name).then(function(data){
                var list = "\<ol\>";
                for (let repos of data){
                    list += "\<li\>"+repos.full_name+"\<\/li\>";
                }
                list += "\<\/ol\>";
                document.getElementById('main').innerHTML += list
            })
        } else {
            document.getElementById('login-field').innerHTML = `
                <input id="user-id" type="text" placeholder="github id">
                <input id="user-pw" type="password" placeholder="github pw">
                <input type="submit" value="Login" onclick="hash('login')">
                <p class="fadein">Wrong ID or Password.</p>
            `;
        }
    });
}

function logout(){
    github.logout();
    document.getElementById('main').innerHTML = `
    <form id="login-field" class="login-field" onsubmit="return false;">
        <input id="user-id" type="text" placeholder="github id">
        <input id="user-pw" type="password" placeholder="github pw">
        <input type="submit" value="Login" onclick="hash('login')">
    </form>
    `;
    document.getElementById('nav').innerHTML = `
        <a href="#filePage">File</a>
        <a href="#searchPage">Github</a>
        <a href="#logout">Login</a>
    `;
}

function searchPage(){
    document.getElementById('main').innerHTML = `
    <form id="login-field" class="login-field" onsubmit="return false;">
        <input id="repos-name" type="text" placeholder="github repos name">
        <input type="submit" value="Search" onclick="hash('searchRepos')">
    </form>
    `;
}

function filePage(){
    document.getElementById('main').innerHTML = `
    <form id="file-field" class="file-field" onsubmit="return false;">
        <input type="file" multiple>
        <p>Drag your files here or click in this area.</p>
    </form>
    `;
}
