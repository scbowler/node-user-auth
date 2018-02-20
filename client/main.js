$(document).ready(addClickHandlers);

function addClickHandlers(){
    $('#register').on('click', () => {
        console.log('Register clicked');

        register();
    });

    $('#signin').on('click', () => {
        console.log('Sign In Clicked');

        signIn();
    });

    $('#get-user').on('click', () => {
        console.log('Get User Clicked');

        $.ajax({
            url: '/another-route',
            method: 'POST',
            headers: {
                authorization: localStorage.getItem('token')
            },
            success: resp => {
                console.log('Get User Response:', resp);
            }
        });
    });
}

function signIn(){
    const values = {
        email: $('#email-signin').val(),
        password: $('#password-signin').val()
    }

    console.log('Sign In Values:', values);

    $.ajax({
        url: '/signin',
        method: 'POST',
        data: values,
        success: resp => {
            console.log('Sign In Response:', resp);

            localStorage.setItem('token', resp.token);
        }
    })
}

function register(){
    const values = {
        email: $('#email').val(),
        firstName: $('#first-name').val(),
        lastName: $('#last-name').val(),
        password: $('#password').val()
    };

    console.log('Register Values:', values);

    $.ajax({
        url: '/signup',
        method: 'POST',
        data: values,
        success: resp => {
            console.log('Register response:', resp);
        }
    });
}
