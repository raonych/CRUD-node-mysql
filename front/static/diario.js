localStorage.removeItem("editEntradaId");

//funcão para puxar as entradas do diario 
const carregarEntradas = async () => {
    const diarioId = localStorage.getItem("diarioId")
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Usuário não autenticado.");
            window.location.href = "./index.html";
            return;
        }

        const resposta = await fetch("http://localhost:3001/api/entradas/exibirEntradas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                diarioId: diarioId
            })
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.message || "Erro ao carregar os diários.");
        }

        const data = await resposta.json();

        document.getElementById("diary-title").innerHTML = data.diario.nome;
        if(data){
        const mainContainer = document.getElementById("diary-resume");
        const card = document.createElement('div');
        card.className = 'card h-100';
        card.innerHTML = `
                <div class="card-body">
                    <button onClick="deleteDiario()" class="btn btn-outline-danger position-absolute top-0 end-0 m-2 p-1" title="Excluir">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </button>
                <button data-bs-toggle="modal" data-bs-target="#addDiaryModal" class="btn btn-outline-info position-absolute top-0 end-0 mt-5 me-2 p-1" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0dcaf0" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                    </svg>
                    </button>
                    <p class="card-text">${data.diario.resumo ? data.diario.resumo : ""}</p>
                    <p class="card-text text-muted"><small>${data.diario.data ? formatDate(data.diario.data) :"" }</small></p>
                </div>
            `;
        mainContainer.appendChild(card);
        document.getElementById("diaryTitle").value = data.diario.nome;
        document.getElementById("diarySummary").value = data.diario.resumo ? data.diario.resumo : "";
        document.getElementById("diaryDate").value = data.diario.data ? data.diario.data.slice(0,10) :"";

        }
        const container = document.getElementById('entries-container');

        data.entradas.forEach(entrada => {
            const card = document.createElement('div');
            card.className = 'col-md-6';
            card.innerHTML = `
                <div class="card h-100 position-relative">
                    <div class="card-body">
                        <button onClick="deleteEntrada(${entrada.id})" class="btn btn-outline-danger position-absolute top-0 end-0 m-2 p-1" title="Excluir">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </button>
                
                        <button onClick="editEntrada(${entrada.id})" class="btn btn-outline-info position-absolute top-0 end-0 mt-5 me-2 p-1" title="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0dcaf0" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                        </button>

                        <h5 class="card-title">${entrada.titulo}</h5>
                        <p class="card-text">${entrada.conteudo}</p>
                        <p class="card-text text-muted">
                            <small>${entrada.date ? formatDate(entrada.date.slice(0,10)) : "Data não disponível"}</small>
                        </p>
                    </div>
                </div>
                `;
                container.appendChild(card);
        });
        
    } catch (error) {
        console.error("Erro ao carregar entradas:", error.message);
    }
};


//Carrega e exibe o conteudo do diario ao renderizar o conteudo da página
document.addEventListener("DOMContentLoaded", carregarEntradas);

//Função para deletar entrada
const deleteEntrada = async(entradaId) =>{
    const token = localStorage.getItem("token");
    try{
        const response = await fetch("http://localhost:3001/api/entradas/deleteEntrada",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    entradaId: entradaId
                })
            });

            if(!response.ok){
                const erro = await response.json();
                throw new Error(erro.message || "Erro ao deletar entrada");
            }

            data = await response.json();

            alert(data.message)
            window.location.href = "./diario.html";
        }
    catch(error){
        console.error("Erro ao deletar entrada:", error.message);
    }
}

//função que redireciona o usuario para a pagina de formulario com o id da entrada no localStorage
function editEntrada(entradaId){
    localStorage.setItem("editEntradaId", entradaId);
    window.location.href = "../view/entradaForm.html";
}

// Funcionalidade para atualizar diario
document.getElementById("createDiaryForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const diaryTitle = document.getElementById("diaryTitle").value;
    const diarySummary = document.getElementById("diarySummary").value;
    const diaryDate = document.getElementById("diaryDate").value;
    const token = localStorage.getItem("token");
    const diarioId = localStorage.getItem("diarioId")

    try {
        const response = await fetch("http://localhost:3001/api/diario/editarDiario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                diarioId: diarioId,
                nome: diaryTitle,
                resumo: diarySummary,
                date: diaryDate
            })
        });

        if(!response.ok){
            const erro = await response.json();
                throw new Error(erro.message || "Erro ao atualizar entrada");
        }
        const data = await response.json();

        if (data.message) {
            alert(data.message);
            window.location.href = "./diario.html";
        } else {
            alert("Erro ao editar diário.");
        }
 
    } catch (error) {
        console.log("Erro ao editar diário:", error.message);
        alert(error.message || "Erro ao editar diário.");
    }
});

//funcao para deletar diario
const deleteDiario = async() =>{
    const token = localStorage.getItem("token");
    const diarioId = localStorage.getItem("diarioId");
    try{
        const response = await fetch("http://localhost:3001/api/diario/deleteDiario",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    diarioId: diarioId
                })
            });

            if(!response.ok){
                const erro = await response.json();
                throw new Error(erro.message || "Erro ao deletar diario");
            }

            data = await response.json();

            alert(data.message)
            window.location.href = "./home.html";
        }
    catch(error){
        console.error("Erro ao deletar diario:", error.message);
    }
}




const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-'); 
    return `${day}/${month}/${year}`; 
};

const logout = () =>{
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("token");
    window.location.href = "./index.html";
}
