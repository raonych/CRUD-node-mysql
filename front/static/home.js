const logout = () =>{
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("token");
    window.location.href = "./index.html";
    
}

//funcão para puxar os dados dos diários existentes
const carregarDiarios = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Usuário não autenticado.");
            window.location.href = "./index.html";
            return;
        }

        const resposta = await fetch("http://localhost:3001/api/diario/exibirDiarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.message || "Erro ao carregar os diários.");
        }

        const diarios = await resposta.json();

        const container = document.getElementById("container-diarios");

        diarios.forEach((diario) => {
            const diarioDiv = document.createElement("div");
            diarioDiv.classList.add("card", "mb-3");

            diarioDiv.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${diario.nome || "Sem título"}</h5>
                    <p class="card-text">Resumo: ${diario.resumo || "Sem resumo"}<br>Data: ${diario.data ?formatDate(diario.data) : "Data não disponível"}</p>
                    <button id="${diario.id}" onClick="viewContent(event)" class="btn btn-info btn-sm">Abrir diário</button>
                </div>
            `;

            container.appendChild(diarioDiv);
        });
    } catch (error) {
        console.error("Erro ao carregar diários:", error.message);
    }
};


//Carrega e exibe os diarios ao renderizar o conteudo da página
document.addEventListener("DOMContentLoaded", carregarDiarios);



// Funcionalidade de adicionar novo diário
document.getElementById("createDiaryForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const diaryTitle = document.getElementById("diaryTitle").value;
    const diarySummary = document.getElementById("diarySummary").value;
    const diaryDate = document.getElementById("diaryDate").value;
    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:3001/api/diario/createDiario", {
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
                <p class="card-text">Resumo: ${data.diario.resumo}. Data: ${data.diario.data ? formatDate(data.diario.data): "Data não disponível"}</p>
                <button id="${data.diario.id}" onClick="viewContent(event)" class="btn btn-info btn-sm">Abrir diário</button>
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


const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-'); 
    return `${day}/${month}/${year}`; 
};
