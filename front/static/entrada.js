document.querySelector("#entradaForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados dos campos do formulário
    const diarioId = localStorage.getItem("diarioId");
    const token = localStorage.getItem("token"); 
    const titulo = document.getElementById("titulo").value;
    const conteudo = document.getElementById("conteudo").value;
    const time = document.getElementById("time").value; // Hora no formato HH:MM:SS
    const date = document.getElementById("date").value; // Data no formato YYYY-MM-DD

    // Valida se o usuário está logado (no localStorage)
    if (!token) {
        alert("Você precisa estar logado para adicionar uma entrada.");
        return;
    }

    // Envia os dados para a API de entradas
    fetch("http://localhost:3001/api/entradas/createEntrada", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ diarioId, titulo, conteudo, time, date })
    })
    .then(response => response.json())
    .then(data => {
        if (data.entrada) {
            // Se a entrada for criada com sucesso, exibe uma mensagem e limpa o formulário
            alert("Entrada adicionada com sucesso!");
            window.location.href = "./diario.html";
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
