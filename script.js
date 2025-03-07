const API_URL = "https://script.google.com/macros/s/AKfycbzqZ8yEGPcTbCT2eK42Kvk0Tb7W4p8pydiM3oYU4IEUYsVKdcpl5yLFXESHi88ub_DbDA/exec";  // Substitua pela URL correta

function validarLogin() {
    let usuario = document.getElementById("usuario").value.trim();
    let senha = document.getElementById("senha").value.trim();
    let empresa = document.getElementById("empresa").value.trim();

    if (!usuario || !senha || !empresa) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao acessar a API. Status: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Dados recebidos:", data); // Exibir os dados no console para depuração

            let usuarioValido = data.find(item => 
                item.usuario.trim() === usuario && 
                item.senha.trim() === senha && 
                item.empresa.trim() === empresa
            );

            if (usuarioValido) {
                window.location.href = usuarioValido.site;
            } else {
                alert("Usuário, senha ou empresa incorretos.");
            }
        })
        .catch(error => {
            console.error("Erro ao acessar a API:", error);
            alert("Erro ao conectar com o servidor. Verifique a API.");
        });
}
