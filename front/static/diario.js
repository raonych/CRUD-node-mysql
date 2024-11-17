const logout = () =>{
    localStorage.removeItemItem("usuarioId");
    localStorage.removeItemItem("token");
    window.location.href = "index.html";
}

//funcão para puxar as entradas do diario 
const carregarEntradas = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Usuário não autenticado.");
            return;
        }

        const resposta = await fetch("http://localhost:3001/api/entradas/exibirEntradas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                diarioId: localStorage.getItem("diarioId")
            })
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.message || "Erro ao carregar os diários.");
        }

        const entradas = await resposta.json();
        const container = document.getElementById('entries-container');

        entradas.forEach(entrada => {
            const card = document.createElement('div');
            card.className = 'col-md-6';
            card.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${entrada.nome}</h5>
                        <p class="card-text">${entrada.conteudo}</p>
                        <p class="card-text text-muted"><small>${entrada.date}</small></p>
                    </div>
                </div>
                `;
                container.appendChild(card);
        });

        
        
    } catch (error) {
        console.error("Erro ao carregar entradas:", error.message);
    }
};


//Carrega e exibe os diarios ao renderizar o conteudo da página
document.addEventListener("DOMContentLoaded", carregarEntradas);



// Funcionalidade de adicionar novo diário
document.getElementById("createDiaryForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const diaryTitle = document.getElementById("diaryTitle").value;
    const diarySummary = document.getElementById("diarySummary").value;
    const diaryDate = document.getElementById("diaryDate").value;
    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:3001/api/entradas/createDiario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                nome: diaryTitle,
                resumo: diarySummary,
                date: diaryDate
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.erro || "Erro ao criar diário.");
        }

        const data = await response.json();

        // Adiciona o novo diário na lista sem recarregar a página
        const diaryList = document.getElementById("container-diarios");
        const newDiaryCard = document.createElement("div");
        newDiaryCard.classList.add("card", "mb-3");

        newDiaryCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${data.diario.nome}</h5>
                <p class="card-text">Resumo: ${data.diario.resumo}. Data: ${data.diario.data ? new Date(data.diario.data).toLocaleDateString() : "Data não disponível"}</p>
                <form> 
                <button id="${data.diario.id}" onClick="viewContent(event)" class="btn btn-info btn-sm">Adicionar Conteudo</button>
            </div>
        `;
        diaryList.appendChild(newDiaryCard);

        // Fecha o modal e reseta o formulário
        const modal = bootstrap.Modal.getInstance(document.getElementById("addDiaryModal"));
        modal.hide();
        document.getElementById("createDiaryForm").reset();
    } catch (error) {
        console.error("Erro ao criar diário:", error.message);
        alert(error.message || "Erro ao criar diário.");
    }

});









//redireciona o usuario para a pagina do diario e envia o id do diario especificado atraves do armazenamento local do navegador
function viewContent(event){
    const diarioId = event.target.id;
    localStorage.setItem("diarioId", diarioId);
    window.location.href = "./diario.html";
}







