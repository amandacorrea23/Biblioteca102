//IMAGENS.js
//1.1.1 - 2018-09-16

/*global jQuery, document, ajaxurl*/

//Colocar uma imagem em exibição, após o download como capa e,
//se já houver uma imagem como capa, levá-la para a área de exibição
function bib102ImagensCapa() {

	var pA = document.getElementById('pa');
    pA.innerHTML = 'Inserindo a imagem como capa...';

	//Determinar qual o volume deve ser recuperado
	var dataIndex = $(this).attr('data-index');
	//var dataAcao = $(this).
    //imagens
    var capaUploader = document.getElementById("set-post-thumbnail");
    var capaHidden = document.getElementById("_thumbnail_id");
    var capaImg = capaUploader.firstChild;

    //pegar informações da imagem
    var imgCapa = document.getElementById('imgb' + dataIndex);
    var imgCapaNome = imgCapa.getAttribute('title');

    //caso não haja capa
    if (capaHidden.value === '-1' || capaImg.src === undefined) {

        var imgC = document.createElement('img');
        imgC.src = imgCapa.src;
        imgC.setAttribute('title', imgCapaNome);
        capaHidden.value = imgCapa.getAttribute('data-id');
		capaUploader.setAttribute("aria-describedby", "set-post-thumbnail-desc");
        capaUploader.appendChild(imgC);

        pA.innerHTML = 'Capa inserida com sucesso.';

    } else { //caso tenha capa

        //primeiro, pegar as informações da capa antiga
        var imgAntId = capaHidden.value;
        //se o src não é o da imagem original, o endereço vem com o tamanho da imagem
        var imgAntTam = capaImg.src;
        var imgAntSrc = bib102ImagensSrc(imgAntTam);
        var imgAntNome = capaImg.getAttribute('title');
        //retirar atributos da capa anterior
        capaUploader.href = capaUploader.href.slice(0, capaUploader.href.indexOf('TB_iframe=1' + 10));
        if (capaImg.hasAttribute('srcset')) {
            capaImg.attributes.removeNamedItem("srcset");
        }
        if (capaImg.hasAttribute('sizes')) {
            capaImg.attributes.removeNamedItem("sizes");
        }
        if (capaImg.hasAttribute('height')) {
            capaImg.attributes.removeNamedItem("height");
        }
        if (capaImg.hasAttribute('width')) {
            capaImg.attributes.removeNamedItem("width");
        }

        //colocar nova imagem como capa
        capaImg.src = imgCapa.src;
        capaImg.setAttribute('title', imgCapaNome);
        capaHidden.value = imgCapa.getAttribute('data-id');
        //colocar imagem que era capa na div provisória
        imgCapa.src = imgAntSrc;
        imgCapa.setAttribute('data-id', imgAntId);
        imgCapa.setAttribute('title', imgAntNome);

        pA.innerHTML = 'Capa inserida com sucesso.';
    }
}

//Modifica a imagem da categoria de acordo com as mudanças na seleção
function bib102ImagensCategoria() {

	//quando campo com a seleção de categoria estiver renderizado
	$('#select2-acf-field_5b17da90bc4c4-container').ready(function() {

		//quando campo com a seleção de categoria tiver seu valor alterado
		$('#livro_categorias_selecao').change(function(){
			//categoria atual
			var categoria = $('#select2-acf-field_5b17da90bc4c4-container').attr("title");
			categoria = categoria.replace(/\s\-\s/g, '-').replace(/\s/g, '-');
            $('#livro_categorias_imagem .acf-image-uploader').addClass("has-value");
			$('#livro_categorias_imagem img').attr({
				'src': '../wp-content/uploads/' + categoria + '-300x300.png',
				'title': categoria
			});

		});
	});
}

