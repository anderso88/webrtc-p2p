const API_URL = "https://script.google.com/macros/s/AKfycbyEgxI7N8dRjWnEWYD1OSUQ7fn-OLfyaZK91LzoLeynOtT3CIINKEYjmhbCdjYsP2mGcg/exec";  // Substitua pela URL correta

function validarLogin() {
    let usuario = document.getElementById("usuario").value.trim();
    let senha = document.getElementById("senha").value.trim();
    let empresa = document.getElementById("empresa").value.trim();

    if (!usuario || !senha || !empresa) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log("Dados recebidos:", data); // Exibir no console para depuração

            let usuarioValido = data.find(item => 
                item.usuario.trim() === usuario && 
                String(item.senha).trim() === senha && // Convertendo senha para string
                item.empresa.trim().toLowerCase() === empresa.toLowerCase() // Ignorar diferença entre maiúsculas e minúsculas
            );

            if (usuarioValido) {
                window.location.href = "https://" + usuarioValido.site; // Adicionando HTTPS para evitar erro
            } else {
                alert("Usuário, senha ou empresa incorretos.");
            }
        })
        .catch(error => {
            console.error("Erro ao acessar a API:", error);
            alert("Erro ao conectar com o servidor. Verifique a API.");
        });
}
