function fazerRequisicao(){
         let num = document.getElementById('numero').value;
            var url = `http://localhost:3000/chamados/${num}`;
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, false);

            xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

           var jsonparastring = xhttp.responseText;
            var jsonfinal = JSON.parse(jsonparastring);
            
            var decisao = jsonfinal[0].STATUS;
            var veredito = "String";
            if(decisao == 1)
                veredito = "Realizado"
            else    
                veredito = "Pendente"
            var criador = '<div><button onclick="mudarStatus()">Mudar Status do chamado </button> Status: <select class="dropdown" name="status" id="drop"> <option value="2">Pendente</option>       <option value="1">Realizado</option></select></div><p><button onclick="excluir()">Excluir chamado</button></p>'
            document.getElementById('botoes').innerHTML = criador;
            document.getElementById('numerchamado').innerHTML = `<p> Chamado número: ${jsonfinal[0].NUMERO}<p>`           
            document.getElementById('info').innerHTML = `<p> Nome: ${jsonfinal[0].NOME}<p>`
            document.getElementById('info').innerHTML += `<p >RA: ${jsonfinal[0].RA}<p>`
            document.getElementById('info').innerHTML += `<p >Predio: ${jsonfinal[0].PREDIO}<p>`
            document.getElementById('info').innerHTML += `<p >Sala: ${jsonfinal[0].SALA}<p>`
            document.getElementById('info').innerHTML += `<p >Maquina: ${jsonfinal[0].MAQUINA}<p>`
            document.getElementById('info').innerHTML += `<p >Status: ${veredito}<p>`
            document.getElementById('info').innerHTML += `<p >Descrição: ${jsonfinal[0].DESCRICAO}<p>`
}
function mostrarConcluidos(){
            
            let num = 1;
            var url = `http://localhost:3000/chamados/abertos/${num}`;

             var xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, false);

            xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

           var jsonparastring = xhttp.responseText;
            var jsonfinal = JSON.parse(jsonparastring);
                           
            var veredito = "String";
           for(var i =0; i<jsonfinal.length;i++) 
            {
                var decisao = jsonfinal[i].STATUS;
                if(decisao == 1)
                    veredito = "Realizado"
                else    
                    veredito = "Pendente"
           
            document.getElementById('info').innerHTML +=`<p class="titulochamados">Chamado Numero ${jsonfinal[i].NUMERO}</p>`
            document.getElementById('info').innerHTML += `<p class="infos"> Nome: ${jsonfinal[i].NOME}<p>`
            document.getElementById('info').innerHTML += `<p class="infos">RA: ${jsonfinal[i].RA}<p>`
            document.getElementById('info').innerHTML += `<p class="infos">Predio: ${jsonfinal[i].PREDIO}<p>`
            document.getElementById('info').innerHTML += `<p class="infos">Sala: ${jsonfinal[i].SALA}<p>`
            document.getElementById('info').innerHTML += `<p class="infos">Maquina: ${jsonfinal[i].MAQUINA}<p>`
            document.getElementById('info').innerHTML += `<p class="infos">Status: ${veredito}<p>`
            document.getElementById('info').innerHTML += `<p class="infos">Descrição: ${jsonfinal[i].DESCRICAO}<p>`
            document.getElementById('botoes').innerHTML = "<button onclick='limpar()'>Limpar</button>"
            }
}
function mostrarpedentes(){
           let num = 2;
            var url = `http://localhost:3000/chamados/abertos/${num}`;

             var xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, false);

            xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

           var jsonparastring = xhttp.responseText;
            var jsonfinal = JSON.parse(jsonparastring);
                           
            var veredito = "String";
           for(var i =0; i<jsonfinal.length;i++) 
            {
                var decisao = jsonfinal[i].STATUS;
                if(decisao == 1)
                    veredito = "Realizado"
                else    
                    veredito = "Pendente"
           
             document.getElementById('info').innerHTML +=`<p class="titulochamados">Chamado Numero ${jsonfinal[i].NUMERO}</p>`
            document.getElementById('info').innerHTML += `<p class="infos"> Nome: ${jsonfinal[i].NOME}<p>`
            document.getElementById('info').innerHTML += `<p class="infos">RA: ${jsonfinal[i].RA}<p>`
            document.getElementById('info').innerHTML += `<p class="infos">Predio: ${jsonfinal[i].PREDIO}<p>`
            document.getElementById('info').innerHTML += `<p class="infos">Sala: ${jsonfinal[i].SALA}<p>`
            document.getElementById('info').innerHTML += `<p class="infos">Maquina: ${jsonfinal[i].MAQUINA}<p>`
            document.getElementById('info').innerHTML += `<p class="infos">Status: ${veredito}<p>`
            document.getElementById('info').innerHTML += `<p class="infos">Descrição: ${jsonfinal[i].DESCRICAO}<p>`
            document.getElementById('botoes').innerHTML = "<button onclick='limpar()'>Limpar</button>"
            }
}
function limpar(){
     document.getElementById('info').innerHTML = "";
     document.getElementById('botoes').innerHTML = "";
}

function excluir(){         
    let numero = document.getElementById('numero').value;
    var url = "http://localhost:3000/chamados/";
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url+ numero, true);
        xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
      if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users);
          } 
      else {
            console.error(users);
          }
        }
        xhr.send(null);
        document.getElementById('info').innerHTML = "Excluido com sucesso"
      }

function mudarStatus(){
    let numero = document.getElementById('numero').value;
    var url = "http://localhost:3000/chamados/";
    var conteudo = document.getElementById('drop').value
    var data = {};
    data.STATUS = conteudo;
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    alert(xhr);
    xhr.open("PUT", url+numero, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users);
        } else {
		console.error(users);
	}
}
xhr.send(json);
}