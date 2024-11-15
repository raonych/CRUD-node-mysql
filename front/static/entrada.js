console.log(localStorage.getItem("usuarioId"))

document.querySelector("#entradaForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados dos campos do formulário
    const usuarioId = localStorage.getItem("usuarioId"); // Assumindo que o ID do usuário está armazenado no localStorage
    const titulo = document.getElementById("titulo").value;
    const conteudo = document.getElementById("conteudo").value;
    const time = document.getElementById("time").value; // Hora no formato HH:MM:SS
    const date = document.getElementById("date").value; // Data no formato YYYY-MM-DD

    // Valida se o usuário está logado (com token ou usuárioId no localStorage)
    if (!usuarioId) {
        alert("Você precisa estar logado para adicionar uma entrada.");
        return;
    }

    // Envia os dados para a API de entradas
    fetch("http://localhost:3001/api/entradas/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("usuarioId")}` // Envia o token JWT se estiver presente no localStorage
        },
        body: JSON.stringify({ usuarioId, titulo, conteudo, time, date })
    })
    .then(response => response.json())
    .then(data => {
        if (data.entrada) {
            // Se a entrada for criada com sucesso, exibe uma mensagem e limpa o formulário
            alert("Entrada adicionada com sucesso!");
            document.querySelector("#entradaForm").reset(); // Limpa o formulário
        } else {
            alert(data.erro || "Erro desconhecido");
        }
    })
    .catch(error => {
        console.error("Erro ao adicionar entrada:", error);
        alert("Erro ao adicionar entrada");
    });
});
