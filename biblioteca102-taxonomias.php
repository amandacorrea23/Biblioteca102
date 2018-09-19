<?php
//TAXONOMIAS
//1.1.1 - 2018-09-17

/*
*
* T1. Inclui e altera taxonomias
*
*/

//T1.1- Inclui taxonomias -> post type post - alias 'livros' ("Coleção", "Prateleira" e Temáticas)
//                        -> post type autor ("Inicial")
function bib102_registra_taxonomias() {

	$args_colecao = array (
		'label' => esc_html__( 'Coleção', 'biblioteca102' ),
		'labels' => array(
			'menu_name' => esc_html__( 'Coleção', 'biblioteca102' ),
			'all_items' => esc_html__( 'Todas as Coleções', 'biblioteca102' ),
			'edit_item' => esc_html__( 'Editar Coleção', 'biblioteca102' ),
			'view_item' => esc_html__( 'Ver Coleção', 'biblioteca102' ),
			'update_item' => esc_html__( 'Atualizar Coleção', 'biblioteca102' ),
			'add_new_item' => esc_html__( 'Adicionar nova Coleção', 'biblioteca102' ),
			'new_item_name' => esc_html__( 'Nova Coleção', 'biblioteca102' ),
			'search_items' => esc_html__( 'Pesquisar Coleção', 'biblioteca102' ),
			'popular_items' => esc_html__( 'Coleções Populares', 'biblioteca102' ),
			'separate_items_with_commas' => esc_html__( 'Separar Coleções com vírgulas', 'biblioteca102' ),
			'add_or_remove_items' => esc_html__( 'Adicionar ou remover Coleção', 'biblioteca102' ),
			'choose_from_most_used' => esc_html__( 'Escolher entre Coleções mais usadas', 'biblioteca102' ),
			'not_found' => esc_html__( 'Nenhuma Coleção encontrada', 'biblioteca102' ),
			'name' => esc_html__( 'Coleção', 'biblioteca102' ),
			'singular_name' => esc_html__( 'Coleção', 'biblioteca102' ),
		),
		'public' => true,
		'show_ui' => true,
		'show_in_menu' => true,
		'show_in_nav_menus' => true,
		'show_tagcloud' => true,
		'show_in_quick_edit' => true,
		'show_in_rest' => true,
		'rest_base' => false,
		'hierarchical' => false,
		'query_var' => true,
		'sort' => false,
		'with front' => true,
	);
   
    $args_inicial = array (
		'label' => esc_html__( 'Iniciais', 'biblioteca102' ),
		'labels' => array(
			'menu_name' => esc_html__( 'Iniciais', 'biblioteca102' ),
			'all_items' => esc_html__( 'Todas Iniciais', 'biblioteca102' ),
			'edit_item' => esc_html__( 'Editar Inicial', 'biblioteca102' ),
			'view_item' => esc_html__( 'Ver Inicial', 'biblioteca102' ),
			'update_item' => esc_html__( 'Atualizar Inicial', 'biblioteca102' ),
			'add_new_item' => esc_html__( 'Adicionar nova Inicial', 'biblioteca102' ),
			'new_item_name' => esc_html__( 'Nova Inicial', 'biblioteca102' ),
			'parent_item' => esc_html__( 'Parent Inicial', 'biblioteca102' ),
			'parent_item_colon' => esc_html__( 'Parent Inicial:', 'biblioteca102' ),
			'search_items' => esc_html__( 'Pesquisar Iniciais', 'biblioteca102' ),
			'popular_items' => esc_html__( 'Iniciais Populares', 'biblioteca102' ),
			'separate_items_with_commas' => esc_html__( 'Separar Iniciais com vírgulas', 'biblioteca102' ),
			'add_or_remove_items' => esc_html__( 'Adicionar ou remover Iniciais', 'biblioteca102' ),
			'choose_from_most_used' => esc_html__( 'Escolher entre Iniciais mais usadas', 'biblioteca102' ),
			'not_found' => esc_html__( 'Nenhuma Inicial encontrada', 'biblioteca102' ),
			'name' => esc_html__( 'Iniciais', 'biblioteca102' ),
			'singular_name' => esc_html__( 'Inicial', 'biblioteca102' ),
		),
		'public' => true,
		'show_ui' => true,
		'show_in_menu' => true,
		'show_in_nav_menus' => true,
		'show_tagcloud' => true,
		'show_in_quick_edit' => true,
		'show_admin_column' => true,
		'show_in_rest' => true,
		'rest_base' => false,
		'hierarchical' => true,
		'with_front' => true,
		'query_var' => true,
		'sort' => false,
	);
	
  	$args_prateleira = array (
		'label' => esc_html__( 'Prateleira', 'biblioteca102' ),
		'labels' => array(
			'menu_name' => esc_html__( 'Prateleira', 'biblioteca102' ),
			'all_items' => esc_html__( 'Todas as Prateleiras', 'biblioteca102' ),
			'edit_item' => esc_html__( 'Editar Prateleira', 'biblioteca102' ),
			'view_item' => esc_html__( 'Ver Prateleira', 'biblioteca102' ),
			'update_item' => esc_html__( 'Atualizar Prateleira', 'biblioteca102' ),
			'add_new_item' => esc_html__( 'Adicionar nova Prateleira', 'biblioteca102' ),
			'new_item_name' => esc_html__( 'Nova Prateleira', 'biblioteca102' ),
			'search_items' => esc_html__( 'Pesquisar Prateleira', 'biblioteca102' ),
			'popular_items' => esc_html__( 'Prateleiras Populares', 'biblioteca102' ),
			'separate_items_with_commas' => esc_html__( 'Separar Prateleiras com vírgulas', 'biblioteca102' ),
			'add_or_remove_items' => esc_html__( 'Adicionar ou remover Prateleira', 'biblioteca102' ),
			'choose_from_most_used' => esc_html__( 'Escolher entre Prateleiras mais usadas', 'biblioteca102' ),
			'not_found' => esc_html__( 'Nenhuma Prateleira encontrada', 'biblioteca102' ),
			'name' => esc_html__( 'Prateleira', 'biblioteca102' ),
			'singular_name' => esc_html__( 'Prateleira', 'biblioteca102' ),
		),
		'public' => true,
		'show_ui' => true,
		'show_in_menu' => true,
		'show_in_nav_menus' => true,
		'show_tagcloud' => true,
		'show_in_quick_edit' => true,
		'show_in_rest' => true,
		'rest_base' => false,
		'hierarchical' => false,
		'query_var' => true,
		'sort' => false,
		'with front' => true,
	);

  	$args_tematicas = array (
		'label' => esc_html__( 'Temáticas', 'biblioteca102' ),
		'labels' => array(
			'menu_name' => esc_html__( 'Temáticas', 'biblioteca102' ),
			'all_items' => esc_html__( 'Todas as Temáticas', 'biblioteca102' ),
			'edit_item' => esc_html__( 'Editar Temática', 'biblioteca102' ),
			'view_item' => esc_html__( 'Ver Temática', 'biblioteca102' ),
			'update_item' => esc_html__( 'Atualizar Temática', 'biblioteca102' ),
			'add_new_item' => esc_html__( 'Adicionar nova Temática', 'biblioteca102' ),
			'new_item_name' => esc_html__( 'Nova Temática', 'biblioteca102' ),
			'search_items' => esc_html__( 'Pesquisar Temática', 'biblioteca102' ),
			'popular_items' => esc_html__( 'Temáticas Populares', 'biblioteca102' ),
			'separate_items_with_commas' => esc_html__( 'Separar Temáticas com vírgulas', 'biblioteca102' ),
			'add_or_remove_items' => esc_html__( 'Adicionar ou remover Temática', 'biblioteca102' ),
			'choose_from_most_used' => esc_html__( 'Escolher entre Temáticas mais usadas', 'biblioteca102' ),
			'not_found' => esc_html__( 'Nenhuma Temática encontrada', 'biblioteca102' ),
			'name' => esc_html__( 'Temáticas', 'biblioteca102' ),
			'singular_name' => esc_html__( 'Temática', 'biblioteca102' ),
		),
		'public' => true,
		'show_ui' => true,
		'show_in_menu' => true,
		'show_in_nav_menus' => true,
		'show_tagcloud' => true,
		'show_in_quick_edit' => true,
		'show_in_rest' => true,
		'rest_base' => false,
		'hierarchical' => false,
		'query_var' => true,
		'sort' => false,
		'with front' => true,
	);
	
	register_taxonomy( 'colecao', array( 'post' ), $args_colecao );
	register_taxonomy( 'inicial', array( 'autor' ), $args_inicial );
  	register_taxonomy( 'prateleira', array( 'post' ), $args_prateleira );
	register_taxonomy( 'tematicas', array( 'post' ), $args_tematicas );

}
add_action( 'init', 'bib102_registra_taxonomias', 0 );

