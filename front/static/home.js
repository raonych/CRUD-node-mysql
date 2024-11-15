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
        alert("Erro ao carregar diários, tente novamente mais tarde.");
    }
};



document.addEventListener("DOMContentLoaded", carregarDiarios);

                   





// Funcionalidade de adicionar novo diário
document.getElementById("createDiaryForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const diaryTitle = document.getElementById("diaryTitle").value;
    const diarySummary = document.getElementById("diarySummary").value;
    const diaryDate = document.getElementById("diaryDate").value;

    if (diaryTitle && diarySummary && diaryDate) {
        // Adiciona o novo diário à lista (aqui pode ser feito um POST para o backend)
        const diaryList = document.getElementById("diaryList");
        const newDiaryCard = document.createElement("div");
        newDiaryCard.classList.add("card", "mb-3");

        newDiaryCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${diaryTitle}</h5>
                <p class="card-text">Resumo: ${diarySummary}. Data: ${diaryDate}</p>
                <button class="btn btn-info btn-sm">Ver Detalhes</button>
            </div>
        `;

        diaryList.appendChild(newDiaryCard);
        alert("Diário criado com sucesso!");

        const modal = bootstrap.Modal.getInstance(document.getElementById('addDiaryModal'));
        modal.hide();

        document.getElementById("createDiaryForm").reset();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});











