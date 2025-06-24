const select = document.getElementById('cripto-select');

// Passo 1: pega o botão
document.getElementById('buscar').addEventListener('click', () => {
    // Passo 2: escuta o clique
    const moeda = select.value; // Passo 3: pega o valor do select
    const url = `https://api.coingecko.com/api/v3/coins/${moeda}`; // Passo 4: monta a URL com o valor do select
    console.log(moeda);

    fetch(url) // Passo 5: faz a requisição
        .then(resposta => resposta.json()) // Passo 6: converte a resposta para JSON
        .then(dados => {// Aqui você acessa os dados recebidos da moeda!
            console.log(dados.market_data);
            if (dados.market_data) { // Verifica se os dados de mercado estão disponíveis
                const varDia = dados.market_data.price_change_percentage_24h_in_currency.brl.toFixed(2);
                const varMes = dados.market_data.price_change_percentage_30d_in_currency.brl.toFixed(2);
                const varAno = dados.market_data.price_change_percentage_1y_in_currency.brl.toFixed(2);
                const precoFormatado = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(dados.market_data.current_price.brl); //Aqui formata a moeda para o formato brasileiro

                document.getElementById("preco").innerText = `Preço atual:${precoFormatado}`; // Passo 8: exibe o preço formatado
                document.getElementById("var-dia").innerText = `Variação 24h:${varDia}%`; // Passo 10: exibe a variação diária
                document.getElementById("var-mes").innerText = `Variação do mês:${varMes}%`; // Passo 9: exibe a variação mensal
                document.getElementById("var-ano").innerText = `Variação no Ano:${varAno}%`; // Passo 11: exibe a variação anual
                function aplicarCor(variacao, elementoId) {
                    const elemento = document.getElementById(elementoId);
                    elemento.innerText += variacao > 0 ? " 📈" : " 📉";
                    elemento.style.color = variacao > 0 ? "limegreen" : "red";
                }
                aplicarCor(varDia, "var-dia"); // Passo 12: aplica cor à variação diária
                aplicarCor(varMes, "var-mes"); // Passo 13: aplica cor à variação mensal
                aplicarCor(varAno, "var-ano"); // Passo 14: aplica cor à variação anual

            }

        })
        .catch(erro => { // Passo 7: trata erros
            // Aqui você pode tratar erros, como se a moeda não existir ou a API estiver fora
            console.error("Erro ao buscar os dados:", erro);
        });

});
