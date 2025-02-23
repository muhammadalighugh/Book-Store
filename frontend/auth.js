document.getElementById("registerUser").addEventListener("click", registerUser);
document.getElementById("loginUser").addEventListener("click", loginUser);
document.getElementById("logoutBtn").addEventListener("click", logout);

function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("authMessage").textContent = data.message;
    });
}

function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token);
            document.getElementById("authMessage").textContent = "Login successful!";
            document.getElementById("logoutBtn").style.display = "block";
        }
    });
}

function logout() {
    localStorage.removeItem("token");
    document.getElementById("authMessage").textContent = "Logged out.";
    document.getElementById("logoutBtn").style.display = "none";
}
