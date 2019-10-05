const _repos_owner_name = "Junryeol";
const _main_repos_name = "Github-hash-based-SPA";
const _chat_repos_name = "chat-user-list";

window.addEventListener('load', function(){
    github.getContent(_repos_owner_name, _main_repos_name, "README.md").then(function(data){
        document.getElementById('main').innerHTML = parseMd(atob(data.content));
    });
});

function basicAuth(){
    var id = document.getElementById('user-id').value;
    var pw = document.getElementById('user-pw').value;

    github.basicAuth(id, pw).then(function(data){
        if (data.type == "User"){
            document.getElementById('nav').innerHTML = `
                <a href="#myPage">Repos</a>
                <a href="#appPage">App</a>
                <a href="#logout">Logout</a>
            `;
            hash("myPage");
            github.starring(_repos_owner_name, _chat_repos_name);
        } else {
            // TODO: 에러 문구 삽입
        }
    });
}
function tokenAuth(){
    var token = document.getElementById('user-token').value;

    github.tokenAuth(token).then(function(data){
        if (data.type == "User"){
            document.getElementById('nav').innerHTML = `
                <a href="#myPage">Repos</a>
                <a href="#appPage">App</a>
                <a href="#logout">Logout</a>
            `;
            hash("myPage");
            github.starring(_repos_owner_name, _chat_repos_name);
        } else {
            // TODO: 에러 문구 삽입
        }
    });
}

function logout(){
    github.unstarring(_repos_owner_name, _chat_repos_name);
    github.logout();
    document.getElementById('nav').innerHTML = `
        <a href="#filePage">Files</a>
        <a href="#searchPage">Github</a>
        <a href="#basicAuthPage">Login</a>
    `;
    hash("basicAuthPage");
}

function basicAuthPage(){
    document.getElementById('main').innerHTML = `
    <form id="login-field" class="login-field" onsubmit="return false;">
        <input id="user-id" type="text" placeholder="github id">
        <input id="user-pw" type="password" placeholder="github pw">
        <input type="submit" value="login" onclick="basicAuth()">
        <a href="#tokenAuthPage">Token Login</a>
    </form>
    `;
}
function tokenAuthPage(){
    document.getElementById('main').innerHTML = `
    <form id="login-field" class="login-field" onsubmit="return false;">
        <input id="user-token" type="text" placeholder="github token">
        <input type="submit" value="login" onclick="tokenAuth()">
        <a target="_blank" href="https://github.atom.io/login" title="Use atom github token.">You can get a token here</a>
    </form>
    `;
}

function filePage(){
    document.getElementById('main').innerHTML = `
    <form id="file-field" class="file-field" onsubmit="return false;">
        <input type="file" multiple onchange="this.nextSibling.nextSibling.innerText=this.value">
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
function appPage(){
    document.getElementById('main').innerHTML = "chat users";
    github.stargazers(_repos_owner_name, _chat_repos_name).then(function(data){
        var list = "\<ol\>";
        for (let repos of data){
            list += "\<li\>"+repos.login+"\<\/li\>";
        }
        list += "\<\/ol\>";
        document.getElementById('main').innerHTML += list;
    });
}
