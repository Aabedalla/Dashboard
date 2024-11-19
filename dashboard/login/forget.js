

function login() {
    const emailInput = document.querySelector('.logEmail');
    const passwordInput = document.querySelector('.logPassword');
    
    const email = emailInput?.value || '';
    const password = passwordInput?.value || '';

    if (email === 'a@gmail.com') {
        alert('we will send v-code');
        return;
    }
   
}
