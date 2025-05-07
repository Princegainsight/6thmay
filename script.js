document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    // Define an array to store users' credentials
    const users = [
        { userId: 'prince1234', password: '1234', name: 'Prince Raj', email: 'prince1234@gmail.com', firstName: 'Prince', lastName: 'Raj' },
        { userId: 'ayush1234', password: '1234', name: 'Ayush Kumar', email: 'ayush1234@gmail.com', firstName: 'Ayush', lastName: 'Kumar' },
        { userId: 'srini2134', password: '1234', name: 'Srini', email: 'srini2134@gmail.com', firstName: 'Srini', lastName: '' }
    ];

    function identifyUser(user) {
        // Make sure aptrinsic is loaded and then identify the user
        if (typeof aptrinsic === 'function') {
            aptrinsic("identify",
            {
                "id": user.userId,
                "email": user.email,
                "firstName": user.firstName,
                "lastName": user.lastName
            },
            {
                "id": user.userId,
                "name": user.name
            });
        } else {
            console.error('Aptrinsic SDK not loaded correctly.');
        }
    }

    // Ensure login form exists before setting up event listener
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // Prevent form submission if values are not entered
            if (!username || !password) {
                alert('Please enter both username and password');
                return;
            }

            // Validate the provided username and password
            const user = users.find(user => user.userId === username && user.password === password);
            if (user) {
                identifyUser(user);  // Identify the user for Gainsight PX

                // Save user's name in local storage
                window.localStorage.setItem('currentUserName', user.name);
                alert(`Welcome, ${user.name}!`);
                window.location.href = 'index.html'; // Redirect to index.html
            } else {
                alert('Invalid username or password');
            }
        });
    } else {
        console.error('Login form not loaded.');
    }
});
