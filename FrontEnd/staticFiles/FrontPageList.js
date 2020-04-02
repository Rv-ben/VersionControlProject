


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

        document.getElementById("repoNames").appendChild(listItem);
    });
})

