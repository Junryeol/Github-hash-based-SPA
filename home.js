// TODO: kill process and remove page

const _repos_owner_name = "Junryeol";
const _main_repos_name = "Github-hash-based-SPA";
const _chat_repos_name = "chat-user-list";
const _pages = ["loginPage","searchPage","filePage","appPage"];

window.addEventListener('load', function(){
    let titles = ["title","header-title","footer-title"];

    for (let title of titles){
        document.getElementById(title).innerText = _main_repos_name;
    }

    hash('readmePage');
    logout();
});

function pageInnerHTML(id, html){
    if (!_pages.includes(id)){
        console.log(id + " is not a page")
        return;
    }

    for (let page of _pages){
        document.getElementById(page).className = "hidden";
    }

    document.getElementById(id).innerHTML = html;
    document.getElementById(id).className = "";
}

function basicAuth(){
    let id = document.getElementById('user-id').value;
    let pw = document.getElementById('user-pw').value;

    github.basicAuth(id, pw).then(function(data){
        if (data.type == "User"){
            loginSuccess();
        } else {
            alert("Worng ID or Password.");
        }
    });
}
function tokenAuth(){
    let token = document.getElementById('user-token').value;

    github.tokenAuth(token).then(function(data){
        if (data.type == "User"){
            loginSuccess();
        } else {
            alert("Worng Token.");
        }
    });
}

function loginSuccess(){
    document.getElementById('nav').innerHTML = `
        <a href="#myPage">Repos</a>
        <a href="#appPage">App</a>
        <a href="#basicAuthPage">Logout</a>
    `;
    hash("myPage");
    github.starring(_repos_owner_name, _chat_repos_name);
    document.getElementById('loginPage').innerHTML = "";
}
function logout(){
    if (github.user_name){
        github.unstarring(_repos_owner_name, _chat_repos_name);
        github.logout();
    }
    document.getElementById('nav').innerHTML = `
        <a href="#filePage">Files</a>
        <a href="#searchPage">Github</a>
        <a href="#basicAuthPage">Login</a>
    `;
    for (let page of _pages){
        document.getElementById(page).innerHTML = "";
    }
}

function basicAuthPage(){
    logout();
    pageInnerHTML('loginPage', `
    <form id="login-field" class="login-field" onsubmit="return false;">
        <input id="user-id" type="text" placeholder="github id" required>
        <input id="user-pw" type="password" placeholder="github pw" required>
        <input type="submit" value="login" onclick="basicAuth()">
        <a href="#tokenAuthPage">Token Login</a>
    </form>
    `);
}
function tokenAuthPage(){
    logout();
    pageInnerHTML('loginPage', `
    <form id="login-field" class="login-field" onsubmit="return false;">
        <input id="user-token" type="password" placeholder="github token" required>
        <input type="submit" value="login" onclick="tokenAuth()">
        <a target="_blank" href="https://github.atom.io/login" title="Use atom github token.">You can get a token here</a>
    </form>
    `);
}
function filePage(){
    pageInnerHTML('searchPage', `
    <form id="file-field" class="file-field" onsubmit="return false;">
        <input type="file" multiple onchange="this.nextSibling.nextSibling.innerText=this.value">
        <p>Drag your files here or click in this area.</p>
    </form>
    `);
}
function searchPage(){
    pageInnerHTML('searchPage', `
    <form id="login-field" class="login-field" onsubmit="return false;">
        <input id="repos-name" type="text" placeholder="github repos name" required>
        <input type="submit" value="Search" onclick="hash('searchResultPage',{repos_name:document.getElementById('repos-name').value})">
    </form>
    `);
}

function searchResultPage(params){
    let repositories_query = params.repos_name; 

    github.searchRepos(repositories_query).then(function(data){
        if (data.total_count == 0){
            alert("No matches found.");
        } else {
            let list = "\<ol\>";
            for (let repos of data.items){
                list += "\<li\>"+repos.full_name+"\<\/li\>";
            }
            list += "\<\/ol\>";
            pageInnerHTML('searchPage', list);    
        }
    });
}
function myPage(){
    github.getReposList(github.user_name).then(function(data){
        if (!data){
            alert("No repository found.");
        } else {
            let list = "\<p\>"+github.user_name+"\<\/p\>";
            list += "\<ol\>";
            for (let repos of data){
                list += "\<li\>"+repos.full_name+"\<\/li\>";
            }
            list += "\<\/ol\>";
            pageInnerHTML('searchPage', list);    
        }
    });
}
function appPage(){
    // TODO: app list로 변경
    // TODO: chat app로 변경
    github.stargazers(_repos_owner_name, _chat_repos_name).then(function(data){
        let list = "\<p\>chat users\<\/p\>";
        list += "\<ol\>";
        for (let repos of data){
            list += "\<li\>"+repos.login+"\<\/li\>";
        }
        list += "\<\/ol\>";
        pageInnerHTML('appPage', list);    
    });
}
function readmePage(){
    github.getContent(_repos_owner_name, _main_repos_name, "README.md").then(function(data){
        webWorker(function(data){
            return parseMd(atob(data));
        }, data.content
        , [
            "https://junryeol.github.io/Github-hash-based-SPA/snarkdown.js"
        ]).then(function(result){
            pageInnerHTML('filePage', result);    
        });
    });
}