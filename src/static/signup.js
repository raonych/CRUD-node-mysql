document.querySelector("#signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados dos campos do formulário
    const nome = document.getElementById("Name").value;
    const dataNasc = document.getElementById("date").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const confirmSenha = document.getElementById("confirmPassword").value;

    // Verifica se as senhas coincidem
    if (senha !== confirmSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    // Envia os dados para a API de cadastro
    fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, dataNasc, email, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Se o cadastro for bem-sucedido, redireciona o usuário para o dashboard
            localStorage.setItem("token", data.token);
            window.location.href = "../view/diario.html";
        } else {
            alert(data.erro || "Erro desconhecido");
        }
    })
    .catch(error => {
        console.error("Erro ao cadastrar usuário:", error);
        alert("Erro ao cadastrar usuário");
    });
});
