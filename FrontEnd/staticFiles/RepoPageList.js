

const par = new URLSearchParams(location.search)

var repo = par.get("Reponame")


window.onload = function(){
    this.document.getElementById("Title").innerText = repo;
    load()
    
    function load(){
        $('#repoNames').html('');
        $.ajax({
            url:"http://localhost:5131/json/"+repo,
            contentType: 'application/json',
            method: 'GET',
            success:(function(res){
                console.log(res)
                var  list = $('#repoNames')
                res.Versions.forEach(function(version){
                    list.append("<div class='holder'><p>"+version.ManifestID+"</p></div>")
                    version.labels.forEach(function(label){
                        list.append("<div class='holder'><p>"+label+"</p></div>")
                    })
                })
            })
        })
        
    }

    $('#label-form').on('submit',function(event){
        event.preventDefault();
        $.ajax({
            url: '/labelCommand',
            method: 'POST',
            data: {
                newLabel: $('#newLabel').val(),
                oldLabel: $('#oldLabel').val(),
                repoName: repo
            },
            success: function(response){
                console.log(response);
                load()
            }
        })
    });

    $('#checkin-form').on('submit',function(event){
        event.preventDefault();
        $.ajax({
            url: '/checkIn',
            method: 'POST',
            data: {
                repoName: repo
            }
        })
    });

    $('#checkout-form').on('submit',function(event){
        event.preventDefault();
        $.ajax({
            url: '/checkOut',
            method: 'POST',
            data: {
                dir: $('#dir').val(),
                man: $('#man').val(),
                repoName: repo
            }
        })
    });

    $('#MergeIn').on('submit',function(event){
        event.preventDefault();
        $.ajax({
            url: '/mergeIn',
            method: 'POST',
            data: {
                target: $('#Target').val(),
                repoName: repo
            }
        })
    });

    $('#MergeOut').on('submit',function(event){
        event.preventDefault();
        $.ajax({
            url: '/mergeOut',
            method: 'POST',
            data: {
                branch: $('#branch').val(),
                snapshot: $('#snapshot').val(),
                repoName: repo
            }
        })
    });




}