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

function homeSearchRepos(){
    var repos_name = document.getElementById('repos-search').value;

    github.searchRepos(repos_name).then(function(data){
        document.getElementById('repos-list').innerHTML=""
        for (let repos of data.items){
            document.getElementById('repos-list').innerHTML += "\<li\>"+repos.full_name+"\<\/li\>"
        }
    })
}

function logout(){
    github.logout();
}
