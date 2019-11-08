function progress(isActive) {
    if (isActive) {
        document.getElementById("load-renderer").innerHTML += '<div id="progress" class="loader-container"><div class="loader"></div></div>';
    }
    if (!isActive) {
        let loading = document.getElementById("progress");
        loading.remove();
    }
}


function updateFileList() {

    var fileList = document.getElementById("file-list");
    progress(true);
    fileList.innerHTML = "Reading..."
    var html = "";

    setTimeout(function () {
        fetch('http://localhost:3000').then(res => res.json()).then(data => {

            if (!data.folders[0] == "") {


                for (elementIndex in data.folders) {
                    var element = `<li onclick="itemClicked(event);" item-index=${elementIndex} class="list-group-item">${data.folders[elementIndex]}</li>`;
                    html = html + element;
                }
                fileList.innerHTML = html;

            }
            else {
                fileList.innerHTML = "Not Found. Add More."
                document.getElementById("save-btn").setAttribute("disabled","disabled");
            }
            progress(false);
        });
    }, 340);
}


function removeFromList() {
    try {
        progress(true);
        let selectedItem = document.getElementsByClassName("selected")[0];
        selectedItem.remove();

        let index = selectedItem.getAttribute("item-index");
        let value = selectedItem.lastChild;
        var obj = {
            'index': index,
            'value': value.data
        };

        fetch('http://localhost:3000/remove-from-list', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(res => res.json()).then(data => {
            progress(false);
            alert(`Message: ${data.status}`);
        });

        updateFileList();
    } catch (error) {
        console.log("HATA OLUŞTU");
        progress(false);
    }

}

function itemClicked(e) {
    var a = document.getElementsByTagName('li');
    for (i = 0; i < a.length; i++) {
        a[i].classList.remove('active')
        a[i].classList.remove('selected')
    }

    e.target.classList.add('active');
    e.target.classList.add('selected');
}


function addToList(e) {
    var element = document.getElementById("list-item");

    if (element.value === "") {
        alert(`Message: This is not a correct path`);
    } else {
        var obj = { 'path': element.value };

        fetch('http://localhost:3000/add-file', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(res => res.json()).then(data => {

        });
    }


    updateFileList();
    element.value = "";

}


function setInputEditable() {
    let input = document.getElementById("destination-path-input");
    input.removeAttribute("readonly");
}

function saveInput() {
    progress(true);
    let input = document.getElementById("destination-path-input");
    obj = { "path": input.value }
    fetch('http://localhost:3000/save-destination', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res => res.json()).then(data => {
        progress(false);
    });


    input.setAttribute("readonly", "readonly");
}

function updateFromFile() {
    progress(true);
    let input = document.getElementById("destination-path-input");


    setTimeout(() => {
        fetch('http://localhost:3000').then(res => res.json()).then(data => {

            let path = data.destination;
            input.setAttribute("placeholder", `${path}`);
            input.value = `${path}`;
            input.setAttribute("readonly", "readonly");
            progress(false);
        });
    }, 300);
}


function runBackup() {

    progress(true);

    let inputPath = document.getElementById("destination-path-input").value;
    var obj = { path: inputPath };
    fetch('http://localhost:3000/backup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res => res.json()).then(data => {
        progress(false);
        alert(`Message: ${data.status}`);
    });
}

updateFileList();
updateFromFile();