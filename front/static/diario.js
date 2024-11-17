const logout = () =>{
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("token");
    window.location.href = "index.html";
}


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

        console.log(diarioId);

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
                        <h5 class="card-title">${entrada.titulo}</h5>
                        <p class="card-text">${entrada.conteudo}</p>
                        <p class="card-text text-muted"><small>${entrada.date? new Date(entrada.date).toLocaleDateString(): "Data não disponível"}</small></p>
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