//T1.2- Altera 'tags' para 'autores'
function bib102_modifica_tag_object() {
    global $wp_taxonomies;
    $labels = &$wp_taxonomies['post_tag']->labels;
    $labels->name = 'Autor';
    $labels->singular_name = 'Autor';
    $labels->add_new = 'Adicionar autor';
    $labels->add_new_item = 'Adicionar autor';
    $labels->edit_item = 'Editar autor';
    $labels->new_item = 'Novo autor';
    $labels->view_item = 'Ver Autor';
    $labels->search_items = 'Pesquisar autor';
    $labels->not_found = 'Nenhum autor encontrado';
    $labels->not_found_in_trash = 'Nenhum autor entre os itens excluídos';
    $labels->all_items = 'Todos os autores';
    $labels->menu_name = 'Autor';
    $labels->name_admin_bar = 'Autor';
}
add_action( 'init', 'bib102_modifica_tag_object' );

/*
*
* T2. Exibição na página de gerenciamento do admin
*
*/

//T2.1- Modifica as colunas em exibição
function bib102_categorias_colunas($colunas) {

    $screen = get_current_screen();

    //modifica apenas a página geral de administração da taxonomia categorias
    if ($screen->id == 'edit-category' && $screen->action != 'edit') {
		
		//Removida a coluna de "Descrição" e acrescentada a de miniatura
		$novas_colunas = array(
			'cb' 		=> '<input type="checkbox" />',
			'miniatura' => '',
			'name' 		=> __('Name'),
			'slug' 		=> __('Slug'),
			'id'		=> __('ID'),
			'posts' 	=> __('Posts')
        );

		return $novas_colunas;

    }

}
add_filter('manage_edit-category_columns','bib102_categorias_colunas');

