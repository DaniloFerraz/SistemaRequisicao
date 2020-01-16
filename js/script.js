function defineonumero(){
            var url = `http://localhost:3000/MAIOR`;

            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, false);
            xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
            var jsonparastring = JSON.stringify(xhttp.responseText);
			var tam = jsonparastring.length-2;
            var stringfinal = jsonparastring.substring(2,tam);
            var conteudoDaString = `"${stringfinal}"`
            var jsonUm= JSON.parse(conteudoDaString);
            var jsonfinal = JSON.parse(jsonUm);
            var decisao = jsonfinal.NUMERO;
            var veredito = "String";
            if(decisao == null)
                veredito = 1
            else 
                veredito = jsonfinal.NUMERO + 1
            var let = `Chamado Numero: <p><input type="number" name="numero" id="numero"  value="${veredito}" readonly="readonly" ><p>`
            document.getElementById('numer').innerHTML= let;
}
