addEventListener("DOMContentLoaded", (event) => {

    console.log('Inside of login.js');
    const signupButton = document.getElementById('create-account-button');
    signupButton.addEventListener('click', () => {
        console.log('Inside of eventlistener for signupButton');
        fetch('/signup', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json)
            .then((res) => {
                console.log('User sent to signup page');
                window.location.href = "/signup";
            });
    })
});