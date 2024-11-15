document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha}), 
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuarioId", data.usuarioId);
            window.location.href = "./diario.html"; // Redireciona para o tela inicial
        } else {
            alert(data.erro || "Erro desconhecido");
        }
    })
    .catch(error => {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login");
    });
});

