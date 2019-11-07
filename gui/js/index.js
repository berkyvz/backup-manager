function updateFileList(){
    var fileList = document.getElementById("file-list");
    fileList.innerHTML = "Reading..."
    
    var html = "";
    
    setTimeout(function(){ 
        fetch('http://localhost:3000').then(res =>  res.json()).then( data => {
        for(elementIndex in data.folders){
            //<li onclick="itemClicked(event);" class="list-group-item">Cras justo odio</li>
            var element = `<li onclick="itemClicked(event);" item-index=${elementIndex} class="list-group-item">${data.folders[elementIndex]}</li>`;
           html = html + element;
        }
    fileList.innerHTML = html;
    });
     }, 340);
}

function removeFromList(){
    let selectedItem = document.getElementsByClassName("selected")[0];
    selectedItem.remove();
    let index = selectedItem.getAttribute("item-index");
    let value = selectedItem.lastChild;
    var obj = { 'index' : index,
                'value' : value.data
            };
    console.log(obj);
    fetch('http://localhost:3000/remove-from-list', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(obj)
       }).then(res => res.json()).then( data =>  {
            alert(`Message: ${data.status}`);
        });

    updateFileList();
}

function itemClicked(e){
    var a = document.getElementsByTagName('li');
    for (i = 0; i < a.length; i++) {
        a[i].classList.remove('active')
        a[i].classList.remove('selected')
    }

    e.target.classList.add('active');
    e.target.classList.add('selected');
}


function addToList(e){
    var element = document.getElementById("list-item");

    var obj = {'path': element.value};
    
    fetch('http://localhost:3000/add-file', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(obj)
       }).then(res => res.json()).then( data =>  {
        alert(`Message: ${data.status}`);
        });

        updateFileList();
        element.value = "";
    
}

updateFileList();