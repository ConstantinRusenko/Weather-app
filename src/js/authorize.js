const show = () => {
    const node = document.getElementById('is-authorize');
    node.style.visibility = "visible";
}

const authorize = () => {

    localStorage.setItem("login", "admin");
    localStorage.setItem("password", "admin");

    password = localStorage.getItem("password");
    login = localStorage.getItem("login");

    const passInputEl = document.querySelector(".pass-input");
    const loginInputEl = document.querySelector(".login-input");
    const isPasswordCorrect = passInputEl.value === password;
    const isLoginCorrect = loginInputEl.value === login;
    const isAuthorized = isPasswordCorrect && isLoginCorrect;
    
    if (isAuthorized) return show();

    alert("Wrong credentials");
}

const logout = () => {
    const node = document.getElementById('is-authorize');
    node.style.visibility = "hidden";
    const main = document.getElementById("main");
    const time = document.getElementById("hourly-temp");
    time.innerHTML = "";
    main.innerHTML = "";
}