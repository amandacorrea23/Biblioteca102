//GLOBAL.js
//1.1.1 - 2018-09-18

/* Funções auxiliares
*/

//Pega lista de índices de duas arrays e zera o valor do respectivo índice na array maior (c)
function bib102AosQueFicamII(c, d, x) {
    
    var e = d.split(x);
    e.pop();

    var i;

    for (i = 0; i < e.length; i++) {
        var f = c[0].indexOf(e[i]);
        c[0].splice(f, 1);
        c[1].splice(f, 1);
    }
    
    return c;
}

//Define atributos em massa para um elemento
function bib102Atributos(id, atrNome, atrValor) {

    var el = document.getElementById(id);
    var i;

    for (i = 0; i < atrNome.length; i++) {
        el.setAttribute(atrNome[i], atrValor[i]);
    }

    return el;
}

//Bloqueia ou desbloqueia campo para edição
function bib102Cadeado(campo, situacao) {

	if (situacao === 'bloqueio') {
		campo.value = 'Campo indisponível para esta base de pesquisa.'
		campo.setAttribute('readonly', 'readonly');
		campo.className = 'bib102-readonly';
	} else if (situacao === 'desbloqueio') {
		campo.removeAttribute("readonly");
        campo.classList.remove("bib102-readonly");
		if (campo.value = 'Campo indisponível para esta base de pesquisa.') {
			campo.value = '';
		}
	}
	return campo;
}

//Padrão de criação de botões
function bib102CriarBotao(texto, atrNome = "", atrValor = "", classe = '', ligacao = "#") {

    var b = document.createElement('a');
    b.className = 'button-primary' + ' ' + classe;
    b.innerHTML = texto;
    b.value = texto;
	b.href = ligacao;
	
    var i;
    for (i = 0; i < atrNome.length; i++) {
        b.setAttribute(atrNome[i], atrValor[i]);
    }

    return b;
}

//Padrão de criação de botões com ícones
function bib102CriarBotaoIcone(icone, texto, atrNome = "", atrValor = "", classe = '', ligacao = "#") {

    var b = document.createElement('a');
    b.className = 'button-primary' + ' ' + classe;
    b.value = texto;
	b.href = ligacao;
	
    var i;
    for (i = 0; i < atrNome.length; i++) {
        b.setAttribute(atrNome[i], atrValor[i]);
    }

	var i = document.createElement('i');
	i.className = 'material-icons';
	i.innerHTML = icone;
	
	b.appendChild(i);

    return b;
}

//Padrão de criação de campos em geral
function bib102CriarSimples(tipo, id, classe = '') {

    var el = document.createElement(tipo);
    el.setAttribute("id", id);
    el.className = classe;
    return el;
}

//correspondência entre inicial e id da tag
function bib102IniciaisCheck(item, index) {

	var numeral = item.id.replace('inicial-', '');

	return numeral;
}

//Conferir se retornou mais de um resultado, em caso positivo, seleciona apenas o primeiro ou junta todos
function bib102IsArray(resp, zero = 'z', lig = '; ') {

    if (Array.isArray(resp) === true){
        if (zero === 'z') {
            resp = resp[0];
        }
        else if (zero === '+') {
            resp = resp.join(lig);
        }
        else {
            resp = resp;
        }
    }
    else {
        resp = resp;
    }

    return resp;
}

//criar div onde irá a visualização da busca
function bib102MainDiv() {

	var mainDiv = document.getElementById('maindiv');

	if (mainDiv == null || mainDiv == undefined) {

		mainDiv = bib102CriarSimples('div', 'maindiv');

	} else {
		//Se houver busca anterior, limpar visualização
		while (mainDiv.hasChildNodes()) {
			mainDiv.removeChild(mainDiv.firstChild);
		}
	}
	
	return mainDiv;
}

