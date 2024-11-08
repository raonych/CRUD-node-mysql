async function carregarUsuario() {
    
    const resposta = await fetch("http://localhost:3001/exibir"); 
    const Usuarios = await resposta.json(); 


    const container = document.getElementById("site-container");
    container.innerHTML = ""; 

    Usuarios.forEach((usuario) => {
      const userDiv = document.createElement("div");
      userDiv.innerHTML = `<p>Nome: ${usuario.user_nome}, email: ${usuario.user_email}</p>`;
      container.appendChild(userDiv);
    });
 
}

// Carrega os dados do usuario ao abrir a página
window.onload = carregarUsuario;