//Retirar imagens da lista do Google Drive, não para deletar imagens baixadas
function bib102ImagensDescarteDrive(item) {
	
	//Determinar qual o volume deve ser recuperado
	var indice = $(this).attr('data-index');
	
	var imagem = document.getElementById('imga' + indice);
	var registro = imagem.src.replace("https://docs.google.com/uc?export=&id=0B9T12qFDZHBq", "");
    var capaDel = localStorage.getItem('capadel');

	if (!capaDel) {
        localStorage.setItem('capadel', registro + ';');

    } else {
        localStorage.setItem('capadel', capaDel + registro + ';');
    }
	
    var divisa = document.getElementById('thumbnaildiv' + indice);
    document.getElementById('maindiv').removeChild(divisa);
    var mensagem = document.getElementById('pa').innerHTML;
	var tI = bib102Recorte(mensagem, ': ', '-');
	var tA = bib102Recorte(mensagem, '-', ' de');
	tA = Number(tA) - 1;
	var tG = mensagem.slice(mensagem.lastIndexOf(' de ') + 4, mensagem.indexOf('.'));
	tG = Number(tG) - 1;
	document.getElementById('pa').innerHTML = 'Total de resultados: ' + tI + '-' + tA + ' de ' + tG + '.<br/>Imagem descartada com sucesso.';

}

//Download de imagens direto da tela de busca
function bib102ImagensDownload() {

	//Determinar qual o volume deve ser recuperado
	var dataIndex = $(this).attr('data-index');
	
	//Id do post atual no wordpress
	var postId = document.getElementById('post_ID').value;
	
    //pegar informações da imagem
    var imagem = document.getElementById('imgb' + dataIndex);
    var endereco = imagem.src;
    var nome = imagem.getAttributeNode('data-title').value;
    var nomeAlt = document.getElementById('imga' + dataIndex).getAttributeNode('data-title').value;
    var tipo;

    if (endereco.indexOf("http://books.google.com") >= 0) {

		tipo = '.jpg';

	} else if (endereco.indexOf("https://docs.google.com/uc?export=&id=0B9T12qFDZHBq") >= 0) {
		
		var onde = nomeAlt.lastIndexOf('.');
        tipo = nomeAlt.substr(onde);
        var registro = endereco.replace("https://docs.google.com/uc?export=&id=0B9T12qFDZHBq", "");

    } else {

        tipo = endereco.substr(endereco.lastIndexOf('.'));

        if (tipo.length > 5) {
            tipo = '';
        }
    }

    //Download da imagem
    var pA = document.getElementById('pa');
	pA.innerHTML = 'Fazendo o download da imagem...';

    //enviar qual imagem deve ser importada e receber os valores relacionados
    jQuery.ajax({
        url: ajaxurl,
        contentType: 'text/plain',
        data: {
            'action': 'bib102_imagem_capa',
            'endereco': endereco,
            'nome': nome + tipo,
            'tipo': tipo,
            'id': postId,
            'titulo': nome
        }

    }).fail(function () {
    
		pA.innerHTML = 'Ocorreu um erro durante o download.';
		
    }).done(function (resposta) {

        if (resposta === null || resposta === 'null' || resposta === undefined || resposta === 'undefined' || resposta.length <= 0 || resposta === ('!!!')) {

            pA.innerHTML = 'Ocorreu um erro durante o download.';

        } else {

            pA.innerHTML = 'Download realizado com sucesso. Atualizando os registros...';
 
            var info = resposta.split('!!!');
            imagem.src = info[1];
            document.getElementById('ab' + dataIndex).href = resposta[1];
            bib102Atributos('imgb' + dataIndex, ['data-id', 'title'], [info[0], nome]);
            document.getElementById('divc' + dataIndex).removeChild(document.getElementById('divd' + dataIndex));
			document.getElementById('divc' + dataIndex).removeChild(document.getElementById('ina' + dataIndex));

			var bE = bib102CriarBotaoIcone("photo_album", "Capa", ["id", "data-index"], ["be" + dataIndex, dataIndex]);
			bE.onclick = bib102ImagensCapa;
			
			document.getElementById('divc' + dataIndex).appendChild(bE);

            pA.innerHTML = 'Download realizado com sucesso e atualização concluída.';

            return resposta;
        }

    });
}

//Inserir imagem num campo de imagens sem passar pela biblioteca de mídia
function bib102ImagensInserir() {
	
	//Determinar qual o volume deve ser recuperado
	var dataIndex = $(this).attr('data-index');
	var imgid = 'imgb' + dataIndex;
	var imgsrc = document.getElementById(imgid).src;
    var divisa = document.getElementById('livro_imagem');
    var lista = divisa.getElementsByClassName('show-if-value');
    
    for (i = 0; i < lista.length; i++) {
        var imgEl = lista[i].firstChild;
        if (imgEl.src === '') {
            lista[i].previousSibling.classList.add("has-value");
            lista[i].previousSibling.value = imgid;
            imgEl.src = imgsrc;
            imgEl.setAttribute('title', document.getElementById(imgid).getAttribute('title'));
        }
    }
    
    pA.innerHTML = 'Imagem inserida como anexo.';
}