//Transforma dígitos numéricos em palavras
function bib102Numero(str) {
    var unidade = 'zero, um, dois, três, quatro, cinco, seis, sete, oito, nove';
    unidade = unidade.split(', ');
    var dezena = ', dez onze doze treze quatorze quinze dezesseis dezessete dezoito dezenove, vinte e , trinta e , quarenta e , cinquenta e , sessenta e , setenta e , oitenta e , noventa e ';
    dezena = dezena.split(', ');
    var centena = ', cento e , duzentos e , trezentos e , quatrocentos e , quinhentos e , seiscentos e , setecentos e , oitocentos e , novecentos e ';
    centena = centena.split(', ');
    var decimos = dezena[1].split(' ');
    var res;

    //Se palavra tiver dígitos, pegar primeira sequência
    if (/\d/g.test(str) === true) {
        var a = str.match(/\d{1,9}/);
        var b = a[0];
        //Se for apena um dígito
        if (b.length === 1) {
            b = '00' + b;
        }
        //2 dígitos
        else if (b.length === 2) {
            b = '0' + b;
        }
        //3 dígitos
        else if (b.length === 3){
            b = b;
        }
        //Se 4 ou mais dígitos
        else {
            alert('Título começa com um numeral com ' + b.length + ' dígitos de extensão. Preencha campos manualmente');
        return;
        }

        //se for número '100'
        if (b === '100') {
            res = 'cem';
        }
        //se for centena redonda que não seja 100
        else if (b !== '100' && b[0] !== '0' && b[1] === '0' && b[2] === '0') {
            res = centena[b[0]].replace(' e ', '');
        }
        //se terminar com uma dezena entre 10 e 19
        else if (b[1] === '1') {
            res = centena[b[0]] + decimos[b[2]];
        }
        //se terminar com dezena redondo que não seja 10
        else if (b[1] !== '0' && b[1] !== '1' && b[2] === '0') {
            res = centena[b[0]] + dezena[b[1]].replace(' e ', '');
        }
        //qualquer outro número
        else {
            res = centena[b[0]] + dezena[b[1]] + unidade[b[2]];
        }

		str = res;
    }

	return str;

}

//Paginação para a busca de livros
function bib102Paginacao(item, index) {
    var intervalo = index - 1 + item;
    return intervalo;
}

//Recortar strings com base em texto inicial e final
function bib102Recorte(frase, inicio, fim) {

	var recorte;
	
	if (inicio === '' && fim === '') {
		
		recorte = '';
	
	} else {
		
		var fI = frase.indexOf(inicio);
		recorte = frase.substring(fI + inicio.length);
		var fF = recorte.indexOf(fim);
		recorte = recorte.substring(0, fF);		
	
	}
	
	return recorte;
}

//Toogle para ícone de cadeado nos campos travados para edição
function bib102Revezar(camposBloquear, cadeado) {

	for (var i = 0; i < camposBloquear.length; i++) {
		if (camposBloquear[i].className != 'bib102-readonly') {

			camposBloquear[i].className = 'bib102-readonly';
			camposBloquear[i].setAttribute("readonly", "readonly");
			cadeado.html('lock');

		} else {

			camposBloquear[i].classList.remove('bib102-readonly');
			camposBloquear[i].removeAttribute("readonly");
			cadeado.html('lock_open');

		}
	}
}

//Tirar acentos e outros caracteres especiais. Substituir espaços em branco por -
function bib102Str(str) {

	str = str.toLowerCase()
    .trim()
    .replace(/"/g, 	'A')
	.replace(/\b-/g, 'M')
    .replace(/â/gi, 'a')
    .replace(/á/gi, 'a')
    .replace(/à/gi, 'a')
    .replace(/ã/gi, 'a')
    .replace(/ä/gi, 'a')
    .replace(/é/gi, 'e')
    .replace(/è/gi, 'e')
    .replace(/ê/gi, 'e')
    .replace(/ë/gi, 'e')
    .replace(/í/gi, 'i')
    .replace(/ì/gi, 'i')
    .replace(/î/gi, 'i')
    .replace(/ï/gi, 'i')
    .replace(/ô/gi, 'o')
    .replace(/õ/gi, 'o')
    .replace(/ó/gi, 'o')
    .replace(/ò/gi, 'o')
    .replace(/ö/gi, 'o')
    .replace(/ú/gi, 'u')
    .replace(/ù/gi, 'u')
    .replace(/û/gi, 'u')
    .replace(/ü/gi, 'u')
    .replace(/ñ/gi, 'n')
    .replace(/ç/gi, 'c')
    .replace(/\s/g, 'QQ')
    .replace(/\W/g, '')
    .replace(/_/g, '-')
	.replace(/QQ/g, '+');

	return str;
}

//Retira prompt "Digite o título aqui" do título do post
function bib102TituloPrompt() {
	document.getElementById('title-prompt-text').innerHTML = '';
}

//Transforma null ou undefined em ''
function bib102Vazio(str, substituto = '') {

    if (substituto === null || substituto === undefined) {
        substituto = '';
    }

    if (str === null || str === undefined || str === '') {
        str = substituto;
    }
    else {
        str = str;
    }

    return str;
}