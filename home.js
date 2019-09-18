window.addEventListener('load', function(){
    github = new Github();
    github.getContent("Junryeol", "Github-hash-based-SPA", "README.md").then(function(data){
        document.getElementById('main').innerHTML = parseMd(atob(data.content));
    });
});

function login(){
    var id = document.getElementById('user-id').value;
    var pw = document.getElementById('user-pw').value;

    github.login(id, pw).then(function(data){
        if (data.type == "User"){
            document.getElementById('nav').innerHTML = `
                <a href="#myPage">Repos</a>
                <a href="#chatPage">Chat</a>
                <a href="#logout">Logout</a>
            `;
            hash("myPage");
            github.starring("Junryeol", "chat-user-list");
        } else {
            hash("loginErrorPage");
        }
    });
}
function logout(){
    github.logout();
    document.getElementById('nav').innerHTML = `
        <a href="#filePage">Files</a>
        <a href="#searchPage">Github</a>
        <a href="#loginPage">Login</a>
    `;
    hash("loginPage");
    github.unstarring("Junryeol", "chat-user-list");
}
function loginPage(){
    document.getElementById('main').innerHTML = `
    <form id="login-field" class="login-field" onsubmit="return false;">
        <input id="user-id" type="text" placeholder="github id">
        <input id="user-pw" type="password" placeholder="github pw">
        <input type="submit" value="Login" onclick="login()">
    </form>
    `;
}
function loginErrorPage(){
    document.getElementById('main').innerHTML = `
    <form id="login-field" class="login-field" onsubmit="return false;">
        <input id="user-id" type="text" placeholder="github id">
        <input id="user-pw" type="password" placeholder="github pw">
        <input type="submit" value="Login" onclick="login()">
        <p class="fadein">Wrong ID or Password.</p>
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

function searchRepos(){
    var repos_name = document.getElementById('repos-name').value;

    github.searchRepos(repos_name).then(function(data){
        console.log(data);
        var list = "\<ol\>";
        for (let repos of data.items){
            list += "\<li\>"+repos.full_name+"\<\/li\>";
        }
        list += "\<\/ol\>";
        document.getElementById('main').innerHTML = list;
    })
}
function searchPage(){
    document.getElementById('main').innerHTML = `
    <form id="login-field" class="login-field" onsubmit="return false;">
        <input id="repos-name" type="text" placeholder="github repos name">
        <input type="submit" value="Search" onclick="searchRepos()">
    </form>
    `;
}
function myPage(){
    document.getElementById('main').innerHTML = "\<p\>"+github.user_name+"\<\/p\>";
    github.getReposList(github.user_name).then(function(data){
        var list = "\<ol\>";
        for (let repos of data){
            list += "\<li\>"+repos.full_name+"\<\/li\>";
        }
        list += "\<\/ol\>";
        document.getElementById('main').innerHTML += list;
    });
}

function chatPage(){
    document.getElementById('main').innerHTML = "chat users";
    github.stargazers("Junryeol", "chat-user-list").then(function(data){
        var list = "\<ol\>";
        for (let repos of data){
            list += "\<li\>"+repos.login+"\<\/li\>";
        }
        list += "\<\/ol\>";
        document.getElementById('main').innerHTML += list;
    });
}
