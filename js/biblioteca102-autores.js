//AUTORES.js
//1.1.1 - 2018-09-18

/*global jQuery, document */
jQuery(document).ready(function ($) {
    "use strict";
	
	//se não for script para post type 'autor', sair
	if (document.getElementById("post_type").value !== "autor") {
		return;
	}
	
	bib102TituloPrompt();

	//autor_abnt, citacao e codigo ficam bloqueados para edição, sendo preenchidos automaticamente
    var autor_abnt_campo = document.getElementById('acf-field_5b20ea2573817');
	var citacao_campo = document.getElementById('acf-field_5b210dfaf5ce1');
	var codigo_campo = document.getElementById('acf-field_5b2102b912ca3');
	var camposBloquear = [autor_abnt_campo, citacao_campo, codigo_campo];
	var cadeado = $('#autor_trava_destrava i.material-icons');

	bib102Revezar(camposBloquear, cadeado);

	//botão para destravar/travar campos somente leitura de acordo com a necessidade
	document.getElementById('autor_trava_destrava').onchange = function () {
		
		bib102Revezar(camposBloquear, cadeado);		
	
	}

	//depois de preenchidos e selecionados os campos necessários, o gatilho dispara o preenchimento automático
    $('#autor_gatilho').change(function () {
		
		//pegando os valores preenchidos
		var autor_nome = document.getElementById('acf-field_5b20e9a073816').value;
		var autor_abnt = autor_abnt_campo.value;
        var autor_opcoes = $('#autor_opcoes_pessoas .selected input').val();
        var autor_organizacao = $('#autor_opcoes_org .selected input').val();
        var citacao = citacao_campo.value;
		var codigo = codigo_campo.value;

		//caso não tenha nome de autor, voltar
		if ('' === autor_nome) {
            alert('Preencha o nome do autor');
            return;
        }

        var virgula;
        var ponto;
		
		//começa o trabalho de colocar o nome no formato ABNT
        autor_nome = autor_nome.trim();
        var lista = autor_nome.split(' ');
        var contagem = lista.length;

        //dividindo o nome(ultimos)
        var ultimo_um = lista[lista.length - 1];
        var ultimo_dois = lista[lista.length - 2] + ' ' + ultimo_um;
        var ultimo_tres = lista[lista.length - 3] + ' ' + ultimo_dois;
        var ultimo_quatro = lista[lista.length - 4] + ' ' + ultimo_tres;

        //dividindo o nome(inicio)
        var inicio_um = autor_nome.replace(ultimo_um, '');
        var inicio_dois = autor_nome.replace(ultimo_dois, '');
        var inicio_tres = autor_nome.replace(ultimo_tres, '');
        var inicio_quatro = autor_nome.replace(ultimo_quatro, '');

        //reconstruindo o nome
        if (contagem === 1) {
            autor_abnt = autor_nome.toUpperCase();
            citacao = autor_abnt;
        } else if (autor_opcoes === 'p2' || autor_organizacao === 'org2') {
            if (contagem < 2) {
                alert('São necessárias ao menos duas palavras para as opções escolhidas');
            } else if (contagem === 2) {
                autor_abnt = autor_nome.toUpperCase();
                citacao = autor_abnt;
            } else {
                autor_abnt = ultimo_dois.toUpperCase() + ', ' + inicio_dois;
                citacao = ultimo_dois.toUpperCase();
            }
        } else if (autor_opcoes === 'p3' || autor_organizacao === 'org3') {
            if (contagem < 3) {
                alert('São necessárias ao menos três palavras para as opções escolhidas');
            } else if (contagem === 3) {
                autor_abnt = autor_nome.toUpperCase();
                citacao = autor_abnt;
            } else {
                autor_abnt = ultimo_tres.toUpperCase() + ', ' + inicio_tres;
                citacao = ultimo_tres.toUpperCase();
            }
        } else if (autor_opcoes === 'p4' || autor_organizacao === 'org4') {
            if (contagem < 4) {
                alert('São necessárias ao menos quatro palavras para as opções escolhidas');
            } else if (contagem === 4) {
                autor_abnt = autor_nome.toUpperCase();
                citacao = autor_abnt;
            } else {
                autor_abnt = ultimo_quatro.toUpperCase() + ', ' + inicio_quatro;
                citacao = ultimo_quatro.toUpperCase();
            }
		//caso não seja possível preencher automaticamente, destravasse os campos para preenchimento manual
        } else if (autor_opcoes === 'p5' && autor_abnt === null || autor_abnt === undefined) {
			
			bib102AutorManual(autor_abnt_campo, 's');
			bib102AutorManual(citacao_campo, 's');
			bib102AutorManual(codigo_campo, 's');
			cadeado.setAttributeNode('data-title', 's');
			return;
			
        } else if (autor_organizacao === 'org5' && autor_abnt === null || autor_abnt === undefined) {
			
			bib102AutorManual(autor_abnt_campo, 's');
			bib102AutorManual(citacao_campo, 's');
			bib102AutorManual(codigo_campo, 's');
			cadeado.setAttribute('data-title', 's');
			return;

		//após o preenchimento manual, pega-se os dados preenchidos para prosseguir
		} else if (autor_abnt.length > 0) {
			autor_abnt = autor_abnt;
			citacao = citacao;
		}
		else {
            autor_abnt = ultimo_um.toUpperCase() + ', ' + inicio_um;
            citacao = ultimo_um.toUpperCase();
        }
		//detalhes finos diversos
        autor_abnt = autor_abnt.trim();
        citacao = citacao.trim();
        
        if (autor_opcoes === 'org1') {
            autor_abnt = autor_abnt.replace(',', '.');
        }

        var sobrenome = sobrenome_pha(citacao);
        sobrenome = sobrenome.trim();

        //sobrenome para calcular cutter e inicial
        function sobrenome_pha(sobrenome) {
            sobrenome = sobrenome.toLowerCase()
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
                .replace(/-/g, '')
                .replace(/\(/g, '')
                .replace(/\)/g, '')
                .trim();
            return sobrenome;
        }

        //envia sobrenome para o php
        $.ajax({
            url: ajaxurl,
            contentType: 'text/plain',
            data: {
                'action': 'bib102_autor_pha',
                'dados': sobrenome
            },
            error: function () {
                alert('Ocorreu um erro. ' + error);
            },
            success: function (response) {
                var codigo = response.replace('0', '');
                if (codigo === '') {
                    alert('O código retornou vazio.');
                }
                document.getElementById('acf-field_5b2102b912ca3').value = codigo;
            }
        });

		//incluindo os valores finais nos devidos campos
        document.getElementById('post_name').value = sobrenome_pha(autor_nome);
        document.getElementById('title').value = autor_abnt;
		document.getElementById('new-tag-post_tag').value = autor_nome;
        document.getElementById('acf-field_5b20ea2573817').value = autor_abnt;
        document.getElementById('acf-field_5b210dfaf5ce1').value = citacao;

		//taxonomia inicial
        var inicial = sobrenome.substring(0, 1);
        inicial = inicial.toUpperCase().trim();
		var li = document.getElementById('inicialchecklist').children;
		var alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

		for (var i = 0; i < alfabeto.length; i++) {

			if (inicial != alfabeto[i]) {
				continue;
			} else {
				var inCheck = document.getElementById('in-' + li[i].id);
				inCheck.checked = true;
				return;
			}
		}
    });
});
