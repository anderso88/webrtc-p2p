const API_URL = "SUA_URL_DO_GOOGLE_SHEETS_AQUI"; // Cole a URL gerada pelo Apps Script

async function fazerLogin() {
    let usuario = document.getElementById("usuario").value.trim();
    let senha = document.getElementById("senha").value.trim();
    let empresa = document.getElementById("empresa").value.trim();

    let mensagem = document.getElementById("mensagem");
    mensagem.innerText = "Verificando...";

    try {
        let response = await fetch(API_URL);
        let data = await response.json();

        let usuarioEncontrado = data.find(user =>
            user.usuario === usuario &&
            user.senha === senha &&
            user.empresa === empresa
        );

        if (usuarioEncontrado) {
            window.location.href = usuarioEncontrado.site; // Redireciona para o site correspondente
        } else {
            mensagem.innerText = "Usuário, senha ou empresa incorretos!";
            mensagem.style.color = "red";
        }
    } catch (error) {
        mensagem.innerText = "Erro ao conectar com o servidor!";
        mensagem.style.color = "red";
        console.error("Erro:", error);
    }
}
