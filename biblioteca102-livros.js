//LIVROS.js
//1.1.1 - 2018-09-19

document.addEventListener("DOMContentLoaded", function () {

	//se não for Livro (post), retorna
	if (document.getElementById('post_type').value !== 'post') {
		return;
	}

	/* 1. Prepara formulário para a busca
	*/
	
	//Retira prompt "Digite o título aqui" do título do post
	bib102TituloPrompt();
	
	//Cria botão para adicionar autor, abrindo janela de edição em nova aba
	var addAutor = bib102CriarBotaoIcone('person_add', 'adicionar autor', ["id"], ["addAutor"], 'bib102-botoes-icone', "post-new.php?post_type=autor");
	addAutor.target = "_blank";
	$('#acf-group_5b20bf69759cb').after(addAutor);	
	
	//Cria botão do tipo 'submit' para salvamento do post e atualização dos campos
	var postbox = $("div.postbox");

	for (var i = 0; i < postbox.length; i++) {
		
		var salvar = bib102CriarSimples('input', 'salvar' + i, 'material-icons');
		salvar.setAttribute("type", "submit");
		salvar.value = 'save';
		var salvarDiv = bib102CriarSimples('div', 'divsalvar' + i, '');
		//salvarDiv.style.textAlign = "right";
		salvarDiv.appendChild(salvar);
		salvarDiv.style.width = "5%";
		salvarDiv.style.display = "inline";

		if (postbox[i].classList.contains("acf-hidden") == true || postbox[i].classList.contains("hide-if-js") == true) {
			continue;
		} else {
			postbox[i].after(salvarDiv);			
		}

	}

	//base da busca selecionada
	var baseBusca = document.getElementById('acf-field_5b175df0310e6').value;

	//todos os campos de preenchimento
	var buscaBase = bib102Vazio(document.getElementById('acf-field_5b175df0310e6'));
	var buscaGeral = bib102Vazio(document.getElementById('acf-field_5b175c24a41cf'));
	var buscaGatilho = bib102Vazio(document.getElementById('acf-field_5b175cc54ff21'));
	var buscaCampos = bib102Vazio(document.getElementById('acf-field_5b175fc8310e7'));
	var buscaLimpar = bib102Vazio(document.getElementById('acf-field_5b8d9fa72b2e7'));
	var buscaIndex = bib102Vazio(document.getElementById('acf-field_5b17608ac67f7'));
	var buscaIsbn = bib102Vazio(document.getElementById('acf-field_5b17619923f9e'));
	var buscaTitulo = bib102Vazio(document.getElementById('acf-field_5b1762bc1be79'));
	var buscaAutor = bib102Vazio(document.getElementById('acf-field_5b17cb11bc2e9'));
	var buscaEditora = bib102Vazio(document.getElementById('acf-field_5b17cb26bc2ea'));
	var buscaAvancada = bib102Vazio(document.getElementById('acf-field_5b17cb29bc2eb'));
	var buscaLingua = bib102Vazio(document.getElementById('acf-field_5b17cca5bc2ec'));	

	//zerar index
	document.getElementById('livro_busca_selecionar').onchange = function() {
		document.getElementById('acf-field_5b17608ac67f7').value = 0;
	}

	//todos os campos de preenchimento em uma array
	var termosCampo = [buscaBase, buscaGeral, buscaGatilho, buscaCampos, buscaLimpar, buscaIndex, buscaIsbn, buscaTitulo, buscaAutor, buscaEditora, buscaAvancada, buscaLingua];
	
	//todos as ids das divs dos campos de preenchimento em uma array
	var termosId = ['livro_busca_isbn', 'livro_busca_titulo', 'livro_busca_autor', 'livro_busca_editora', 'livro_busca_avancada', 'livro_busca_lingua'];

	//apaga valor de campo não selecionado em "Adicionar campos de busca"
	document.getElementById('livro_busca_campos').onchange = function() {

		//começa em buscaIsbn, pois campos anteriores não são opções em "Adicionar campos de busca"
		for (var o = 6; o < termosId.length; o++) {

			//verifica se o campo está escondido e exclui valores em caso positivo
			if (document.getElementById(termosId[o]).classList.contains('acf-hidden') === true) {

				//se campo "Restringir Língua", é necessário alterar valor para o padrão 'sr' e alterar o rótulo de exibição na tela
				if (termosCampo[o] === 11) {
					termosCampo[o].value = 'sr';
					document.getElementById('select2-acf-field_5b17cca5bc2ec-container').innerHTML = 'Sem restrição';
				} else {
					termosCampo[o].value = '';
				}
			}
		}
	}
	
	//apaga os valores de todos os campos do formulário de pesquisa se o gatilho "Limpar formulário" for ativado
	document.getElementById('livro_busca_limpar').onchange = function() {

		for (var j = 0; j < termosCampo.length; j++) {

			//campos que não precisam ser apagados
			if (j < 6) {
				continue;
			//se campo "Restringir Língua", é necessário alterar valor para o padrão 'sr' e alterar o rótulo de exibição na tela
			} else if (j === 11) {
				termosCampo[j].value = 'sr';
				document.getElementById('select2-acf-field_5b17cca5bc2ec-container').innerHTML = 'Sem restrição';
			} else {
				termosCampo[j].value = '';
			}
		}

		//campo "Index" precisa ter um valor
		document.getElementById('acf-field_5b17608ac67f7').value = 0;

	}

	//Determina a base de busca e bloqueia ou libera campos conformemente
	function bib102BloqueioBusca(baseBusca) {

		var buscaAvancada = bib102Vazio(document.getElementById('acf-field_5b17cb29bc2eb'));
		
		if (baseBusca === 'am' || baseBusca === 'lc') {
			bib102Cadeado(buscaAvancada, 'bloqueio');
		} else {
			bib102Cadeado(buscaAvancada, 'desbloqueio');
		}
	}

	//faz o bloqueio ou desbloqueio ao carregar a página
	bib102BloqueioBusca(baseBusca);

	//faz o bloqueio ou desbloqueio ao alterar a base de busca
	document.getElementById('acf-field_5b175df0310e6').onchange = function() {

		bib102BloqueioBusca(document.getElementById('acf-field_5b175df0310e6').value);
	
	}

	/* 2. Busca do livro
	*/

	//HTML já existente
	var divBusca = document.getElementById('livro_visualizar_busca');
	var pA = document.getElementById('pa');

	//dispara a pesquisa ao mover o botão 'iniciar busca'
	document.getElementById('livro_busca_gatilho').onchange = function() {

		bib102BuscaInicial();

	}

	//Coleta as informações fornecidas e prepara os dados para a busca
	function bib102BuscaInicial() {

        //'Carregando...'
		if (pA === null || pA === undefined) {
			pA = bib102CriarSimples('p', 'pa', 'bib102-mensagem');
			pA.innerHTML = 'Carregando...';
			divBusca.appendChild(pA);
		} else {
			pA.innerHTML = 'Carregando...';			
		}

		//verifica valor novamente em caso de troca da base após carregamento da página
		baseBusca = document.getElementById('acf-field_5b175df0310e6').value;
		
		//todas as bases, exceto Google Drive
		if (baseBusca !== 'gd') {

			//array com todos os valores do formulário
			var tIndex = [buscaGeral.value, buscaAvancada.value, buscaTitulo.value, buscaAutor.value, buscaEditora.value, buscaIsbn.value, buscaLingua.value];

			//retirar aviso do campo busca avançada em caso de bloqueio
			if (buscaAvancada.value === 'Campo indisponível para esta base de pesquisa.') {
				tIndex[1] = '';
			}

			//valor do campo restringir língua
			if (baseBusca === 'am') {
				if (buscaLingua.value === 'pt') {
					tIndex[6] = '9754444011';
				} else if (buscaLingua.value === 'es') {
					tIndex[6] = '8529759011';
				} else if (buscaLingua.value === 'en') {
					tIndex[6] = '8529758011';
				} else if (buscaLingua.value === 'fr') {
					tIndex[6] = '8529788011';
				}
			} else if (baseBusca === 'lc') {
				if (buscaLingua.value === 'pt') {
					tIndex[6] = '6481';
				} else if (buscaLingua.value === 'es') {
					tIndex[6] = '6635';
				} else if (buscaLingua.value === 'en') {
					tIndex[6] = '6626';
				} else if (buscaLingua.value === 'fr') {
					tIndex[6] = '3923';
				}			
			} else {
				tIndex[6] = bib102Vazio(buscaLingua.value);
			}
			
			//Apaga valor do campo língua se este é "Sem restrição"
			if (buscaLingua.value === 'sr') {
				tIndex[6] = '';
			}

			//se vazio, retornar
			if (tIndex[0] === '' && tIndex[1] === '' && tIndex[2] === '' && tIndex[3] === '' && tIndex[4] === '' && tIndex[5] === '' && tIndex[6] === '') {
				alert('Preencha ao menos um dos campos para efetuar a busca');
				return;
			}

			//array com os elementos para busca específica em cada base
			var sIndex;
			
			if (baseBusca === 'am') {
				sIndex = ['k=', '', '+', '&rh=p_lbr_books_authors_browse-bin:', '+', '+', '&rh=p_n_feature_nine_browse-bin:'];
			} else if (baseBusca === 'lc') {
				sIndex = ['&Ntt=', '', '', '&Ntk=product.collaborator.name&Ntt=', '&Ntk=product.vendorName&Ntt=', '&Ntt=', '+429496'];
			} else if (baseBusca === 'gb') {
				sIndex = ['', '+', '+intitle:', '+inauthor:', '+inpublisher:', '+isbn:', '&langRestrict='];
			} else if (baseBusca === 'gi') {
				sIndex = ['', '', '', '', '', '', '&lr=lang_'];
			}

			//array com termos formatados para visualização
			var iIndex = ['', ' ', ' TÍTULO: ', ' AUTOR: ', ' EDITORA: ', ' ISBN: ', ' LÍNGUA: '];
			
			//se vazio, retirar elemento, exceto a busca geral

			for (var k = 0; k < iIndex.length; k++) {

				tIndex[k] = bib102Str(tIndex[k]);
				tIndex[k] = bib102Vazio(tIndex[k]);

				if (k != 0) {
					if (tIndex[k] === '' || tIndex[k] === undefined || tIndex[k] === null ) {
						sIndex[k] = '';
						iIndex[k] = '';
					}
				}
			}

			//se busca avançada do google imagens, trocar aspas e menos por query term
			if (baseBusca === 'gi') {
				tIndex[1].replace('/\BA/g', '&exactTerms=').replace('/A\B/g', '').replace('/M/g', '&excludeTerms=');
			}

			//endereço da busca
			var urlBusca;

			//montagem da url de busca e outras especificações
			switch (baseBusca) {
				case 'am':
					urlBusca = 'https://www.amazon.com.br/s?' + sIndex[0] + tIndex[0] + sIndex[2] + tIndex[2] + sIndex[4] + tIndex[4] + sIndex[5] + tIndex[5] +'&i=stripbooks' + sIndex[3] + tIndex[3] + sIndex[6] + tIndex[6] + '&s=relevancerank';
					break;
				case 'lc':
					urlBusca = 'https://www.livrariacultura.com.br/busca?N=102831' + sIndex[6] + tIndex[6] + sIndex[0] + tIndex[0] + sIndex[2] + tIndex[2] + sIndex[3] + tIndex[3] + sIndex[4] + tIndex[4] + sIndex[5] + tIndex[5];
					break;
				case 'gb':
					urlBusca = 'https://www.googleapis.com/books/v1/volumes?q=' + tIndex[0] + sIndex[1] + tIndex[1] + sIndex[2] + tIndex[2] + sIndex[3] + tIndex[3] + sIndex[4] + tIndex[4] + sIndex[5] + tIndex[5] + sIndex[6] + tIndex[6] + '&fields=totalItems,items/id,items/selfLink,items/volumeInfo/title,items/volumeInfo/authors,items/volumeInfo/imageLinks/thumbnail&maxResults=9&printType=books&key=AIzaSyCSJ8OrHc3ZtvBS36nYyC9XxxXoDIivPS0';
					break;
				case 'gi':
					var start = Number(document.getElementById('acf-field_5b17608ac67f7').value) + 1;
					urlBusca = 'https://www.googleapis.com/customsearch/v1?q=' + tIndex[0] + tIndex[1]  + tIndex[2] + tIndex[3] + tIndex[4] + tIndex[5] + sIndex[6] + tIndex[6] + '&num=9&start=' + start + '&searchType=image&key=AIzaSyDL5ni9aLtSDg6kaCgrHRdSCwbPmRDZTnw&cx=002372519144314173256:n5dctompzz8&fields=searchInformation/formattedTotalResults,items(link,mime,image)&alt=json';
					break;
					
			}

			urlBusca = urlBusca.replace(/\@@/g, '+');

			var mainDiv = bib102MainDiv();

			//Faz a solicitação da busca inicial pelo ajax
			$.ajax({
				url: ajaxurl,
				contentType: 'text/plain',
				data: {
					'action': 'bib102_busca_geral',
					'dados': urlBusca,
				},
				error: function (resposta) {
					pA.innerHTML = 'Ocorreu um erro. Erro: ' + resposta;
				},
				success: function (resposta) {
					if (resposta === null || resposta === 'null') {
						pA.innerHTML = 'A busca retornou nula. Tente novamente.';
						return;
					} else if (resposta === undefined || resposta === '' || resposta.includes("Nenhum produto encontrado") == true) {
						pA.innerHTML = 'Os itens solicitados não estão disponíveis.';
						return;
					} else {
						pA.innerHTML = 'Resposta recebida com sucesso. Aguarde enquanto a visualização é carregada.';			

						//para recorte de html
						var inicio;
						var fim;

						//total de resultados da busca
						var total;

						//verificar resposta e configurar resultados para exibição
						if (resposta.startsWith('<?php') == true) {
							resposta = resposta.slice(5);
						//Amazon
						} else if (resposta.includes('Resultados da pesquisa') == true) {
							baseBusca = 'am';
							total = resposta.slice(resposta.indexOf('s-result-count') + 16, resposta.indexOf(' resultado'));
							if (total.startsWith("1-16 de ") === true) {
								total = total.slice(total.indexOf("1-16 de ") + 8);
							}
							//se a pesquisa foi na Amazon, retorna em html e não pode passar pelo JSON.parse
							inicio = resposta.indexOf("Resultados da pesquisa");
							fim = resposta.indexOf("pagnPrevString");
							//retira tudo que vem antes e depois dos resultados, reduzindo bastante o documento
							resposta = resposta.slice(inicio, fim);
							//cada livro da pesquisa tem um "data-asin" e esse dado só aparece uma vez por livro
							resposta = resposta.split("data-asin");
							//o primeiro pedaço não refere a nenhum livro, então começamos do segundo
							resposta = resposta.slice(1);
							//temos uma array de 16 partes, cada uma um livro
						//Google Imagens
						} else if (resposta.includes("searchInformation") == true) {
							baseBusca = 'gi'
							resposta = JSON.parse(resposta);
							total = resposta.searchInformation.formattedTotalResults;
							resposta = resposta.items;
						//Livraria Cultura
						} else if (resposta.startsWith("<script>") == true) {
							baseBusca = 'lc';
							if (resposta.includes("não correspondeu a nenhum de nossos produtos") == true) {
								pA.innerHTML = 'A busca não retornou nenhum resultado.';
								return;
							} else if (resposta.includes("pagination") == true) {
								total = resposta.slice(resposta.indexOf('<h1>Encontramos <b>') + 19, resposta.indexOf('</b> resultados'));
								//retira tudo que vem antes e depois dos resultados, reduzindo bastante o documento
								inicio = resposta.indexOf("pagination");
								fim = resposta.lastIndexOf("pagination");
								resposta = resposta.slice(inicio, fim);
								//cada livro da pesquisa tem um "product-new-box" e esse dado aparece uma vez por livro
								resposta = resposta.split("product-new-box");
								//o primeiro pedaço não refere a nenhum livro, então começamos do segundo
								resposta = resposta.slice(1);
								//temos uma array de 16 partes, cada uma um livro
							}
						//Google Books
						} else {
							baseBusca = 'gb';
							resposta = JSON.parse(resposta);
							total = resposta.totalItems;
							resposta  = resposta.items;
						}

						if (resposta === undefined) {
							pA.innerHTML = 'A busca não retornou nenhum resultado.'
						} else {
						//Gera a visualização da busca inicial
							resposta.forEach(bib102bP);
						}
						
						//informações necessárias para a visualização da busca
						var autor;
						var endereco;
						var titulo;
						var imagem;

						//Pontos de corte para endereço da imagem
						var iI;
						var iF;
						
						//formata resposta para visualização da busca
						function bib102bP(item, index) {

							//máximo de 15 resultados na visualização
							if (index < 15) {
								//recortes das respostas
								switch (baseBusca) {
									case "am":
										titulo = bib102Recorte(item, 'title="', '" href');
										endereco = bib102Recorte(item, 'href="', '">');
										autor = bib102Recorte(item, 'por </span><span class="a-size-small a-color-secondary">', '</span>');
										imagem = bib102Recorte(item, 'https://images-na.ssl-images-amazon.com/images/I/', '.');
										imagem = 'https://images-na.ssl-images-amazon.com/images/I/' + imagem + '.jpg';
										break;
									case "gi":
										titulo = item.image.contextLink;
										endereco = item.link;
										autor = '';
										imagem = item.link;
										break;
									case "lc":
										titulo = bib102Recorte(item, 'class="lowercase">', '</a>');

										if (titulo.isArray === true) {
											titulo = bib102IsArray(titulo);
										}

										endereco = bib102Recorte(item, '<a href="', '" data-ntt');
										autor = bib102Recorte(item, 'author-title-new capitalize"><a href="', '/a>');
										autor = bib102Recorte(autor, '>', '<');

										if (autor.isArray === true) {
											autor = bib102IsArray(autor);
										}

										imagem = bib102Recorte(item, 'https://statics.livrariacultura.net.br', '"');
										imagem = 'https://statics.livrariacultura.net.br' + imagem;
										
										if (imagem == "https://statics.livrariacultura.net.br") {
											imagem = "https://assets.livrariacultura.net.br/assets/images/no_img.jpg";
										}

										break;
									case "gb":
										//Livros
										titulo = item.volumeInfo.title;
										endereco = 'https://books.google.com.br/books?id=' + item.id;
										autor = item.volumeInfo.authors;
										autor = bib102IsArray(autor, '+');
										
										if (item.volumeInfo.imageLinks != undefined) {
											imagem = item.volumeInfo.imageLinks.thumbnail;
											imagem = imagem.replace(/zoom=[0-9]/, 'zoom=10');
											imagem = imagem.replace('edge=curl', '');
										} else {
											//caso não tenha capa disponível, usa imagem genérica
											imagem = '../wp-content/plugins/biblioteca102/img/capa-de-livro-sem-imagem.png';
										}
										break;
								}

								//insere cada livro na div
								mainDiv.appendChild(bib102Visualizar(index, titulo, endereco, autor, imagem));
							}

						}
					}

					//insere div com o resultado na div já existente
					var divResultados = document.getElementById('livro_visualizar_busca');
					divResultados.appendChild(mainDiv);

					//montagem dos termos da busca para visualização
					if (buscaAvancada.value === 'Campo indisponível para esta base de pesquisa.') {
						buscaAvancada.value = '';
					}
						
					if (buscaLingua.value === 'sr') {
						buscaLingua.value = '';
					}
						
					var infoBusca = buscaGeral.value + iIndex[1] + buscaAvancada.value + iIndex[2] + buscaTitulo.value + iIndex[3] + buscaAutor.value + iIndex[4] + buscaEditora.value + iIndex[5] + buscaIsbn.value + iIndex[6] + buscaLingua.value + '.';

					//altera o registro no campo "Index", para possibilitar acessar mais respostas no Google Imagens
					if (baseBusca === 'gi') {

						//botão 'Mostrar mais imagens' caso a base de busca for Google Imagens
						var giMais = bib102CriarBotao('Mostrar mais imagens', ['id'], ['gimais'], 'bib102-botoes-maiores');
						var giMenos = bib102CriarBotao('Início', 'id', 'gimenos', 'bib102-botoes-maiores'); 
						//adiciona botão "Mostrar mais imagens"
						mainDiv.appendChild(giMais);
						mainDiv.appendChild(giMenos);

						//ao clicar no botão, altera o "Index" e mostra os próximos 9 resultados
						if (giMais != undefined) {
							
							giMais.onclick = function () {
								document.getElementById("acf-field_5b17608ac67f7").value = Number(document.getElementById('acf-field_5b17608ac67f7').value) + 8;
								bib102BuscaInicial();
							}
						}
						
						//ao clicar no botão, altera o "Index" e mostra os primeiros 9 resultados
						if (giMenos != undefined) {
				
							giMenos.onclick = function () {
								document.getElementById("acf-field_5b17608ac67f7").value = 0;
								bib102BuscaInicial();
							}
						}
						
						//mostra qual o index da visualização atual, o total de resultados e os termos da busca
						var start = Number(document.getElementById('acf-field_5b17608ac67f7').value) + 1;
						pA.innerHTML = 'Total de resultados: ' + start + '-' + (start + 8)  + ' de ' + total + '.\n  Termos da busca: ' + infoBusca;
					} else {
						//mostra o total de resultados e os termos da busca
						pA.innerHTML = 'Total de resultados: ' + total + '.    Termos da busca: ' + infoBusca;
					}
				}	

			});

	/*3. Caso a base de busca seja o Google Drive, não ocorre a busca, apenas a visualização das capas
	*/	
		} else if (baseBusca === 'gd') {

			//Array com src
			var conjGDriveURL = ["SUVnYlZaLWhxZWs", "WmxjcUZWYzVsWWc", "OG9vaU9ydnpxMzA", "Q3FjUWxoekptTVU", "WmR3MkVRTmlFdFE", "TU5lallxNnU5ckk", "cE9LaTJVQWtRdW8", "LUdvM1pnSDJNMGc", "NmhxTk41ZTVwdzg", "U2s5UkZqQm95SU0", "RFlvRDVjcXMxQU0", "T1N5X1hoRVlNZWs", "VDFUVjZrLV9MYVE", "bG1MY3lxUE1kcUE", "Sjh3RkltNlp1dTg", "Q2pjZE5sWVZlaXM", "MHBEY1ZhLU5ILUE", "Unh1SFZVLTBkY1k", "MzRwTEFJN3JseW8", "QjhGU0laVEZnSG8", "bHFLZDgwdm5ORG8", "b21vX3R5blJScWc", "eldQczg1UTh3enc", "cTZOVEtwbHhaVkk", "Q0N2amxyUTNwMjg", "TGtRSjNTZ0ZHM3c", "NUdob1oyejk1bkU", "aVhnOGw4ZTZoVm8", "WUlWaFdYTFFXelk", "aTBTNExWQW56b3M", "SVlTdm1JVlI3dXM", "dHo5TVMzTUNRUmM", "M2N6ZDkyMUxuYkU", "U3E5MnJudHdpSW8", "Y1FZeUNzVjlqMnM", "aHVBdF9wWXFRZUk", "ckNjUGxWbTBpckk", "aW9hNTJQeG9Pc2s", "TkwzcXBaSFNIcms", "bndxd3hsdUZJN1U", "QnA4a1FweDRJOUE", "dm5RbnBpTEotYW8", "S3VlLXhiemZ2eU0", "NnBRVmItSWxGU2M", "YmM1LXY1MFRjMFk", "OUM2dG80ODIyOW8", "QTRxamtiRGxXQ00", "N0VTdVZEbWpQcjg", "V3dvVWdaUlMyX2c", "dVlWSWZVc1plN3c", "LVRJejR0R2VkNTQ", "U1kyalc2WGRwQjA", "TTRHbWhuQW5Yb1E", "MzBjbTF0eFFoWEk", "b0k4OTZzTTdwUk0", "NlZFOTRrdUhQMEk", "UE9abmxBU1QwVmc", "RjBmbmlIMzExWEk", "WHpYTTcxUFdWR3c", "ZTVQbktlZWQ2ZFE", "WUlxVS1Rcl9GRGs", "Vlh0Q2Q0NjRIMU0", "OTB4czNJN3I4ZmM", "eG5STHgwUVQ4Y2M", "ZGxhUURZdy1lWGc", "RnFocHNTSDg5djQ", "bHplVkVValZHNlk", "anAzSUZ4MnBJMFU", "aDlkSTJYY0FsaU0", "dVdiM0hEckhXU3c", "ZDZFMkhsLWQ5UzQ", "OXJYT0ZLYkQ5Tkk", "eGl6am1BMVpWOVU", "NDhlWDkyR3NhVEU", "UERuTk0xX3Rmbzg", "WjI4cmdoOWxsSWs", "OHpGTFd0ZVFHZE0", "MHhGMEk4ODlUUEk", "dFZUdk5UTmE4cnc", "TFZFd1N1UTZGREE", "MnVUbXlSaFpLR28", "dUdMN01rMlZTS00", "T0k1b1JQay05Xzg", "VTRnbzkzWGdkUDA", "bmc1MUtENmNxME0", "NmtRZlAyYk82bDA", "QUh0c243X3VVV2M", "cnBKdHg5YlMzVE0", "LXdsQWJYSU1IVzA", "cXdOeFp2c2xWVm8", "amxUblV0UWx5cTg", "bTFNMWRlWVlvZ0E", "UnFyYThMelhtMDg", "WF9kR0ktZjdWaU0", "RVRQc21KSWRYOVE", "N1lWbUlTWXVWMTQ", "MW11dVctTE8xdGc", "SVpvVTZ0YUhzVUk", "RlZTeFBCUXNXblU", "X2U3WUlUMzFVR1U", "Z21PbTVhLTR4ZlU", "WDdOV3ZRdktSNTA", "S3FjZWJLYnp2RVE", "NmhhNnEycWNhVjQ", "NUNkOHgzQVNhVmM", "R0tJc093ZUFCelk", "cEVRUEdYb1lzQ1E", "R1RMZTZXUjRNd0U", "T2F1aE5EZk4yTXM", "eTV6UGcyR2hSU2c", "aFRVWkJRb09Udm8", "SzFtUkVKX0JRZHc", "VkNtam9LMU9NS28", "MUJlNTVHampkbkU", "RWFHeUpfUVRYRVE", "MG9UTzc1ekNaYjQ", "emhLd0QwbWtiTW8", "SG9WYkNWa0Q1U0E", "TEtmd29hWWhoWlk", "aHU0d0VsNjY5WDg", "UWREdUVhRHJWNnc", "eF8tdXZSeEtRMGc", "Q3J3RXdPMVhXNWc", "SkxTNmtTUFpteFU", "Wml3bkJhUXVYNW8", "SDdORjdyZ0VaSk0", "cXdTS21HOUxGNXM", "dHpxNkFkb3V3WlE", "MzU4QVRUNzY1M2s", "bERxNnYzYWpwRDQ", "eXVVakgxaWVocEk", "MW9oU2tFRG5VX2M", "Mk9vWTBLaFdKMmM", "aFc3b2F6ajNkNUk", "cU5xbm8zclhqODQ", "WUlLNld0X0tBZGs", "cHZqbWJSbzRsYUE", "ZE5YWVk3NUs3SmM", "aEJCQmdlNDR0TXM", "bjN5SVVvajBhQ1k", "VU1XanlmRk5Wek0", "X2hKY1ZYZWFZZWc", "eEtDb1BMWW8zak0", "cGFZU2hocDlOdFE", "SVJPRWdEVjVVeEk", "UjI2ZVM5RGNCcTQ", "YjhzOU93azV1dEk", "ZW5wbXFMZk91Smc", "SVVhQVg0d3d1ZVU", "YktIdlNWcmlCX0U", "MzdyTktUUlBLNnM", "MnYwMUZkRnhBck0", "RVFOTFRoNks5Q2s", "WlprUHRTQ3VMdmM", "ejFQZWNlNG5jc0U", "Mzg3TVVfdlBoczg", "Ul94aXI5X2taYms", "VlFPVWRpMFBBZVU", "RXRTTUFzMXcyQ2M", "b0NnOFRTMTB4RW8", "UVY2Vmh6Mm95d2M", "bUN4T09rQlljT2M", "VXZyRndWT3RYa1U", "aVNzT3pFc0gtS1U", "MTBjODM1WHRxQTA", "UDhvaU95STBOTFE", "T3B2M0lEczlmLVE", "cjRqWHFRMWpMZWs", "dFo5a2d6X2hhNWs", "Mkw3NlQ0cDRhTEE", "U0xhd29XN0Nmd0k", "azJBUGZ3dmRBSjg", "MV8yYVU5YlJ3Xzg", "aElqcHdpV1gwdTQ", "c2I3UnhIU1pSckE", "alZrVTd6U3BiaXM", "Q1drbXBYYlplV2c", "LVJhUVJaRF95b1E", "clVCY1kzdzBwM00", "RFBmdjRMajdCSjA", "cFVBNWZLcmRGNjg", "eEdMcVoyNUxHcDQ", "c01XLXlJckktS0E", "VVcwTnNmOFQ5REU", "TUpUTlVlWnZ6b3M", "VXpOMk4tQzNVQXc", "bUhMU0VhamdnQ0E", "RktjeWR6U29zYk0", "ZXdDUlE5UXlqamc", "eEhJcDVFNVE1SWs", "MkJRSUtzUVJkZnc", "ZE9zX0hZQUFJZDQ", "MkpVbFpXRmNWZW8", "ZDFDZHdyN0hiVG8", "aDN4dmxyZjAyb2c", "Q1JBWjJpalJZVzQ", "Z3NYVUNOdzhXSDQ", "YTg1WWxHZTZiUFE", "UzNqUkQ0N01FR3M", "Umh5ZDVBN3VwdU0", "V0QtRHh5LU15YVk", "VG00NFV4bkhkNm8", "LUZaYlF4YWJ1Uzg", "LXhYM2lseHY2U0E", "Tk5NVjd1c3NONlk", "MFl4NlFmYUtUTXM", "Wm9pcmFuWjJOSms", "a0FDanI2MTFTTms", "QVZOSExuU2lTcjA", "bVhVd0YyWEFQNlU", "QXNXNVo5ZUxJUzQ", "WGg4TERMQUxhU28", "ZHQ4RXNWZ2ZxYUU", "b1lwOXZsVGx6bFU", "WEVyVlRLLVBIbG8", "TVhheExHVlZqLUE", "S3FfNzlFTUhvWWM", "aWJJRFAzczRKclk", "S1Y3NVdPVThtbkk", "N2ZYbGRqSlVwbFE", "dy1KTWRBMnpCUTg", "X1MzX3JxRzRZV1E", "Y1F4WS1reW54OXc", "OWZlTjhQY0JVeFE", "U0hBODNIWnhVeDQ", "Nmp4bF83V2VMREU", "TVV1anRNbWRGeEU", "RHpnUUJxV2FTRjQ", "N3NzTHh3ZkpIa28", "YTgxdTZGQWlNdjg", "WXBpbmdIRmg0M2c", "MTRoeTEzanBack0", "SVNqMm5vRVFNdVU", "V0RseThka1JWUFE", "WFlMUk5pMElDU0U", "N0R6eEtqYVBtU0k", "b05hN3dSZ21UWEk", "RzZucDU4ZVhqZXc", "M1lxUmN2U0NhSE0", "bVNRVWt4X2tNM1U", "dUZoMHc0b2Q4a0k", "bXhpSjlQeGcxZ0U", "a0wyaHVIQkpreHc", "S1RNUF9YRVF4ZGM", "M3NQYV9aRlloOVE", "NzF3OUtFSERLQ3M", "ejdNSjAxYlJjQWc", "bVBWUUlHUzJKM1k", "Mmw4NzBrbnlMWEU", "Tjc3djZaa1ZyY3M", "TEJSWjBtdVlfOWc", "ZURxcFh3YzhRN2M", "MGNSZ2RfNXY1OTg", "Sk9OOUNvZGo4S00", "UnhjcHhoYXkzWms", "aTVUY2ZBdEJzdEk", "RUVsYnc0bE9XVDA", "a1AzMW5abFdqczA", "YmtaZnYyNE9TTTQ", "akhjSzg0VVZiYW8", "TzZ1bWRZS2dsbEU", "UjJ5ajN6LW9TVEE", "WC15SG9JYnc3aW8", "SWwxNE5ua182WVk", "T1F2LUpZZ3NkSlk", "a3RoaHk0TjM2N2s", "d05LQ21aR0ktdTA", "TG5ELWUxeWhJUm8", "TUF6dzZNUV9GNDg", "V2ZfWHNMSjV2ejQ", "NV85WlVfdWhIU2c", "WnI0YmRERVhTRHM", "NEJzOFZkVGVDQmc", "UGN2MmFLSDNoU00", "QW9lVkpKVG5PMEk", "OWZBSnZIb1JQV1k", "azU3RHZBY3pvNjg", "N2twT3JFUHk1Y00", "OVdYdTdrRzlSVTA", "cWphU1BDLW9oams", "cXFRSGM3eUQ5a0U", "cF9CYm1JZEJPMEk", "VHlSRXI0RHNtTHc", "SjI1azdhSTl0R3c", "cXBBak9PTWRKdW8", "cExLYzhsN09LRWs", "dWE1OGtwbDNjSHM", "MmtOdEZCMzJLd2c", "Z3QwX2hEbER4S28", "U2hfb2dmenplaDQ", "OWM5dktkNU5oWU0", "YUx4OWhXYlJkbWM", "dWFhcldNSXZUNms", "dVowanNHR0p1VDA", "NHE1Q2dKcjJkdFE", "OXl3cmtLR2dMTDg", "QUZZYWViUEh0STg", "THpJMERrVjR2dEk", "LWN6ZjhIb1YtQm8", "eDRlOVB1V3piZlU", "N3B1dktGdFBzTzQ", "SmZhcjNEcS1fZ2M", "RWZ3WHF5YWNtWXM", "SGxfSnUxaEl1M28", "M3NVd0F5WjBhcTg", "X3BrNlQzSlVNbU0", "U251LTREaUR0OWc", "dHhmdHU2NWl6OWs", "ek9HZ3lwVnNVOUE", "azRoTktKZ3l1M3c", "Sjh5Mnl4eXRfcjQ", "UE5kSzh5NEppbXM", "RGp2OFUzQ1VyRVk", "bi1Sclh0YmdqclU", "UTA4QWdUQmxrdlE", "elU3U0dzSl9jbHM", "Ty1OelFKWDlyT3c", "cDlUR3ZTSGZ4VDQ", "SEw2TTZqUUxSZEE", "czM0UG1iOVJybnc", "THQ4cUppVjUtZkE", "UUNIWDFydmtPNVk", "SWJnWjI3SExEOEE", "a0J2c0VfaFdLVlU", "MGdVR040NXhRdFE", "Ul8zVVA1Vy15dGc", "MDNKTzFjakFfcEE", "UHVuUXVLcHdUWWc", "a2NKSnN4SFk3MXc", "dHlwNFAwZktFQXc", "Mk5YZzJob184QmM", "UE5jSEZGYzBSSUU", "aUhqQmF5RGtIQVk", "Q3JKVXlrTzJmMVE", "bXhKUjlvNDY4TWM", "S3BGd0Vnajljbmc", "VXRfYlhaWVZHVlk", "dG1WczhlQlR5b2M", "SUhRVlByWnhYRzg", "cVhseUhEbWNmZmM", "ZEwtRFo2WlN4N1U", "WktEYTBTSUdrZ28", "d0dZVmZHWS02Z1U", "SHFZdVRYeTBmNDA", "cEpPSjBXR24teUE", "U05md0d2Nnk3NWs", "cFFjRFJRVTMwMDQ", "d0Z2LW5Da0ZEUlE", "dEZWNDBpVUtpSWs", "SE9TU1ZGYmJ3anc", "RXk2SGN5OWl6NDg", "VWJ1M1pKdGxuY3M", "dnlwTDNtMEFaU28", "U1JaNGRySzdqWUk", "RlhCY1I4S2dwU2s", "WFJkejE3Y3FMa2c", "bXc0aDIyaWxPcUE", "V0piSDNNLU5BdkE", "M0lnWkZha2VlQms", "aTNIM211QnFpM1k", "ZVFkNEQ3MUItb3M", "ZUUxU0MxcXI1SDg", "aWZoMVp1RmpDemc", "UUlnVFBtZmNJQ1E", "OHpoS1NuSFRyM0k", "T2w4YXVHV3hYWVU", "dmlhSHRGUXJseVk", "Y2dlVllITEJqd1E", "OVpmWEtzUGQwbms", "MklLM2JRUUNUVUU", "Q2Z0TXZvQTk3eU0", "NGdDVUppeG5OeWc", "YmdTN0dRWk5TbmM", "Ui02aVZ4c3J6SUU", "b0EzN3l0cExmb3M", "VWNKR2M1QnRRTlU", "aVN5NVIwTGJuZkk", "NTlrY2NwSHZScDQ", "cmVoTTVXQW5md2c", "TTIzeHZlQlJBR2M", "bk1MVEtEZjZPWms", "QVlVVDAyUEljakE", "RnRfT1BfeVJvOFk", "RVdrOXhiM0p6a1E", "eDZlT1JQUUNndGs", "S0hYT1JheGNFWTQ", "el9NM05Fa1lGYnM", "SFBzQnpxaTU3VE0", "ckdQNElBWldacDA", "UDF4MTFnZDlfenc", "cW5NS3l4TXI5MFk", "blZZOW1MZHRqQ0E", "TEdrMHM4RnFRUms", "YkVhdXgxUzB1Y2s", "d3gxa3hmUE9oQ3M", "Qk5SQnN6WjhjM3M", "WmJJTWExMnh3dE0", "MkZUQ3JocW9JQ0k", "TnBiRy1qZXhXdXc", "Nmw0TE1VRDQ5R1E", "Wk1nSnJMSUprSUk", "VS1TYTg1clFybVU", "NnNZVG1ESEg4QjA", "MWFQSE1NSGZVREk", "TUJpc1Q5cjJwRjQ", "OVJ5QkVnNWcyYlU", "QWp1R1owQmpDWlk", "OVNkd1NELUE3bnc", "TF9fWHpDbl9nMUk", "ZWNMblVBS3pTN2M", "YlZWTXFMSkYwX1E", "cUx1cUktQUZHNG8", "aGJBV1M1RlpPSkU", "c1AwMjdEOS1sU0E", "MFJsN3BndDB2X1E", "c2JTTUxrMzI1UzA", "cENjU0Z2UVRCdEE", "QV9lWS1XWmZzMjg", "LTB2b3U5WWZRMk0", "TW5xTl9VMkZPdnc", "YndXdnNQVFVJR1k", "cVdEQWJyMnNOLVE", "cnRKTGZYdDNkbE0", "QmRIWEp1S29TZlk", "eEhNUXQwX210ZlE", "MHItZFJmejNzUEU", "RHA1bG1nWHlQZGM", "YnAwR1hUa0hlcEU", "aXpFZy1ZTzFoS2c", "ZFVpSjJubTh3bFE", "b3BMcmFCbnJMa1E", "bEN5VzJFdUN0b3M", "eVdLR2pnMXNjREk", "MzlFZm1uLWpJczA", "bGVoRzk5dm5FWjQ", "VHFlQzNDMjNwT1E", "N3hkaHlJR1ZJR1U", "WkFkSU5BZ3Nadkk", "TGR4OHUwQTQ4Z0U", "OS1qUDdFTXN1bkk", "YnV6R083Z0RVd2c", "aUhERW1nS2xWSFk", "NXE1bTI0aDI5Wnc", "cDIyd3lwN0E5TXM", "S2ExZXdqV1k4bkk", "YXpoZlg2REhabm8", "cHVHWFNncVVRS0U", "UmhWU2h1TDIwUGM", "UG9vOGhGV1hHbzg", "YlRkSDlhWDFVOTQ", "ajRhU292aVZ6aTQ", "d2Z2WF8tLWMxSEk", "clJmb3hWNkpLZ28", "SDhuUThMNUZ1cTA", "akxIcVl2NEtSRjQ", "MWpYc1RScmlkTEU", "RW5fS2Y5SVVCSnc", "X055c3llUDhKMVU", "ZGRxU0c0UGJLWnM", "UXRIakZxOVN3Yzg", "Tl96dy1teEpSclk", "SkpDTDR1Q2VDUkE", "b2RqM1N6UjZScG8", "bHp2YkdVVjJsZzg", "UVJnT0JrRGZVRTA", "dFMxWW43dVVjbjQ", "S05OdUtSWUgwLUU", "b0ZGYVV3b21MWlE", "RVBLakRWNklycXM", "czRNYTVzSjJzWHc", "TDhxSGE1YlVsOWc", "M2xNNzRjQi1YR2s", "dTdpdnRjRi02LXc", "b3NXeXk3VW1BbGs", "enJ4N3RvOU8zdGM", "Rkh0amxURUxGS2c", "NUNLelh5VXRnYUU"];

			//Array com nome do arquivo
			var conjGDriveNome = ["00000087256.jpg", "002-pn1.jpg", "0cc6c9d9-674b-4b95-b68b-34b967085f9a.jpg", "0ceab9a2236ef3a5d52b4547956cb15ec7b0531a.jpg", "1001035.jpg", "1015526.jpg", "102317 (1).jpg", "10827_gg (1)-335x487.jpg", "126507-T.jpg", "133013 T.jpg", "1365.jpg", "137397 (1).jpg", "139667_950.jpg", "1475031213_.jpg", "1475031287_.jpg", "1475032304_ (1)-320x483 (1).png", "15745911.jpg", "165145.jpg", "16_300x449.jpeg", "198.jpg", "1x1 (1)-258x365 (1).png", "20170618_073455.jpg", "20170618_192056-270x351.jpg", "20170618_192056.jpg", "20170618_203730.jpg", "20170618_231309.png", "20170618_235244.jpg", "20170619_000132.jpg", "20170619_011000.jpg", "20170619_012446.jpg", "20170619_013917-524x803-262x401.jpg", "20170619_013917-524x803.jpg", "20170619_014732-566x852.1.jpg", "20170619_014732-566x852.jpg", "20170619_015456.1.jpg", "20170619_015456.jpg", "20170619_024158.jpg", "20170619_025005-218x298.jpg", "20170619_032444.jpg", "20170619_041009-605x879.jpg", "20170619_042100-587x937-440x702.jpg", "20170619_042100-587x937.jpg", "20170619_043249-340x480.jpg", "20170619_043844-574x830.jpg", "20170619_045425-595x842.jpg", "20170621_225800-380x604.jpg", "20170622_010608-329x457.jpg", "20170622_013631-270x454.jpg", "20170622_022141.jpg", "20170622_023645-260x329.jpg", "20170622_023645.1.jpg", "20170622_023645.jpg", "20170622_024927.jpg", "20170622_030734-555x873-416x654.jpg", "20170622_030734-555x873.jpg", "20170622_031525-422x731.jpg", "20170623_000850-288x459.jpg", "20170623_002818-564x956-282x478.jpg", "20170623_002818-564x956.jpg", "20170623_003910-324x505.jpg", "20170623_014534.jpg", "20170623_015600.jpg", "20170623_023111.jpg", "20170623_195400-173x260.jpg", "20170623_201042-561x826.jpg", "20170623_212207-525x760-393x569.jpg", "20170623_212207-525x760.jpg", "20170623_215116.jpg", "20170623_220130.jpg", "20170623_225546-596x898-447x674.jpg", "20170623_225546-596x898.jpg", "20170623_230313.jpg", "20170623_234336.1.jpg", "20170623_234336.jpg", "20170623_235044.1.jpg", "20170623_235044.jpg", "20170624_002537.jpg", "20170624_020449.jpg", "20170624_030746.jpg", "20170624_041555.jpg", "20170624_235022.jpg", "20170625_084824-560x822-420x617.jpg", "20170625_084824-560x822.jpg", "20170625_101440.jpg", "20170625_113417-582x593-436x444.jpg", "20170625_113417-582x593.jpg", "20170625_133057.1.jpg", "20170625_133057.jpg", "20170625_133638.jpg", "20170625_143644.1.jpg", "20170625_143644.jpg", "20170625_144951-557x863-417x646.jpg", "20170625_144951-557x863.jpg", "20170625_163216-803x1144-401x571.jpg", "20170625_163216-803x1144.jpg", "20170625_172936.jpg", "20170625_233912.1.jpg", "20170625_233912.jpg", "20170625_235746-309x435.jpg", "20170626_000721.jpg", "20170626_012725-407x648-305x486.jpg", "20170626_012725-407x648.jpg", "20170626_013622.jpg", "20170626_022945-432x668.1.jpg", "20170626_022945-432x668.jpg", "20170626_023914.1.jpg", "20170626_023914.jpg", "20170626_030339-416x688.1.jpg", "20170626_030339-416x688.jpg", "20170626_033638.jpg", "20170626_165139.1.jpg", "20170626_165139.jpg", "20170626_200321.jpg", "20170626_201647-602x589.jpg", "20170626_203745-278x378.jpg", "20170626_203745.1.jpg", "20170626_203745.jpg", "20170626_234819-457x749.jpg", "20170626_234819.jpg", "20170627_012142.jpg", "20170627_014626-198x286.jpg", "20170627_124256-529x819-264x409.jpg", "20170627_124256-529x819.jpg", "20170627_131210-562x853-421x639.jpg", "20170627_131210-562x853.jpg", "20170627_133643.1.jpg", "20170627_133643.jpg", "20170627_142415.jpg", "20170630_120812.1.jpg", "20170630_120812.jpg", "20170707_165428-643x995-482x746.jpg", "20170707_165428-643x995.jpg", "20170707_183415.jpg", "20170707_193528-447x695-335x521.jpg", "20170707_193528-447x695.jpg", "20170707_195824-506x413.jpg", "20170710_174440-547x758.jpg", "20170710_175918 (1)-538x787.1.jpg", "20170710_175918 (1)-538x787.jpg", "20170710_182150-670x971.jpg", "20170710_182150.jpg", "20170710_183924-542x840.jpg", "20170710_184742-276x432.jpg", "20170710_184742.jpg", "20170710_185446 (1)-336x428.jpg", "20170710_203106.jpg", "20170710_231028-500x693.jpg", "20170710_235703 (1)-317x470.jpg", "20170711_001523-351x477.jpg", "20170711_003158-475x626.jpg", "20170711_004953.jpg", "20170711_020145.jpg", "20170711_021332 (1).jpg", "20170711_032544-535x781.1.jpg", "20170711_032544-535x781.jpg", "20170711_110410.jpg", "20170711_113327.jpg", "20170711_114222.jpg", "20170711_115245-453x677.jpg", "20170711_115245.jpg", "20170711_194328-395x579.jpg", "20170711_201434-294x440.jpg", "20170711_201434.jpg", "20170711_202812-242x362.jpg", "20170711_202812.jpg", "20170711_212608.jpg", "20170711_214336.1.jpg", "20170711_214336.jpg", "20170712_055654.jpg", "20170712_064948-533x624-399x467.jpg", "20170712_064948-533x624.jpg", "20170712_070115.jpg", "20170712_074043-322x507.jpg", "20170712_075047 (1).jpg", "20170713_234630 (1).jpg", "20170714_001344-569x846.jpg", "20170714_003418.jpg", "20170714_014521.jpg", "20170714_022010.jpg", "20170714_111208-455x695.jpg", "20170714_122221-573x609.jpg", "20170714_134006-477x670.jpg", "20170714_140557-451x645.jpg", "20170714_155414-493x717.jpg", "20170714_162141-365x548.jpg", "20170714_233012-473x760.jpg", "20170714_235920.jpg", "20170715_003203.jpg", "20170715_004547-498x808.jpg", "20170715_011506-507x778.jpg", "20170715_131526.jpg", "20170715_131949 (1).jpg", "20170715_203440-509x746.jpg", "20170715_205305-562x885.jpg", "20170715_213815-834x1291-333x515.jpg", "20170715_215332-460x692.jpg", "20170715_220702-446x714.jpg", "20170715_231454-680x1212-272x485.jpg", "20170716_114114.jpg", "20170716_115915-505x820.jpg", "20170716_132718.jpg", "20170716_133935 (1).jpg", "20170716_150554 (1).jpg", "20170716_151227-412x607.jpg", "20170716_151954.jpg", "20170716_154327 (1)-530x810 (1)-265x405.jpg", "20170716_182636-333x515.jpg", "20170716_232009.jpg", "20170716_235537 (1).jpg", "20170717_203539.png", "20170717_210222.jpg", "20170717_214417 (1).jpg", "20170717_225036-272x394 (1).png", "20170717_225942.jpg", "20170717_231804 (1).jpg", "20170717_235338 (1).jpg", "20170718_004418-499x774 (1).jpg", "20170718_104049 (1).jpg", "20170718_191937-617x890 (1).jpg", "20170718_212902 (1).jpg", "20170718_212942 (1) (1).jpg", "20170718_222106-518x800 (1).jpg", "20170718_234357-484x709.jpg", "20170719_002155 (1)-407x587.jpg", "211830.jpg", "22-O-imaginario-da-cidade (1)-450x585.jpg", "22528390.jpg", "241557_Detalhes.jpg", "256577_Ampliada.jpg", "30366728.jpg", "30784369.jpg", "316175.jpg", "324003 (1).jpg", "346778.jpg", "354140.jpg", "35b912a2ad9d1aad3b8ed189b42ad90bb8a20c1f.jpg", "366343.jpg", "370841.jpg", "374600.jpg", "378413.jpg", "395452.jpg", "3c9b9a3a12c72acaf1975705999370865435ca8a.jpg", "406314 (1).jpg", "406861-302x450.jpg", "406861.jpg", "409114 (1)-248x450.jpg", "418430 (1) (1).jpg", "41GeMU6kESL.SL720.jpg", "41jcXlGelrL._SY400_.jpg", "441823_206.jpg", "449116 (1).jpg", "459786-323x450.jpg", "459786.jpg", "4865f7cf-c94f-4e1d-b399-0d55392321f2.jpg", "501901 (1).jpg", "51SFBXCOHLL._SX258_BO1,204,203,200_.jpg", "550492 (1).jpg", "558817 (1).jpg", "563491 (1).jpg", "584492-327x450.jpg", "584492.jpg", "59dac4ce4eabf7868601df5af30f4c8e4e75cb64.jpg", "61uWL9nvdML._SL1500_.jpg", "629170 (1)-288x450.jpg", "633735 (1).jpg", "69819_Detalhes.jpg", "6e0b1e3e5b126338c992e1b16744bb77ff26cb34.jpg", "714502114936598.jpg", "715149-299x450.jpg", "715149.jpg", "717563 (1)-305x450.jpg", "723605 (1).jpg", "724885-199x300.jpg", "728052-305x450.jpg", "728052.jpg", "72897367_1.jpg", "743818.1.jpg", "743818.jpg", "743818.jpg", "753938-299x450.jpg", "753938.1.jpg", "753938.jpg", "758412 (1).jpg", "76301.jpg", "772864 (1).jpg", "777574 (1).jpg", "780563.1.jpg", "780563.jpg", "783944 (1).jpg", "797794.jpg", "80197f55ac3379b23e412d88f0ced60e13bc8b84.jpg", "806954.jpg", "80819-292x449.jpg", "80819.jpg", "808511.jpg", "812141.jpg", "8139659fa5d2193005ba76a4e52c24ee5f2c6121.jpg", "819028.jpg", "831951.jpg", "833195.jpg", "833940.jpg", "837815.jpg", "845853.jpg", "8508052529.jpg", "8527304511.jpg", "856722.jpg", "8587070029.jpg", "864388.jpg", "864bf07ead36b90ed551be88ef40b8f5e4189f9f.jpg", "865041.jpg", "865300.jpg", "865450.jpg", "870395.jpg", "875319.jpg", "879427.jpg", "883878.jpg", "88c4323b13d8560609d98aa563c4707f2966dcde.jpg", "8927.jpg", "8b97e5813f4bdd464d0567b80050b31482083746.jpg", "8dce05cefe8c56bf2d053a40b187c219 (1)-304x492.jpg", "916260.jpg", "919887.jpg", "924167.jpg", "928003.jpg", "928232.jpg", "942796.jpg", "942798.jpg", "943427.jpg", "945085.jpg", "952035.jpg", "954551.jpg", "957671.jpg", "965597.jpg", "967154.jpg", "977550.jpg", "9788524904844_Ampliada.jpg", "9788524907920.jpg", "9788524925191_Ampliada (1).jpg", "9788534902601.jpg", "979125.jpg", "985016.jpg", "997450.jpg", "A CRISE DO CAPITALISMO GLOBALIZADO NA VIRADA DO MILÊNIO (1)-892x1275 (1)-356x509.jpg", "A Princesa de Cadignan.jpg", "A-vida-na-escola-e-a-escola-da-vida.jpg", "ATL1-235x239.png", "A_ERA_DAS_REVOLUCOES__1789__1848_1231636468B.jpg", "A_ERA_DO_CAPITAL__1848__1875_1231636798B.jpg", "BATISMO_DE_FOGO_1231277465B.jpg", "BRASIL__MITO_FUNDADOR_E_SOCIEDADE_AUTOR_1261428068P.jpg", "CIENCIAN_ENSINO_E_APRENDIZAGEM_1261248167B.jpg", "CRITICA_E_VERDADE_148894513616391SK1488945136B.jpg", "CULTURA_POPULAR_NA_IDADE_MODERNA_1342328500B.jpg", "Capa 1.jpg", "Capa-Filosofia-da-Educação-1490x2325 (1)-372x580.jpg", "Capa_ArmazemIII_4.jpg", "Capa_OsHereges (1)-600x296.jpg", "Capa_OsHereges (1).jpg", "Capturar.jpg", "DO_CABARE_AO_LAR_1288368976B.jpg", "Digitalizar0001-574x800.jpg", "Digitalizar0001.jpg", "EDUCACAO_COMO_PRATICA_DA_LIBERDADE_1236612801B.jpg", "EDUCACAO_DE_ADULTOS_EM_CUBA_1264352439B.jpg", "INTERPRETACAO_E_SUPERINTERPRETACAO_1280671484B.jpg", "INTRODUCAO_AO_ESTUDO_DA_HISTOR_1459384478575146SK1459384478B.jpg", "Imagem 129-272x368.jpg", "Livro_Eduardo (1)-404x599.jpg", "Mircea-Eliade-O-mito-do-eterno-retorno-638x1026-319x513.jpg", "Mircea-Eliade-O-mito-do-eterno-retorno-638x1026.jpg", "OS_IMPRIOS_NEGROS_DA_IDADE_MDIA__1292691181B.jpg", "O_DESENVOLVIMENTO_DAS_QUANTIDADES_FISICA_1330876221B.jpg", "PASSAGENS_DA_ANTIGUIDADE_AO_FE_144709914529205SK1447099145B.jpg", "PNDH-3_capa (1).png", "REFLEXOES_SOBRE_A_HISTORIA_1367461422B.jpg", "S_19233-MLB20168065061_092014-O.jpg", "Screenshot_20170619-001934-268x369.jpg", "Screenshot_20170621-230043-288x431.jpg", "Screenshot_20170626-020225-288x447.jpg", "Screenshot_20170626-194432-288x402.jpg", "Screenshot_20170626-215935-168x254.jpg", "_075f7fb452bacc38de671f8aa313e3b2e2950df6.jpg", "_1b5d0ad266c22281beebcb8bb5c2c7251c3758c4.jpg", "_1cdf40b3ee34d04d4c0f4cf41b7ff0d664f96b04.jpg", "_235d9f0f976e8a0b45c9688bd3c60b28ee135799.jpg", "_2408555d1c49324920e277e3f27f249260701e97.jpg", "_3239575cc1547626c8a15c1fd6106c4c30aab65f.jpg", "_3f5ae9248dddac292a636e26d99a10d53c944074.jpg", "_426aa5b45ddd0960455fcee3bfff1c8f6ca34f54.jpg", "_47ed8d9d5a79468cfd64d783f74bd2d52bcaf681.jpg", "_5982860dfe02b04ea0e3f2b74059160fc5426e05.jpg", "_5cc36502b0f5cf4034ad113162e80b8ad963d673.jpg", "_7327ce811eb2df1d8edea2deed30a6e34ff4a1dd.jpg", "_843b2914a52ad39eb4811ebba20a7039038c8144.jpg", "_b65d101afd9136a05cbd32782e63067c3a28c6fd.jpg", "_c4374a7f688060f9769cd72f342e2d261c3ca382.jpg", "_d7d3e86c31a71800911b8b21c8a639ac2db2dd38.jpg", "_ee7e106171a2eea94a88b924e98a074a1302677f.jpg", "_efc8ea0b67500745f80207cedafd355067d6f1cb.jpg", "_f12b5024c423de7fd31c20dc04eaa6a5ac9f36ca.jpg", "_f7d37b3788a67e3e4566a94f11ce80ec6ff1e48a.jpg", "_fbda9e17b03e85098ebacf75939ced2631eae3cd.jpg", "a-democacia-no-cotigiano-da-escola (1).jpg", "a50f13aa-50aa-416a-8512-dd3052a74157.jpg", "atlasambiental.jpg", "ações.jpg", "b692-educaco-e-a-crise-do-capitalismo-real-gaudncio-f-D_NQ_NP_737411-MLB20551027079_012016-F (1)-317x480.jpg", "b692-educaco-e-a-crise-do-capitalismo-real-gaudncio-f-D_NQ_NP_737411-MLB20551027079_012016-F (1).jpg", "bandeirantes-e-pioneiros-paralelo-entre-duas-culturas-1420059523.184x273.jpg", "bdb4a404fad7b154d534169d4b508072.jpg", "cap.jpg", "cd2aa30b16b175597768964a9606beddd8aed21c.jpg", "ceb3031cbc0492ee0340b6492acefd8bd9f3f6e3.jpg", "d2b47d1812bac0db135ebcb40e7a186f2a64bc83.jpg", "d48729874d322ef97846833f453959c3ecc87f5a.jpg", "d75acd8e228d03628f0ce5970d06b158f817a5cd.jpg", "d955eb8c05de4f79d9ef12dfeacef7ae.jpg", "democracia-capitalismo1.jpg", "dicionc3a1rio-baianc3aas (1).jpg", "download (1).jpg", "download (2).jpg", "download-172x258.png", "download.1.jpg", "download.2.jpg", "download.3.jpg", "download.4.jpg", "download.5.jpg", "download.6.jpg", "download.jpg", "e2978b172a4936444b2539d449a30ed5bae6ae58.jpg", "ensaios_etnograficos.jpg", "erichobsbawmmundos-do-trabalho-1-638.1-319x482.jpg", "erichobsbawmmundos-do-trabalho-1-638.1.jpg", "erichobsbawmmundos-do-trabalho-1-638.jpg", "estreitos-nos-betinho-D_NQ_NP_19209-MLB20167506165_092014-F-416x600.jpg", "fe3548cee575f05a1062e59b7fd744845b1d7261.jpg", "fe7f5bff685c2fad731fcbc3dd110b514fe0bd02.jpg", "fundamentos-da-escola-do-trabalho.jpg", "georges-gusdorf.jpg", "herreros-y-alquimistas-mircea-eliade-mdn_MLM-F-3791337587_022013-287x479.jpg", "hhhh.jpg", "historiadores (1).png", "hobsbawm-e-mundos-do-trabalho-2-638.2-319x485.jpg", "hobsbawm-e-mundos-do-trabalho-2-638.2.jpg", "hobsbawm-e-mundos-do-trabalho-2-638.jpg", "imagem_30.jpg", "linhagens-do-pensamento-politico-brasileiro-gildo-marcal-brandao-856043836x_200x200-PU6ea0fb3c_1.jpg", "livro-as-belas-mentiras-sebo-do-joo-D_NQ_NP_233801-MLB20415212213_092015-F (1)-398x600.jpg", "livro-as-belas-mentiras-sebo-do-joo-D_NQ_NP_233801-MLB20415212213_092015-F (1).jpg", "livro046.jpg", "manifesto_do_partido_comunista_9788525411242_9788525409669_hd.jpg", "md16343488108.jpg", "memorias_de_garibaldi_8525410713_m.jpg", "miseria-da-filosofia-png-e1478616923204-200x299.1.png", "miseria-da-filosofia-png-e1478616923204-200x299.png", "o-conto-da-ilha-desconhecida-jose-saramago-414x600.jpg", "o-conto-da-ilha-desconhecida-jose-saramago.jpg", "o-marxismo-na-america-latina-michael-lowy-D_NQ_NP_17330-MLB20135744333_072014-F-419x600.jpg", "o-marxismo-na-america-latina-michael-lowy-D_NQ_NP_17330-MLB20135744333_072014-F.jpg", "opac-image.png", "page_1-530x750.jpg", "page_1.jpg", "page_1_thumb_large.1.jpg", "page_1_thumb_large.jpg", "pedagogico_web (1).jpg", "ph_fontes.jpg", "photostudio_1500387590403-450x716.jpg", "photostudio_1500387811601-440x654.jpg", "poridentidad.jpg", "questões para a história do presente.jpg", "raciocionio na crianca.jpg", "relatorio2003.gif", "unnamed.1.jpg", "unnamed.jpg", "utopia-thomas-more.jpg", "vigiar-e-punir-318x498.jpg", "vigiar-e-punir.jpg"];

			var capaDel = localStorage.getItem('capadel');
			var mainDiv = bib102MainDiv();
			var somaDiv = 0;
			buscaIndex = bib102Vazio(document.getElementById('acf-field_5b17608ac67f7')).value;
			
			if (buscaIndex == '') {
				buscaIndex = 0;
			} 
			
			var index = Number(buscaIndex);

			for (var l = index; l < conjGDriveURL.length; l++) {

				capaSRC = "https://docs.google.com/uc?export=&id=0B9T12qFDZHBq";
				var descartados = capaDel.split(';');
				var total = conjGDriveNome.length - (descartados.length - 1);
				
				if (capaDel.includes(conjGDriveURL[l]) === true) {

					continue;
					
				} else {

					mainDiv.appendChild(bib102Visualizar(l, conjGDriveNome[l], capaSRC + conjGDriveURL[l], '', capaSRC + conjGDriveURL[l]));
					somaDiv += 1;
					
					if (somaDiv >= 15) {
						break;
					}
				}
			}

			divBusca.appendChild(mainDiv);

			index += 15;
		   
			if (index >= conjGDriveURL.length) {
				index = 1;
			}

			//Substitui "Carregando..." pela visualização dos livros
			var start = Number(document.getElementById('acf-field_5b17608ac67f7').value) + 1;
			pA.innerHTML = 'Total de resultados: ' + start + '-' + index + ' de ' + total + '.';

			//botão 'Mostrar mais imagens' caso a base de busca for Google Drive
			var gdMais = bib102CriarBotao('Mostrar mais imagens', 'id', 'gdmais', 'bib102-botoes-maiores');
			var gdMenos = bib102CriarBotao('Início', 'id', 'gdmenos', 'bib102-botoes-maiores'); 
			mainDiv.appendChild(gdMais);
			mainDiv.appendChild(gdMenos);
			
			//ao clicar no botão, altera o "Index" e mostra os próximos 9 resultados
			if (gdMais != undefined) {
				
				gdMais.onclick = function () {
					var buscaIndexNovo = Number(document.getElementById("acf-field_5b17608ac67f7").value) + 15;
					document.getElementById("acf-field_5b17608ac67f7").value = buscaIndexNovo;
					bib102BuscaInicial();
				}
			}
			
			//ao clicar no botão, altera o "Index" e mostra os próximos 9 resultados
			if (gdMenos != undefined) {
				
				gdMenos.onclick = function () {
					document.getElementById("acf-field_5b17608ac67f7").value = 0;
					bib102BuscaInicial();
				}
			}
		} else {
            return;
        }
	}

	//Gerar html para visualizar resultados
	function bib102Visualizar(index, titulo, endereco, autor, imagem = "/img/capa-de-livro-sem-imagem.png" ) {

		//Qual é a base de pesquisa atual
		var baseBusca = document.getElementById('acf-field_5b175df0310e6').value;

		//Uma div para cada livro
		var thumbnailDiv = bib102CriarSimples('div', 'thumbnaildiv' + index, 'bib102-miniatura');

		//Uma div interna para os botões de importação
		var botoesDiv = bib102CriarSimples('div', 'botoesdiv' + index);

		//Adicionar botoes para cada livro
		//Primeiro para importar o livro (exceto Google Drive)
		if (baseBusca != 'gd') {
			
			var bA = bib102CriarBotaoIcone('import_contacts', 'Livro', ['id', 'data-index', 'data-acao'], ['ba' + index, index, 'livro'], 'bib102-botoes-icone');
			bA.onclick = bib102InfoLivro;
	
		//Ou primeiro para descartar imagem (apenas Google Drive)
		} else {
			
			var bA = bib102CriarBotaoIcone('delete', 'Descartar', ['id', 'data-index', 'data-acao'], ['ba' + index, index, 'descartar'], 'bib102-botoes-icone', '#ba' + index);
			bA.onclick = bib102ImagensDescarteDrive;

		}
		
		//Segundo para visualizar a imagem
		//Botão Imagem para importar capa do livro
		var bB = bib102CriarBotaoIcone('image', 'Imagem', ['id', 'data-index', 'data-acao'], ['bb' + index, index, 'imagem'], 'bib102-botoes-icone');
		bB.onclick = bib102ImagensSeparar;

		//Adicionar link e título para cada livro
		var aA = bib102CriarSimples('a', 'aa' + index, "bib102-linhas");
		aA.target = "_blank";
		aA.innerHTML = titulo + '</br>';
		aA.href = endereco;

		//Incluir miniatura da capa na visualização
		var imgA = bib102CriarSimples('img', 'imga' + index, 'bib102-imga');
		imgA.setAttribute("data-title", titulo);
		imgA.src = imagem;

		//Adicionar autor
		var pB = bib102CriarSimples('p', 'pb' + index, "bib102-linhas");
		pB.style.margin = "0em 0em 0em 0em";
		pB.innerHTML = autor;

		if (baseBusca == 'gi') {
			//juntar elementos
			aA.appendChild(imgA);
			botoesDiv.appendChild(bB);
		} else {
			//juntar elementos
			aA.appendChild(imgA);
			botoesDiv.appendChild(bA);
			botoesDiv.appendChild(bB);		
		}

		thumbnailDiv.appendChild(botoesDiv);
		thumbnailDiv.appendChild(aA);
		thumbnailDiv.appendChild(pB);

		return thumbnailDiv;
	}
	
	//evento clicável com o botão Livro
	function bib102InfoLivro() {

		if (document.getElementById("post_type").value !== "post") {
			return;
		}

		//Determinar qual o volume deve ser recuperado
		var dataIndex = $(this).attr('data-index');
		
		//Base selecionada para pesquisa
		baseBusca = document.getElementById('acf-field_5b175df0310e6').value;

 		var volumeLink;

		//url do livro a importar
		if (baseBusca === "gb") {
			
			var gbHref = document.getElementById('aa' + dataIndex).href
			var gbId = gbHref.slice(37)
			volumeLink = "https://www.googleapis.com/books/v1/volumes/" + gbId + "?key=AIzaSyCSJ8OrHc3ZtvBS36nYyC9XxxXoDIivPS0";

		} else {
			
			volumeLink = document.getElementById('aa' + dataIndex).href;

		}

		//"Buscando o livro..."	
		pA.innerHTML = 'Buscando o livro...';

		//enviar qual o livro deve ser importado e receber os valores de todos os campos necessários
		$.ajax({
			url: ajaxurl,
			contentType: 'text/plain',
			data: {
				'action': 'bib102_busca_geral',
				'dados': volumeLink,
			},
			error: function (resposta) {
				pA.innerHTML = 'Ocorreu um erro. Erro: ' + resposta;
			},
			success: function (resposta) {
				if (resposta === null || resposta === 'null') {
					
					pA.innerHTML = 'A busca retornou nula. Tente novamente.';
					return;

				} else if (resposta === undefined || resposta === '') {
					
					pA.innerHTML = 'Não há items para exibição';
					return;

				} else {

					if (baseBusca === 'gi' || baseBusca === 'gd') {
			
						pA.innerHTML = 'Disponível apenas para importação de imagem';
					
					} else {

						function bib102DadosImport(inicio, fim, idDiv, idInput, campo = '', texto = resposta) {
						
							var recorte = bib102Recorte(texto, inicio, fim);

							var p = bib102CriarSimples('p', 'p-' + idDiv);
							p.innerHTML = recorte + campo;
							var campoDiv = document.getElementById(idDiv);
							p.classList.add('bib102-marcatexto');
							campoDiv.style.minHeight = "12em";
							campoDiv.insertBefore(p, campoDiv.childNodes[2]);

							if (idDiv != 'livro_info_autor' && idDiv != 'livro_anexos_geral' && idDiv != 'livros_pub_idioma' && idDiv != 'acf-group_5b17cf8c0f376') {
								
								//Criar botão para inserir texto no input
								var bOk = bib102CriarBotaoIcone('move_to_inbox', 'Ok', ['id'], ['bok-' + idDiv], 'bib102-botoes-icone', ('#' + idDiv));
								p.appendChild(bOk);
								bib102IncluirResposta(idDiv, idInput);

							}

							//criar botão para remover informações
							var bDel = bib102CriarBotaoIcone('cancel', 'Remover Imagem', ['id'],  ['bdel-' + idDiv], 'bib102-botoes-icone', ('#' + idDiv));
							p.appendChild(bDel);
							bib102DeletarResposta(idDiv);

						}

						var extraido;
						var descricaoTexto;

						if (baseBusca === 'am') {

							var corteAutor = bib102Recorte(resposta, 'field-author', '/a');
							var detalhesProduto = bib102Recorte(resposta, '<h2>Detalhes do produto</h2>', '<li><b>Avaliação média:</b>');
							var descricao = bib102Recorte(resposta, 'data-feature-name="bookDescription">', '<div id');

							bib102DadosImport('<title>', '</title>', 'livro_info_titulo', 'acf-field_5b17cfb4e1e94');
							bib102DadosImport('<div>', '</div>', 'livro_anexos_geral', 'acf-field_5b203780c7a40', '', descricao);
							bib102DadosImport('>', '<', 'livro_info_autor', 'acf-field_5b20af8804e36', '', corteAutor);
							bib102DadosImport('', '', 'acf-group_5b17cf8c0f376', '', detalhesProduto);
							extraido = bib102CriarSimples('span', 'extraido' + baseBusca);
							extraido.innerHTML = ' (extraído de Amazon)';
							document.getElementById('p-livro_anexos_geral').insertBefore(extraido, document.getElementById('bdel-livro_anexos_geral'));

						} else if (baseBusca === "gb") {
							
							resposta = JSON.parse(resposta);
							
							bib102DadosImport('', '', 'livro_info_titulo', 'acf-field_5b17cfb4e1e94', resposta.volumeInfo.title);
							bib102DadosImport('', '', 'livro_info_autor', 'acf-field_5b20af8804e36', resposta.volumeInfo.authors);
							bib102DadosImport('', '', 'livros_pub_editora', 'acf-field_5b18107717bc8', resposta.volumeInfo.publisher);
							bib102DadosImport('', '', 'livros_pub_ano', 'acf-field_5b1810a517bc9', resposta.volumeInfo.publishedDate);
							bib102DadosImport('', '', 'livro_anexos_geral', 'acf-field_5b203780c7a40', resposta.volumeInfo.description);
							bib102DadosImport('', '', 'livros_pub_numpag', 'acf-field_5b18132e17bcd', resposta.volumeInfo.pageCount);
							bib102DadosImport('', '', 'livros_pub_idioma', 'acf-field_5b18138617bce', resposta.volumeInfo.language);

							var isbn = bib102Vazio(resposta.volumeInfo.industryIdentifiers);

							for (var n = 0; n < isbn.length; n++) {
								var campo = isbn[n].type + ': ' + isbn[n].identifier + '; ';
							}

							bib102DadosImport('', '', 'livro_info_isbn_13', 'acf-field_5b17f9dca3e1e', campo);
							extraido = bib102CriarSimples('span', 'extraido' + baseBusca);
							extraido.innerHTML = ' (extraído de Google Books)';
							document.getElementById('p-livro_anexos_geral').insertBefore(extraido, document.getElementById('bdel-livro_anexos_geral'));

						} else if (baseBusca === "lc") {

							bib102DadosImport('<h1 class="title" itemprop="name">', '</h1>', 'livro_info_titulo', 'acf-field_5b17cfb4e1e94');
							bib102DadosImport('<p class="title product_subheading">', '</p>', 'livro_info_subtitulo', 'acf-field_5b17d042e1e96');
							bib102DadosImport('product.collaborator.name">', '</a>', 'livro_info_autor', 'acf-field_5b20af8804e36');
							bib102DadosImport('Sinopse</h2></header><div class="content">', '</div>', 'livro_anexos_geral', 'acf-field_5b203780c7a40');
							bib102DadosImport('product.vendorName">', '</a>', 'livros_pub_editora', 'acf-field_5b18107717bc8');
							bib102DadosImport('Edição:&nbsp;</b>', '</li>', 'livros_pub_edicao', 'acf-field_5b18110117bca');
							bib102DadosImport('Idioma:&nbsp;</b>', '</li>', 'livros_pub_idioma', 'acf-field_5b18138617bce');
							bib102DadosImport('Ano:&nbsp;</b>', '</li>', 'livros_pub_ano', 'acf-field_5b1810a517bc9');
							bib102DadosImport('Código de Barras:&nbsp;</b>', '</li>', 'livro_info_isbn_13', 'acf-field_5b17f9dca3e1e');
							bib102DadosImport('ISBN:&nbsp;</b>', '</li>', 'livro_info_isbn_10', 'acf-field_5b17fa2ea3e1f');
							bib102DadosImport('Encadernação:&nbsp;</b>', '</li>', 'livros_pub_formato', 'acf-field_5b21721f626f6');
							bib102DadosImport('Nº de Páginas:&nbsp;</b>', '</li>', 'livros_pub_numpag', 'acf-field_5b18132e17bcd');
							extraido = bib102CriarSimples('span', 'extraido' + baseBusca);
							extraido.innerHTML = ' (extraído de Livraria Cultura)';
							document.getElementById('p-livro_anexos_geral').insertBefore(extraido, document.getElementById('bdel-livro_anexos_geral'));

						}
						
						function bib102IncluirResposta(idDiv, idInput) {

							document.getElementById('bok-' + idDiv).onclick = function() {
							
								var dCampo = document.getElementById(idDiv);
								var pCampo = document.getElementById('p-' + idDiv);

								pCampo.removeChild(document.getElementById('bdel-' + idDiv));
								pCampo.removeChild(document.getElementById('bok-' + idDiv));

								var pValor = pCampo.innerHTML;
								
								dCampo.value = pValor;
								document.getElementById(idInput).value = pValor;
								dCampo.removeChild(pCampo);

							}
						}
						
						function bib102DeletarResposta(idDiv) {
							
							document.getElementById('bdel-' + idDiv).onclick = function() {
	
								var dCampo = document.getElementById(idDiv);
								var bOk = document.getElementById('bok-' + idDiv);

								dCampo.removeChild(document.getElementById('p-' + idDiv));
								
								if (bOk != null) {
									dCampo.removeChild(bOk);
								}

								dCampo.removeChild(document.getElementById('bdel-' + idDiv));

							}							
						}
					}
				}

				pA.innerHTML = 'Dados importados com sucesso.';

			}
		});
	}

	bib102ImagensCategoria();
	bib102ImagensPrateleira();

	var cadeado = $('#livros_loc_cadeado i.material-icons');
	var localizador = document.getElementById('acf-field_5b2447767aeae');
	var cutter = document.getElementById('acf-field_5b18186b8345a');
	var camposBloquear = [localizador, cutter];

	//campos iniciam somente leitura
	bib102Revezar(camposBloquear, cadeado);
	
	//botão para destravar/travar campos somente leitura de acordo com a necessidade
	document.getElementById('livros_loc_cadeado').onchange = function () {
		
		bib102Revezar(camposBloquear, cadeado);		

	}

	//calcula o valor do localizador ao mover o botão 'gerar localizador'
	document.getElementById('livros_loc_gerar').onchange = function () {
		
		//recupera categoria
		var categoria = $('#select2-acf-field_5b17da90bc4c4-container').attr("title");

		//var diferenciador = $('#autor_opcoes_pessoas .selected input').val();
		//var difFinal;

        //lingua do livro
		var lingua = $('#acf-field_5b18138617bce [selected]').val();
        //se vazio, assume que a língua é 'Português'
        lingua = bib102Vazio(lingua, 'ptg');

		//valor do campo Título
        var titulo = $('#acf-field_5b17cfb4e1e94').val();

        //se vazio, avisar e sair
		if (titulo == null || titulo == undefined || titulo == '') {
			alert('Preencha o campo "Título".');
			return;
		}

        //dividir titulo por palavras
        titulo = titulo.split(' ');
        //queremos apenas a primeira palavra
        var titulo1;
        
        //excluir artigos definidos e indefinidos de cada língua
        if (lingua === 'ptg') {
            if (titulo[0] === 'A' || titulo[0] === 'As' || titulo[0] === 'O' || titulo[0] === 'Os' || titulo[0] === 'Um' || titulo[0] === 'Uns' || titulo[0] === 'Uma' || titulo[0] === 'Umas') {
                titulo1 = bib102Vazio(titulo[1]) + bib102Vazio(titulo[2]);
            }
            else {
                titulo1 = bib102Vazio(titulo[0]) + bib102Vazio(titulo[1]);
            }
            
            //caso seja um dígito numérico, transformar em palavra
            titulo1 = bib102Numero(titulo1);
        }
        else if (lingua === 'esp') {
            if (titulo[0] === 'El' || titulo[0] === 'Los' || titulo[0] === 'La' || titulo[0] === 'Las' || titulo[0] === 'Un' || titulo[0] === 'Unos' || titulo[0] === 'Una' || titulo[0] === 'Unas') {
                titulo1 = bib102Vazio(titulo[1]) + bib102Vazio(titulo[2]);
            }
            else {
                titulo1 = bib102Vazio(titulo[0]) + bib102Vazio(titulo[1]);
            }
        }
        else if (lingua === 'ing') {
            if (titulo[0] === 'The' || titulo[0] === 'A' || titulo[0] === 'An') {
                titulo1 = bib102Vazio(titulo[1]) + bib102Vazio(titulo[2]);
            }
            else {
                titulo1 = bib102Vazio(titulo[0]) + bib102Vazio(titulo[1]);
            }
        }
        else if (lingua === 'fra') {
            if (titulo[0] === 'Le' || titulo[0] === 'La' || titulo[0] === 'Les' || titulo[0] === 'Un' || titulo[0] === 'Une' || titulo[0] === 'Des' || titulo[0].substr(0, 2) === "L'") {
                titulo1 = bib102Vazio(titulo[1]) + bib102Vazio(titulo[2]);
            }
            else {
                titulo1 = bib102Vazio(titulo[0]) + bib102Vazio(titulo[1]);
            }
        }
        
        //se língua não for português e for um dígito, avisar para ampliar função
        if (lingua != 'ptg' && /\d/g.test(titulo1) === true) {
            alert('Título em ' + lingua + ' e inicia com um numeral. Preencha o campo manualmente.');
            return;
        }

		var codigoEscolha = $('#livros_loc_escolha label.selected').children().first();

		if (codigoEscolha.val() == 'codtitulo') {
			
			//envia título para o php
			$.ajax({
				url: ajaxurl,
				contentType: 'text/plain',
				data: {
					'action': 'bib102_autor_pha',
					'dados': titulo1
				},
				error: function () {
					alert('Ocorreu um erro. ' + error);
				},
				success: function (response) {

					var codigo = response.replace('0', '');
					if (codigo === '') {
						alert('O código retornou vazio.');
					}
					$(document).ajaxComplete(function(){
						document.getElementById('acf-field_5b18186b8345a').value = codigo;
					});
				}
			});
		}

        //primeira letra da primeira palavra sem acentos e minúscula
        //valor de inicial do título que será passado ao localizador
        var t = bib102Str(titulo1[0]);		

        var tipoDivisao = $('#livro_info_divisao .selected input').val();
		
		if (tipoDivisao == 'o') {
			outrosDivisao = $('#acf-field_5ba22e21df2da').val();
			tipoDivisao = outrosDivisao[0];
		} else if (tipoDivisao == null || tipoDivisao == undefined || tipoDivisao == '') {
			tipoDivisao = 'v';
		}
		
		//caso tenha volume, recuperar valor
        var divisao = $('#acf-field_5b17cff6e1e95').val();
		var divisaoFinal = bib102Vazio(divisao, '');

		if (divisaoFinal != '' && divisaoFinal != '0' && divisaoFinal != 0) {
			divisaoFinal = ' ' + tipoDivisao + '.' + divisao;
		} else {
			divisaoFinal = "";
		}

        //deleta valor anterior do localizador
        document.getElementById('acf-field_5b2447767aeae').value = '';
		
		var cutterValor = document.getElementById('acf-field_5b18186b8345a').value;

		var cutterValor;

		if (codigoEscolha.val() == 'codtitulo') {
			function preencherCutter() {
				setTimeout(tempo, 4000);
			}
			
			function tempo() {
				cutterValor = document.getElementById('acf-field_5b18186b8345a').value;

				if (cutterValor == null || cutterValor == undefined || cutterValor.length <= 0) {
					alert('Informe a notação de autor.');
					return;
				} else {
					var localizador = bib102Vazio(categoria, 'Sem categoria') + ': ' + cutterValor + bib102Vazio(volumeFinal, '');

					//insere novo valor no campo
					document.getElementById('acf-field_5b2447767aeae').value = localizador;
				
				}
			}
			
			preencherCutter();

		} else {
			
			cutterValor = document.getElementById('acf-field_5b18186b8345a').value;
			var localizador = bib102Vazio(categoria, 'Sem categoria') + ': ' + cutterValor + bib102Vazio(t, '') + bib102Vazio(divisaoFinal, '');

			//insere novo valor no campo
			document.getElementById('acf-field_5b2447767aeae').value = localizador;
		}

	}

    //caso tenha volume, recuperar valor
    var divisao = $('#acf-field_5b17cff6e1e95').val();
	var divisaoTit = bib102Vazio($('#livro_info_divisao .selected').text(), '');
	var divisaoSlug = bib102Vazio($('#livro_info_divisao .selected input').val(), '');

	if (divisaoSlug == 'o') {

		var outrosDivisao = $('#acf-field_5ba22e21df2da').val();
		divisaoTit = outrosDivisao;
		divisaoSlug = outrosDivisao[0];

	} else if (divisaoSlug == null || divisaoSlug == undefined || divisaoSlug == '') {
		
		divisaoTit = 'Vol.';
		divisaoSlug = 'v';

	}
	
	if (divisao != '' && divisao != '0') {
		
		divisaoTit = ' - ' + divisaoTit  + ' ' + divisao;
		divisaoSlug = '-' + divisaoSlug + divisao;
		
	} else {
		divisaoTit = '';
		divisaoSlug = '';
	}

	var tituloFinal = document.getElementById('acf-field_5b17cfb4e1e94').value;
	var slug = bib102Str(tituloFinal);
	document.getElementById('post_name').value = '';
	document.getElementById('post_name').value = slug.replace(/\+/g, '-') + divisaoSlug;
	document.getElementById('title').value = tituloFinal + divisaoTit;

});