function bib102ImagensPrateleira() {

	$('#select2-acf-field_5b18498c8345d-container').ready(function() {
		$('#livros_loc_prateleira').change(function(){
			var prateleira = $('#select2-acf-field_5b18498c8345d-container').attr("title");
			prateleira = prateleira.replace('Prateleira ', '');
            $('#livros_loc_pratmini .acf-image-uploader').addClass("has-value");
			$('#livros_loc_pratmini img').attr({
                'src': '../wp-content/uploads/' + prateleira + '-300x300.png',
                'title': prateleira
            });
		});
	});
}

//Remover imagem da exibição
function bib102ImagensRemover() {

	//Determinar qual o volume deve ser recuperado
	var dataIndex = $(this).attr('data-index');
	var divC = document.getElementById('divc' + dataIndex);
	document.getElementById('divb').removeChild(divC);
}

//Etapa de verificação do nome da imagem antes do download
function bib102ImagensRenomear() {

	//Determinar qual o volume deve ser recuperado
	var dataIndex = $(this).attr('data-index');

    //pegar informações da imagem
    var imagem = document.getElementById('imgb' + dataIndex);
	var dataTitle = imagem.attributes['data-title'].value;
	var tipo = document.getElementById('sa' + dataIndex).innerHTML;

	//pegar entrada de texto
	var novoNome = document.getElementById('ina' + dataIndex).value;

    if (novoNome.length > 0) {

        imagem.getAttributeNode('data-title').value = bib102Str(novoNome).replace(/\+/g, '-');
    }
	
	document.getElementById('ina' + dataIndex).value = bib102Str(novoNome).replace(/\+/g, '-');

}

//Coloca a imagem na coluna ao lado para visualização e download
function bib102ImagensSeparar() {

	//Determinar qual o volume deve ser recuperado
	var dataIndex = $(this).attr('data-index');

	//"Buscando a imagem..."
	var pA = document.getElementById("pa");	
	pA.innerHTML = 'Buscando a imagem...';

	var divA = document.getElementById("livro_visualizar_imagem");
	var divB = document.getElementById("divb");
	var imgA = document.getElementById('imga' + dataIndex);
	//Criar elementos html para visualização das imagens
	//criar div
	var divC = bib102CriarSimples("div", "divc" + dataIndex, 'bib102-imagem-exibicao');

	//criar link para imagem
	var aB = bib102CriarSimples('a', 'ab' + dataIndex, "bib102-linhas");
	aB.href = document.getElementById('aa' + dataIndex).href;
	aB.target = "_blank";
	
	//extrair título da imagem
	var dataTitle = imgA.getAttributeNode('data-title').value;
	var comPonto = dataTitle.lastIndexOf('.');
	var comPonto2 = imgA.src.lastIndexOf('.');
	var dataTitle2 = dataTitle.slice(0, comPonto);
	var dataTitleF;
	var tipo;

	if (comPonto > 0) {

		dataTitleF = dataTitle2;
		tipo = dataTitle.slice(comPonto);

	}
	else if (comPonto <= 0) {

		dataTitleF = dataTitle;
		tipo = imgA.src.slice(comPonto2);

	}
	
	if (tipo.length > 5) {
		
		dataTitleF = dataTitle;
		tipo = '.jpg';

	} else if (tipo == '.html') {
		
		dataTitleF = dataTitle;
		tipo = imgA.src.slice(comPonto2);

	}

	//criar elemento para imagem
	var imgB = bib102CriarSimples('img', 'imgb' + dataIndex, 'bib102-imagem-exibicao');
	imgB.src = imgA.src;
	imgB.setAttribute('data-title', dataTitle);

	//criar div para botoes
	var divD = bib102CriarSimples('div', 'divd' + dataIndex);
	
	//criar botão para download
	var bC = bib102CriarBotaoIcone('get_app', 'Download', ['id', 'data-index'],  ['bc' + dataIndex, dataIndex], 'bib102-botoes-icone');
	bC.onclick = bib102ImagensDownload;
	
	//criar botão para remover imagem
	var bD = bib102CriarBotaoIcone('cancel', 'Remover Imagem', ['id', 'data-index'],  ['bd' + dataIndex, dataIndex], 'bib102-botoes-icone');
	bD.onclick = bib102ImagensRemover;
	
	//criar botão para renomear imagem
	var bE = bib102CriarBotaoIcone('create', 'Renomear Imagem', ['id', 'data-index'],  ['be' + dataIndex, dataIndex], 'bib102-botoes-icone');
	bE.onclick = bib102ImagensRenomear;

	//criar campo para nome da imagem
	var inA = bib102CriarSimples('input', 'ina' + dataIndex);
	inA.value = dataTitleF;
	inA.type = 'text';
	var sA = bib102CriarSimples('span', 'sa' + dataIndex);
	sA.innerHTML = tipo;

	aB.appendChild(imgB);
	inA.appendChild(sA);
	divD.appendChild(bC);
	divD.appendChild(bD);
	divD.appendChild(bE);
	divC.appendChild(aB);
	divC.appendChild(divD);
	divC.appendChild(inA);
	
	if (divB != null && divB != undefined) {
		divB.appendChild(divC);
	} else {
		divB = bib102CriarSimples("div", "divb", 'bib102-marcatexto');
		divB.appendChild(divC);
		divA.appendChild(divB);
		divA.classList.add('bib102-marcatexto');		
	}

	pA.innerHTML = "A visualização da imagem está disponível.";
}

