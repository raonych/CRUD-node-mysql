// Função para simular o logout
function logout() {
    localStorage.setItem("usuarioId",null);
    localStorage.setItem("token",null);
    window.location.href = "index.html";
}


const carregarDiarios = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Usuário não autenticado.");
            return;
        }

        const resposta = await fetch("http://localhost:3001/api/entradas/exibirDiarios", {
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
                    <p class="card-text">Resumo: ${diario.resumo || "Sem resumo"}<br>Data: ${diario.data ? new Date(diario.data).toLocaleDateString() : "Data não disponível"}</p>
                    <button class="btn btn-info btn-sm">Ver Detalhes</button>
                </div>
            `;

            container.appendChild(diarioDiv);
        });
    } catch (error) {
        console.error("Erro ao carregar diários:", error.message);
    }
};



document.addEventListener("DOMContentLoaded", carregarDiarios);

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
                <button class="btn btn-info btn-sm">Ver Detalhes</button>
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












