    document.addEventListener('DOMContentLoaded', () => {

    // SCROLL TO TOP BUTTON
    const scrollBtn = document.getElementById("scrollToTop");

    if (scrollBtn) {
        window.addEventListener("scroll", () => {
            scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
        });

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Burger Bar 
        const burger = document.getElementById('burger');
        const navMenu = document.getElementById('navMenu');

        burger?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        });

    //    COOKIE NOTIFICATION
    const cookieBanner = document.getElementById('cookieNotification');
    const acceptBtn = document.getElementById('acceptCookies');

    if (cookieBanner && acceptBtn) {
        if (sessionStorage.getItem('cookiesAccepted') === 'true') {
            cookieBanner.style.display = 'none';
        } else {
            cookieBanner.style.display = 'flex';
        }

        acceptBtn.addEventListener('click', () => {
            sessionStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
        });
    }
    

    //    REGISTRATION FORM
    const form = document.getElementById('form');
    if (!form) return;

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');

    /* ===== Load saved user ===== */
    const savedUser = localStorage.getItem('registeredUser');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        username.value = user.username || '';
        email.value = user.email || '';
    }

    /* ===== Password toggle ===== */
    function createPasswordToggle(input) {
        const toggle = document.createElement('i');
        toggle.className = 'fas fa-eye password-toggle';

        toggle.addEventListener('click', () => {
            input.type = input.type === 'password' ? 'text' : 'password';
            toggle.className = input.type === 'password'
                ? 'fas fa-eye password-toggle'
                : 'fas fa-eye-slash password-toggle';
        });

        input.parentElement.appendChild(toggle);
    }

    createPasswordToggle(password);
    createPasswordToggle(password2);

    // Validation
    form.addEventListener('submit', e => {
        e.preventDefault();
        if (validateForm()) {

            localStorage.setItem('registeredUser', JSON.stringify({
                username: username.value.trim(),
                email: email.value.trim()
            }));

            alert('Registration completed successfully!');
            form.reset();
        }
    });

    function validateForm() {
        return (
            checkUsername() &
            checkEmail() &
            checkPassword() &
            checkPassword2()
        );
    }

    function checkUsername() {
        const val = username.value.trim();
        if (!/^[a-zA-Z0-9_]{3,20}$/.test(val)) {
            setError(username, 'Username must be 3–20 characters long');
            return false;
        }
        setSuccess(username);
        return true;
    }

    function checkEmail() {
        const val = email.value.trim();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) {
            setError(email, 'Please enter a valid email address');
            return false;
        }
        setSuccess(email);
        return true;
    }

    function checkPassword() {
        const val = password.value.trim();
        if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(val)) {
            setError(password, 'Min 8 characters, one uppercase letter and one number');
            return false;
        }
        setSuccess(password);
        return true;
    }

    function checkPassword2() {
        if (password.value !== password2.value) {
            setError(password2, 'Passwords do not match');
            return false;
        }
        setSuccess(password2);
        return true;
    }

    function setError(input, msg) {
        const control = input.parentElement;
        control.className = 'form-control error';
        control.querySelector('small').innerText = msg;
    }

    function setSuccess(input) {
        input.parentElement.className = 'form-control success';
    }

    //    RANDOM USER AUTOFILL
        document.getElementById('fillBtn')?.addEventListener('click', async () => {
        try {
            const res = await fetch('https://randomuser.me/api/');
            const { results: [user] } = await res.json();

            username.value = user.login.username;
            email.value = user.email;

            const pwd = (user.login.password + 'A1').padEnd(8, 'X');
            password.value = password2.value = pwd;

        } catch (err) {
            console.error('Random user error', err);
        }
    });

});