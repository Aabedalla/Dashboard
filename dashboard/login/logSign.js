

function login() {
    const emailInput = document.querySelector('.logEmail');
    const passwordInput = document.querySelector('.logPassword');
    
    const email = emailInput?.value || '';
    const password = passwordInput?.value || '';

    if (email !== 'a@gmail.com') {
        alert('Please enter a valid email');
        return;
    }

    if (password !== '123') {
        alert('Please enter a valid password');
        return;
    }

    window.location.href = "index.html"
}
