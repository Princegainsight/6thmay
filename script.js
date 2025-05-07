document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const menu = document.getElementById('menu');
    const loginButton = document.getElementById('login-btn');
    const signOutButton = document.getElementById('signout-btn');
    const userDisplay = document.getElementById('user-display');
    const loginForm = document.getElementById('login-form');

    // Define an array to store users' credentials
    const users = [
        { userId: 'prince1234', password: '1234', name: 'Prince Raj', email: 'prince1234@gmail.com', firstName: 'Prince', lastName: 'Raj' },
        { userId: 'ayush1234', password: '1234', name: 'Ayush Kumar', email: 'ayush1234@gmail.com', firstName: 'Ayush', lastName: 'Kumar' },
        { userId: 'srini2134', password: '1234', name: 'Srini', email: 'srini2134@gmail.com', firstName: 'Srini', lastName: '' }
    ];

    function identifyUser(user) {
        // Use Gainsight PX to identify the user
        aptrinsic("identify",
        {
            // User Fields
            "id": user.userId,
            "email": user.email,
            "firstName": user.firstName,
            "lastName": user.lastName
        },
        {
            // Account Fields
            "id": user.userId,
            "name": user.name
        });
    }

    // Toggle the mobile nav menu
    if (menuIcon) {
        menuIcon.addEventListener('click', function () {
            menu.classList.toggle('show');
        });
    }

    // Navigate to login page
    if (loginButton) {
        loginButton.addEventListener('click', function () {
            window.location.href = 'login.html';
        });
    }

    // Simulate login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Validate the provided username and password
            const user = users.find(user => user.userId === username && user.password === password);
            if (user) {
                // Identify the user for Gainsight PX
                identifyUser(user);

                // Save user's name in local storage
                window.localStorage.setItem('currentUserName', user.name);
                alert(`Welcome, ${user.name}!`);
                window.location.href = 'index.html'; // Redirect to index.html
            } else {
                alert('Invalid username or password');
            }
        });
    }

    // Update the UI to show user's name if logged in
    const storedUserName = window.localStorage.getItem('currentUserName');
    if (storedUserName && userDisplay && signOutButton) {
        loginButton.classList.add('hidden');
        userDisplay.textContent = storedUserName;
        userDisplay.classList.remove('hidden');
        signOutButton.classList.remove('hidden');
        signOutButton.addEventListener('click', function () {
            window.localStorage.removeItem('currentUserName');
            alert('You have been signed out');
            userDisplay.classList.add('hidden');
            signOutButton.classList.add('hidden');
            loginButton.classList.remove('hidden');
        });
    }
});
