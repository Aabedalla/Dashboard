let title = document.getElementById('title');
let age = document.getElementById('age');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let profitRatio = document.getElementById('profitRatio');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let tottal = document.getElementById('tottal');
let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let description = document.getElementById('description');

let mood = 'Create';
let temp;


function getTotal() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - discount.value;
        if (profitRatio.value !== '') {
            result += result * (+profitRatio.value / 100);
        }
        tottal.innerHTML = result.toFixed(2); // Show result with two decimals
        tottal.style.background = '#040';
        tottal.style.color = '#ffffff';
    } else {
        tottal.innerHTML = '';
        tottal.style.background = '#ff0000';
    }
}
submit.onclick = function () {
    if (!dataPro) {
        console.error('dataPro is not defined!');
        return;
    }

    // Collect all uploaded images
    let imageFiles = inputGroupFile02.files;
    let imageUrls = []; // Array to store image URLs

    // Generate URLs for each uploaded image
    if (imageFiles) {
        for (let file of imageFiles) {
            imageUrls.push(URL.createObjectURL(file));
        }
    }

    let newProduct = {
        images: imageUrls, // Save the array of images
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        age: age.value,
        description: description.value,
        discount: discount.value,
        profitRatio: profitRatio.value,
        tottal: tottal.innerHTML,
        count: count.value || 1, // Default to 1 if no count is provided
        category: category.value.toLowerCase(),
    };

    if (mood === 'Create') {
        // Add the product with its images
        dataPro.push(newProduct);
    } else {
        // Update mode: Replace the current product
        dataPro[temp] = newProduct;
        mood = 'Create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }

    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
};

function clearData(){
    inputGroupFile02.value = '';
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    age.value = '';
    discount.value = '';
    tottal.innerHTML = '';
    count.value = '';
    description.value = '';
    category.value = '';
}

function showData() {
    getTotal();
    let table = '';

    for (let i = 0; i < dataPro.length; i++) {
        let imagesHtml = '';
        
        // Generate HTML for each image
        if (dataPro[i].images) {
            dataPro[i].images.forEach((image) => {
                imagesHtml += `<img src="${image}" alt="Product Image" width="50" style="margin-right: 5px;">`;
            });
        }

        table += 
        `
        <tr>
            <td>${imagesHtml}</td> <!-- Display multiple images -->
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].age}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].tottal}</td>
            <td>${dataPro[i].count}</td> <!-- Show the count -->
            <td>${dataPro[i].category}</td>
            <td class="dis">${dataPro[i].description}</td>
            <td><button onclick='updateData(${i})' id='update'>Update</button></td>
            <td><button onclick='deletData(${i})' id='delete'>Delete</button></td>
        </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;

    let btndelet = document.getElementById('deletAll');
    if (dataPro.length > 0) {
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
    
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    age.value = dataPro[i].age;
    count.value = dataPro[i].count;
    profitRatio.value = dataPro[i].profitRatio;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    description.value = dataPro[i].description;

    
    let existingImages = dataPro[i].images || [];
    console.log("Existing images:", existingImages);


    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'Update';
    scroll({ top: 0, behavior: "smooth" });
    temp = i;
}



