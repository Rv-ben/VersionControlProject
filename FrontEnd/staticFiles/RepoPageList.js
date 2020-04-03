

const par = new URLSearchParams(location.search)

var repo = par.get("Reponame")


window.onload = function(){
    this.document.getElementById("Title").innerText = repo;

}