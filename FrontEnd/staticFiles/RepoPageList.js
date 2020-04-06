

const par = new URLSearchParams(location.search)

var repo = par.get("Reponame")


window.onload = function(){
    this.document.getElementById("Title").innerText = repo;

    $.getJSON("http://localhost:5131/json/"+repo,function(data){

    data.Versions.forEach(snapshot => {
        var listItem = document.createElement("div",{class:"listItem"});

        var textholder = document.createElement("div");
        textholder.className ="holder";

        var repo = document.createElement("p",{class: "name"});
        
        repo.innerText = snapshot.ManifestID;
        
        listItem.append(textholder);
        textholder.append(repo);

        textholder.setAttribute('onclick',"repoPage(this.childNodes[0].innerText)")

        document.getElementById("repoNames").appendChild(listItem);
    });

    document.getElementById('checkInRepo').value = repo;
    document.getElementById('checkOutRepo').value = repo;
    document.getElementById('labelRepo').value = repo;

    })
}