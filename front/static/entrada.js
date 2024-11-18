//se o id da entrada estiver definido no localStorage exibe os dados da entrada ao carregar os elementos da página
if (localStorage.getItem("editEntradaId")){
    //função para exibir os dados da entrada nos inputs
    const carregarEntrada = async () => {
    const entradaId = localStorage.getItem("editEntradaId");
    localStorage.removeItem("editEntradaId");
    const token = localStorage.getItem("token"); 
    if (!token) {
        alert("Você precisa estar logado para editar uma entrada.");
    }

    const response = await fetch("http://localhost:3001/api/entradas/exibirEntrada",{
        method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                entradaId: entradaId
            })
    });

    if(!response.ok){const errorData = await response.json();
        throw new Error(errorData.erro || "Erro ao carregar entrada");
    }

    const data = await response.json();
    const entrada = data.entrada
    document.getElementById("titulo").value = entrada.titulo
    document.getElementById("conteudo").value = entrada.conteudo
    document.getElementById("time").value = entrada.time
    document.getElementById("date").value = entrada.date.slice(0, 10)
}


document.addEventListener("DOMContentLoaded", carregarEntrada());

}
//se não prepara o formulário para criação de novas entradas
else{
document.querySelector("#entradaForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados dos campos do formulário
    const diarioId = localStorage.getItem("diarioId");
    const token = localStorage.getItem("token"); 
    const titulo = document.getElementById("titulo").value;
    const conteudo = document.getElementById("conteudo").value;
    const time = document.getElementById("time").value; // Hora no formato HH:MM:SS
    const date = document.getElementById("date").value; // Data no formato YYYY-MM-DD

    // Valida se o usuário está logado ( utilizando o token no localStorage)
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
            // Se a entrada for criada com sucesso, exibe uma mensagem e redireciona o usuario para a pagina do diario
            alert("Entrada adicionada com sucesso!");
            window.location.href = "./diario.html";
        } else {
            alert(data.erro || "Erro desconhecido");
        }
    })
    .catch(error => {
        console.error("Erro ao adicionar entrada:", error);
        alert("Erro ao adicionar entrada");
    });
});
}

 