//T2.2- Adiciona o conteúdo da coluna de miniatura
function bib102_categorias_colunas_conteudo($miniatura, $coluna_nome, $term_id) {

	if ('miniatura' == $coluna_nome) {
		
		$imagem = get_field('categorias_imagem', 'category_' . $term_id);
		$miniatura = '<img src="' . $imagem['url'] . '" width="100%"/>';

    } else if ('id' == $coluna_nome) {
		
		echo $term_id;

	}
	
	return $miniatura;
}
add_filter('manage_category_custom_column', 'bib102_categorias_colunas_conteudo', 10, 3);

//T2.3- Torna coluna 'ID' ordenável
function bib102_categorias_colunas_ordenar($colunas) {
  $colunas['id'] = 'term_id';

  return $colunas;

}
add_filter('manage_edit-category_sortable_columns', 'bib102_categorias_colunas_ordenar', 10, 1);

//T2.4- Modifica as colunas em exibição
function bib102_prateleiras_colunas($colunas) {

    $screen = get_current_screen();

    //modifica apenas a página geral de administração da taxonomia categorias
    if ($screen->id == 'edit-prateleira' && $screen->action != 'edit') {
		
		//Removida a coluna de "Descrição" e acrescentada a de miniatura
		$novas_colunas = array(
			'cb' 		=> '<input type="checkbox" />',
			'miniatura' => '',
			'name' 		=> __('Name'),
			'slug' 		=> __('Slug'),
			'id'		=> __('ID'),
			'posts' 	=> __('Posts')
        );

		return $novas_colunas;

    }

}
add_filter('manage_edit-prateleira_columns','bib102_prateleiras_colunas');

//T2.5- Adiciona o conteúdo da coluna de miniatura
function bib102_prateleiras_colunas_conteudo($miniatura, $coluna_nome, $term_id) {

	if ('miniatura' == $coluna_nome) {
		
		$imagem = get_field('prateleiras_imagem', 'prateleira_' . $term_id);
		$miniatura = '<img src="' . $imagem['url'] . '" width="100%"/>';

    } else if ('id' == $coluna_nome) {
		
		echo $term_id;

	}
	
	return $miniatura;
}
add_filter('manage_prateleira_custom_column', 'bib102_prateleiras_colunas_conteudo', 10, 3);

//T2.6- Torna coluna 'ID' ordenável
function bib102_prateleiras_colunas_ordenar($colunas) {
  $colunas['id'] = 'term_id';

  return $colunas;

}
add_filter('manage_edit-prateleira_sortable_columns', 'bib102_prateleiras_colunas_ordenar', 10, 1);

/*
*
* T3. Exibição de taxonomias no cadastro de livros
*
*/

//T3.1- Filtro para que o campo "livro_categorias_selecao" mostre apenas as categorias principais
function bib102_filtro_categorias($args, $field, $post_id) {

    $args['parent'] = 0;
	
    return $args;
}
add_filter('acf/fields/taxonomy/query/name=livro_categorias_selecao', 'bib102_filtro_categorias', 10, 3);

//T3.2- Filtro para que o campo "livro_categorias_subcategoria" mostre apenas as subcategorias da categoria principal selecionada
function bib102_filtro_subcategorias($args, $field, $post_id) {
	
	$categoria = get_field('livro_categorias_selecao', $post_id);
	$args['parent'] = $categoria;
    return $args;

}
add_filter('acf/fields/taxonomy/query/name=livro_categorias_subcategoria', 'bib102_filtro_subcategorias', 20, 3);

//T3.3- Filtro para salvar miniatura de categoria
function bib102_miniatura_categorias($field) {

    $categoria = get_field('field_5b17da90bc4c4');
	$miniatura = get_field('field_5b97ef87432c6', 'category_' . $categoria);
	$field['value'] = $miniatura['id'];
    return $field;
}
add_filter('acf/load_field/key=field_5b17da2ebc4c3', 'bib102_miniatura_categorias');

//T3.4- Filtro para salvar miniatura de prateleira
function bib102_miniatura_prateleiras($field) {

    $prateleira = get_field('field_5b18498c8345d');
	$miniatura = get_field('field_5b9b1eee2023f', 'prateleira_' . $prateleira);
	$field['value'] = $miniatura['id'];
    return $field;
}
add_filter('acf/load_field/name=livros_loc_pratmini', 'bib102_miniatura_prateleiras');

?>