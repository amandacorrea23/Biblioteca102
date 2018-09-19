<?php
//LIVROS
//1.1.1 - 2018-09-18

/*
*
* L1. Modificações em 'Livros'
*
*/

//L1.1- Renomeia 'Posts' para 'Livros'
function bib102_modifica_post_label() {

    global $menu;
    global $submenu;

    $menu[5][0] = 'Livros';
	$menu[5][6] = 'dashicons-book-alt';
    $submenu['edit.php'][5][0] = 'Livros';
    $submenu['edit.php'][10][0] = 'Adicionar Livro';

}
add_action('admin_menu', 'bib102_modifica_post_label');

//L1.2- Renomeia ródulos de 'Livros'
function bib102_modifica_post_object() {

    global $wp_post_types;

    $labels = &$wp_post_types['post']->labels;
    $labels->name = 'Livros';
    $labels->singular_name = 'Livro';
    $labels->add_new = 'Adicionar Livro';
    $labels->add_new_item = 'Adicionar novo Livro';
    $labels->edit_item = 'Editar Livro';
    $labels->new_item = 'Novo Livro';
    $labels->view_item = 'Ver Livro';
    $labels->search_items = 'Pesquisar Livros';
    $labels->not_found = 'Nenhum Livro encontrado';
    $labels->not_found_in_trash = 'Nenhum Livro encontrado entre os excluídos';
    $labels->all_items = 'Todos os Livros';
    $labels->menu_name = 'Livros';
    $labels->name_admin_bar = 'Livro';

}
add_action('init', 'bib102_modifica_post_object');

//L1.3- Modifica 'featured image' para 'capa do livro' no post type 'post' - alias 'livros'
function bib102_modifica_featured_image_labels($labels) {

	$labels->featured_image 		= 'Capa do livro';
	$labels->set_featured_image 	= 'Adicionar capa do livro';
	$labels->remove_featured_image 	= 'Remover capa do livro';
	$labels->use_featured_image 	= 'Usar como capa do livro';

	return $labels;
}
add_filter('post_type_labels_post', 'bib102_modifica_featured_image_labels', 10, 1);

//L1.4- Esconde metabox do título na tela de edição do post type 'post' - alias 'livros'
function bib102_esconde_livro_titulo () {
    $screen = get_current_screen();
    $post = get_post();
  
    if  ('post' == $screen->post_type && 'post' == $screen->base) {
        if ($post->post_status != 'publish') {
?>
    <style type="text/css">
    <!--
    #titlediv
    {
        display: none;
    }
    -->
    </style>
<?php
        }
    }
};
add_action('admin_head', 'bib102_esconde_livro_titulo');

/*
*
* L2. Cadastramento de 'Livros'
*
*/

//L2.1- Recupera Cutter para preenchimento da localização
function bib102_localizacao_cutter($value, $post_id, $field) {

	$codigo = get_field('livros_loc_escolha');
	$autores = get_field('livro_info_autor');
	$tags = array();

	foreach ($autores as $id) {
		
		$nome = get_field('autor_nome', $id);
		
		array_push($tags, $nome);

	}

	wp_set_object_terms($post_id, $tags, 'post_tag');

	if ($codigo == 'codautor') {

		$cutter = get_field('autor_codigo', $autores[0]);
		$value = $cutter;

	}
	


    return $value;

}
add_filter('acf/update_value/name=livros_loc_cutter', 'bib102_localizacao_cutter', 10, 3);

