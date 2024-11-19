let sname = document.getElementById('s-name');
let inputGroupFile02 = document.getElementById('inputGroupFile02');
let Price = document.getElementById('Price');
let submit = document.getElementById('submit');
let hours = document.getElementById('hours');
let online = document.getElementById('online/of');
let count = document.getElementById('count');
let By = document.getElementById('By');
let description = document.getElementById('description');

let mood = 'Create';
let temp;




let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];


submit.onclick = function(){
    let imageFile = inputGroupFile02.files[0]; 
    let imageUrl = imageFile ? URL.createObjectURL(imageFile) : ''; 

    let newProduct = {
        imageUrl: imageUrl,  
        sname: sname.value.toLowerCase(),
        Price: Price.value,
        hours: hours.value,
        online: online.value,
        By: By.value,
        count: 1,
        description: description.value,
        
    };

    if(mood === 'Create'){
        if(newProduct.count > 1){
            for(let i = 0; i < newProduct.count; i++){
                dataPro.push(newProduct);
            }
        } else {
           dataPro.push(newProduct);
        }
    } else {
        dataPro[temp] = newProduct;
        mood = 'Create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }

    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
}


function clearData(){
    inputGroupFile02.value = '';
    sname.value = '';
    Price.value = '';
    By.value = '';
    hours.value = '';
    online.value = '';
    description.value = '';
    count.value = '';
   
}

function showData(){
    
    let table = '';

    for(let i = 0; i < dataPro.length; i++){
        table += 
        `
        <tr>
                 <td><img src="${dataPro[i].imageUrl}" alt="Product Image" width="50"></td>
                 <td>${dataPro[i].sname}</td>
                 <td>${dataPro[i].Price}</td>
                 <td>${dataPro[i].By}</td>
                 <td>${dataPro[i].hours}</td>
                 <td>${dataPro[i].online}</td>
                 <td>${dataPro[i].description}</td>
                 
                 <td><button onclick='updateData(${i})' id='update'>Update</button></td>
                 <td><button onclick='deletData(${i})' id='delete'>Delete</button></td>
                
        </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;

    let btndelet = document.getElementById('deletAll');
    if(dataPro.length > 0){
        btndelet.innerHTML = `<button onclick='deletcal()'>Delete All (${dataPro.length})</button>`;
    } else {
        btndelet.innerHTML = '';
    }
}
showData();


function deletData(i){
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}


function deletcal(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


function updateData(i){
    sname.value = dataPro[i].sname;
    By.value = dataPro[i].By;
    hours.value = dataPro[i].hours;
    online.value = dataPro[i].online;
    description.value = dataPro[i].description;
    Price.value = dataPro[i].Price;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'Update';
    scroll({ top: 0, behavior: "smooth" });
    temp = i;
}



