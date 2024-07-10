let containerS = document.getElementById("container");

// Helper function to get users from localStorage
function getUsersFromStorage() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Helper function to save users to localStorage
function saveUsersToStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Alert messages (customize as needed)
let messagesAlert = {
    msgErrorObj: {
        title: "Oops...",
        text: "Please fill in all fields.",
        timer: 1000,
    },
    msgEmailUsed: {
        title: "Invalid email or email already in use",
        timer: 1000,
    },
    msgInvalidName: {
        title: "Invalid name",
        text: "Please enter a valid name.",
        timer: 1000,
    },
    msgInvalidPassword: {
        title: "Invalid password",
        text: "Password must contain at least 8 characters with one uppercase letter, one lowercase letter, and one digit.",
        timer: 1000,
        },
        msgSusses: {
            title: "SignUp successfull",
            text: "Please Wait ....",
        timer: 2000
    },
        msgSussesLog: {
        title: "Login successfull",
        timer: 3000
    },
        msgError: {
        title: "Oops...",
        text: "Please fix the errors in the form.",
        timer: 1000
    },
        msgErrorLog: {
        title: "Oops...",
        text: "Invalid email or password.",
        timer: 1000
    },
    msgLogOut: {
    title: "LogOut Successfull!",
    timer: 1500
}
};

// Registration
document.addEventListener('DOMContentLoaded', function() {
    let registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let nameInput = document.getElementById('name');
            let emailInput = document.getElementById('email');
            let passwordInput = document.getElementById('password');

            let name = nameInput.value;
            let email = emailInput.value.trim();
            let password = passwordInput.value.trim();

            // Validate name
            let nameValid = /^[a-zA-Z\s]+$/.test(name);
            if (nameValid && name.length > 6) {
                nameInput.style.borderColor = 'green';
            } else {
                nameInput.style.borderColor = 'red';
                Swal.fire(messagesAlert.msgInvalidName);
            }

            // Validate email
            let emailValid = /\S+@\S+\.\S+/.test(email);
            if (emailValid) {
                emailInput.style.borderColor = 'green';
            } else {
                emailInput.style.borderColor = 'red';
                Swal.fire(messagesAlert.msgEmailUsed);
            }

            // Validate password
            let passwordValid = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/.test(password);
            if (passwordValid) {
                passwordInput.style.borderColor = 'green';
            } else {
                passwordInput.style.borderColor = 'red';
                Swal.fire(messagesAlert.msgInvalidPassword);
            }

            // Check if all fields are valid
            if (nameValid && emailValid && passwordValid) {
                let users = getUsersFromStorage();

                // Check if email is already registered
                    if (users.find(user => user.email.toLowerCase() === email.toLowerCase())) {
                    emailInput.style.borderColor = 'red';
                        Swal.fire(messagesAlert.msgEmailUsed);
                } else {
                    // Register user
                    users.push({ name, email, password });
                    saveUsersToStorage(users);
                    emailInput.style.borderColor = 'green';
                    Swal.fire(messagesAlert.msgSusses);
                    containerS.classList.remove("right-panel-active");
                    
                }
            } else {
            Swal.fire(messagesAlert.msgError);
            }
        });
    }

    let loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let email = document.getElementById('loginEmail').value;
            let password = document.getElementById('loginPassword').value;

            let users = getUsersFromStorage();

            // Check user credentials
            let user = users.find(user => user.email === email && user.password === password);
            if (user) {
                // Store user session
                localStorage.setItem('user', JSON.stringify(user));
                Swal.fire(messagesAlert.msgSusses);

                // Redirect to home page
                setTimeout(() => {
                        window.location.href = 'home.html';
                    }, 2000);
            } else {
                Swal.fire(messagesAlert.msgErrorLog);
            }
        });
    }

    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
    let usernameSpan = document.getElementById('username');
    if (usernameSpan) {
        usernameSpan.textContent = user.name;
    }

    let logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            // Show confirmation message
            Swal.fire({
                title: 'Are you sure you want to log out?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, log out'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Clear user session
                    localStorage.removeItem('user');
                    
                    // Show success message
                    Swal.fire({
                        title: 'Logged Out',
                        text: 'You have been logged out successfully',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });

                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                }
            });
        });
    }
    }
});
