let Fname = document.getElementById('F-name');
let Lname = document.getElementById('L-name');
let submit = document.getElementById('submit');
let count = document.getElementById('count');
let Roal = document.getElementById('Roal');
let Email = document.getElementById('Email');
let Pnumber = document.getElementById('P-number');
let mood = 'Create';
let temp;




let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];


submit.onclick = function(){
    let imageFile = inputGroupFile02.files[0]; 
    let imageUrl = imageFile ? URL.createObjectURL(imageFile) : ''; 

    let newProduct = {
        imageUrl: imageUrl,  
        Fname: Fname.value.toLowerCase(),
        Roal: Roal.value,
        Email: Email.value,
        count:  1,
        Pnumber: Pnumber.value,
        Lname: Lname.value,
        
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
    Fname.value = '';
    Lname.value = '';
    Roal.value = '';
    Email.value = '';
    count.value = '';
    Pnumber.value = '';
   
}

function showData(){
    
    let table = '';

    for(let i = 0; i < dataPro.length; i++){
        table += 
        `
        <tr>
                 <td><img src="${dataPro[i].imageUrl}" alt="Product Image" width="50"></td>
                 <td>${dataPro[i].Fname}</td>
                 <td>${dataPro[i].Lname}</td>
                 <td>${dataPro[i].Email}</td>
                 <td>${dataPro[i].Pnumber}</td>
                 <td>${dataPro[i].Roal}</td>
                 
                 
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
    Fname.value = dataPro[i].Fname;
    Lname.value = dataPro[i].Lname;
    Email.value = dataPro[i].Email;
    Pnumber.value = dataPro[i].Pnumber;
    Roal.value = dataPro[i].Roal;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'Update';
    scroll({ top: 0, behavior: "smooth" });
    temp = i;
}