//Src anterior de imagem anexada como capa
function bib102ImagensSrc(endereco) {
    
	var end_orig;
    var barra = endereco.indexOf('uploads/');

    //caso tenha o tamanho no endereço
    if (/\d{1,4}/.test(endereco.slice(barra)) === true) {
        var hifen = endereco.lastIndexOf('-');
        var ponto = endereco.lastIndexOf('.');
        end_orig = endereco.slice(0, hifen) + endereco.slice(ponto);
    }
    //caso não tenha o tamanho no endereço
    else {
        end_orig = endereco;
    }

    return end_orig;
}

//Cria a visualização da capa antes da etapa de download
function bib102ImagensVisualizar(id) {

    var bAnt = document.getElementById(id);
    var dataAcao = bAnt.getAttribute('data-acao');
    var dataIndex = bAnt.getAttribute('data-index');

    if (dataAcao !== 'imagem') {
        return;
    }

    //"Buscando a imagem..."
    pA.innerHTML = 'Buscando a imagem...';

    var iAnt = document.getElementById('imga' + dataIndex);
    var divA = document.getElementById('livro_visualizar_imagem');
    var divB = document.getElementById('divb');

    //Se o livro tem uma capa
    if (divB !== null && divB !== undefined) {
        if (divB.children.length >= 4) {
            divB.removeChild(divB.firstChild);
        }
    } else {
        divB = bib102CriarSimples("div", "divb", 'bib102-marcatexto');
        divA.appendChild(divB);
    }

    var dif;

    if (divB.hasChildNodes() === true) {
        var ultimo = divB.lastChild.getElementsByTagName('button')[0];
        var indice = ultimo.getAttribute('data-index');

        if (Number(indice) === 3) {
            dif = 0;
        } else {
            dif = Number(indice) + 1;
        }

    } else if (divB.hasChildNodes() === false) {
        dif = 0;
    }

    //div para a imagem
    var divC = bib102CriarSimples("div", "divc" + dif, 'bib102-imagem-exibicao');

    //criar link para imagem
    var aB = bib102CriarSimples('a', 'ab' + dif, "bib102-linhas");
    aB.href = iAnt.src;
    aB.target = "_blank";

    //criar elemento para imagem
    var imgB = bib102CriarSimples('img', 'imgb' + dif, 'bib102-imagem-exibicao');
    imgB.src = iAnt.src;
    var titulo = iAnt.getAttribute('title');
    imgB.setAttribute('title', titulo);
    //unir elementos
    aB.appendChild(imgB);
    divC.appendChild(aB);
    divB.appendChild(divC);

    divA.classList.add('bib102-marcatexto');
    
    pA.innerHTML = "A visualização da imagem está disponível.";

    return dif;
}