//L2.2 - Alimenta o Index de Livros a cada vez que o post é salvo
function bib102_index_livros($post_id) {

    $screen = get_current_screen();
	//se não for livro, sair

    if  ($screen->post_type != 'post' && $screen->base != 'post') {
		return;
	}

    $localizador = get_field('livros_loc_localizador');

	//se localizador estiver vazio, sair
	if ($localizador == '') {
		return;
	}

	$titulo = get_field('livro_info_titulo');

	//nome do autor é encontrado na ficha de autor
	$autor_id = get_field('livro_info_autor');	
	$autor_lista = array();

	foreach ($autor_id as $id) {

		$abnt = get_field('autor_abnt', $id);

		array_push($autor_lista, $abnt);
		
	}
		
	$autores = implode("; ", $autor_lista);

	//campos em cada linha
    $row = array(
		'field_5b9c202153f42' => $post_id,
		'field_5b9c208e53f43' => $localizador,
		'field_5b9c20d153f44' => $titulo,
		'field_5b9c215453f45' => $autores
	);

	//comparar id do post com campo da id para não duplicar linhas
	if (have_rows('field_5b9c1feb53f41', 'option')) {

		while (have_rows('field_5b9c1feb53f41', 'option')) {
			
			the_row();

			//Linha atual
			$i = get_row_index();

			//Valores no repetidor
			$campo_id = get_sub_field('field_5b9c202153f42', 'option');
			$campo_loc = get_sub_field('field_5b9c208e53f43', 'option');
			$campo_titulo = get_sub_field('field_5b9c20d153f44', 'option');
			$campo_autor = get_sub_field('field_5b9c215453f45', 'option');	

			//em caso do post já ter sido registrado, atualizar a linha e sair 
			if ($campo_id == $post_id) {

				update_row('field_5b9c1feb53f41', $i, $row, 'option');
				return;

			//se o localizador a ser salvo é igual a outro da lista (excluindo o próprio post), gera uma mensagem de erro
			} else if ($campo_id != $post_id  && $campo_loc == $localizador) {

				die('<span style="font-size: 1.2em">Este localizador já foi atribuído ao livro "' . $campo_titulo . '" de "' . $campo_autor . '" (ID nº ' . $campo_id . ').</span>');

			//se nem id, nem localizador coincidirem, o loop prossegue
			} else if ($campo_id == $post_id && $campo_loc != $localizador) {
			
				continue;

			}
		}
	} 
	
	//se 1º post, acrescenta linha no campo repetidor
	add_row('field_5b9c1feb53f41', $row, 'option');
	
	return;
}
add_action('acf/save_post', 'bib102_index_livros', 20);

/*
*
* L3. Exibição na página de gerenciamento do admin
*
*/

//L3.1- Modifica as colunas em exibição
function bib102_livros_colunas($colunas) {

    $screen = get_current_screen();

    //modifica apenas a página geral de administração dos posts
    if ($screen->id == 'edit-post' && $screen->action != 'edit' && $screen->post_type == 'post') {
		
		//Removida as colunas: Autor(do post), 
		//de "Descrição" e acrescentada a de miniatura
		$novas_colunas = array(
			'cb' 			=> '<input type="checkbox" />',
			'capa' 			=> __('Capa'),
			'title' 		=> __('Título'),
			'tags'			=> __('Autor'),
			'localizador' 	=> __('Localizador'),
			'categories'	=> __('Categorias'),
			'id'			=> __('ID'),
        );

		return $novas_colunas;

    }

}
add_filter('manage_edit-post_columns','bib102_livros_colunas');

//L3.2- Adiciona o conteúdo das novas colunas
function bib102_livros_colunas_conteudo($coluna_nome, $post_id) {

	if ($coluna_nome == 'capa') {
		
		if (!has_post_thumbnail()) {
			
			$imagem = '<img src="' . plugins_url('img/capa-de-livro-sem-imagem.png', __FILE__) . '" height="150px"/>';
			print_r($imagem);
			
		}
		else {
			
			$valor = the_post_thumbnail('thumbnail');
		
		}
	} else if ($coluna_nome == 'localizador') {
		
		the_field('field_5b2447767aeae');

	} else if ($coluna_nome == 'id') {
		
		echo $post_id;

	}
	
	return $valor;
}
add_filter('manage_posts_custom_column', 'bib102_livros_colunas_conteudo', 10, 2);

//L3.3- Torna colunas ordenáveis
function bib102_livros_colunas_ordenar($colunas) {

	$colunas['id'] = 'post_id';
	$colunas['localizador'] = 'localizador';
	$colunas['tags'] = 'post_tag';
	$colunas['categories'] = 'post_categories';
	return $colunas;

}
add_filter('manage_edit-post_sortable_columns', 'bib102_livros_colunas_ordenar', 10, 1);

function bib102_livros_orderby($query) {
	
	if (!is_admin() || !$query->is_main_query()) {
		return;
	}

	if ('localizador' == $query->get('orderby')) {
		
		$query->set( 'orderby', 'meta_value' );
		$query->set( 'meta_key', 'livros_loc_localizador' );

	}
}
add_action('pre_get_posts', 'bib102_livros_orderby');
?>