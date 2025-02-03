const API_URL = "https://script.google.com/macros/s/AKfycbyEgxI7N8dRjWnEWYD1OSUQ7fn-OLfyaZK91LzoLeynOtT3CIINKEYjmhbCdjYsP2mGcg/exec"
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
