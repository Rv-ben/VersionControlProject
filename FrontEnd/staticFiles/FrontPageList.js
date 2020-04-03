


$.getJSON("http://localhost:5131/repos.json",function(data){
    console.log(data);
    data.Repos.forEach(repoName => {
        var listItem = document.createElement("div",{class:"listItem"});

        var textholder = document.createElement("div");
        textholder.className ="holder";

        var repo = document.createElement("p",{class: "name"});
        
        repo.innerText = repoName;
        
        listItem.append(textholder);
        textholder.append(repo);

        textholder.setAttribute('onclick',"repoPage(this.childNodes[0].innerText)")

        document.getElementById("repoNames").appendChild(listItem);
    });
})

function refresh(){
    setTimeout(function(){
        window.location.replace("http://localhost:5131/")
    },100)
}

function repoPage(txt){
    //window.location.replace("http://localhost:5131/RepoPage?Reponame="+txt)
    window.location.href = "http://localhost:5131/RepoPage?Reponame="+txt
}