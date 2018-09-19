<?php
//AUTORES
//1.1.1 - 2018-09-16

/*
*
* A1. Cria post type "Autor"
* 
*/

//A1.1- Registra post type 'autor'
function bib102_registra_post_type_autor(){

	register_post_type( 'autor', array (
	  'plural_name' => 'Autores',
	  'singular_name' => 'Autor',
	  'post_type_name' => 'autor',
	  'hierarchical' => false,
	  'public' => true,
	  'show_ui' => true,
	  'rewrite' => 
	  array (
		'slug' => 'autores',
		'with_front' => true,
		'feeds' => true,
		'pages' => true,
	  ),
	  'show_in_rest' => true,
	  'has_archive' => true,
	  'exclude_from_search' => false,
	  'publicly_queryable' => true,
	  'can_export' => true,
	  'show_in_nav_menus' => true,
	  'show_in_menu' => true,
	  'menu_position' => 5,
	  'menu_icon' => 'dashicons-id-alt',
	  'show_in_admin_bar' => true,
	  'auto_generate_labels' => '',
	  'label_add_new' => 'Adicionar autor',
	  'label_add_new_item' => 'Adicionar novo autor',
	  'label_edit_item' => 'Editar autor',
	  'label_new_item' => 'Novo autor',
	  'label_view_item' => 'Ver autor',
	  'label_search_items' => 'Pesquisar autores',
	  'label_not_found' => 'Nenhum autor encontrado',
	  'label_not_found_in_trash' => 'Nenhum autor encontrado',
	  'label_all_items' => 'Todos os autores',
	  'label_archives' => 'Arquivo de fichas de autor',
	  'label_insert_into_item' => 'Inserir em ficha de autor',
	  'label_uploaded_to_this_item' => 'Anexado em ficha de autor',
	  'label_featured_image' => 'Imagem personalizada',
	  'label_set_featured_image' => 'Definir imagem personalizada',
	  'label_remove_featured_image' => 'Remover imagem personalizada',
	  'label_use_featured_image' => 'Usar como imagem personalizada',
	  'label_menu_name' => 'Autores',
	  'label_filter_items_list' => 'Autores',
	  'label_items_list_navigation' => 'Autores',
	  'label_items_list' => 'Autores',
	  'label_name_admin_bar' => 'Autor',
	  'rewrite_with_front' => true,
	  'rewrite_slug' => 'autores',
	  'rewrite_feeds' => true,
	  'rewrite_pages' => true,
	  'rest_base' => 'autores',
	  'rest_controller_class' => NULL,
	  'taxonomies' => 
	  array (
		0 => 'inicial',
		1 => 'post_tag',
	  ),
	  'label' => 'Autores',
	  'labels' => 
	  array (
		'add_new' => 'Adicionar autor',
		'add_new_item' => 'Adicionar novo autor',
		'edit_item' => 'Editar autor',
		'new_item' => 'Novo autor',
		'view_item' => 'Ver autor',
		'search_items' => 'Pesquisar autores',
		'not_found' => 'Nenhum autor encontrado',
		'not_found_in_trash' => 'Nenhum autor encontrado',
		'all_items' => 'Todos os autores',
		'archives' => 'Arquivo de fichas de autor',
		'insert_into_item' => 'Inserir em ficha de autor',
		'uploaded_to_this_item' => 'Anexado em ficha de autor',
		'featured_image' => 'Imagem personalizada',
		'set_featured_image' => 'Definir imagem personalizada',
		'remove_featured_image' => 'Remover imagem personalizada',
		'use_featured_image' => 'Usar como imagem personalizada',
		'menu_name' => 'Autores',
		'filter_items_list' => 'Autores',
		'items_list_navigation' => 'Autores',
		'items_list' => 'Autores',
		'name_admin_bar' => 'Autor',
	  ),
	  'dashicon_unicode_number' => 337,
	));
}
add_action( 'init', 'bib102_registra_post_type_autor' );

/* 
*
* A2. Ajustes na exibição de 'Autores'
*
*/

//A2.1- Ajusta a metabox da taxonomia 'Inicial' e inputs de 'slug' e 'tags' na tela de edição do post type 'autor'
function bib102_autor_css (){
    $screen = get_current_screen();
  
    if  ('autor' === $screen->post_type && 'post' === $screen->base) {
?>
    <style type="text/css">
    <!--
    #inicialdiv
    {
        width: 100%;
		box-sizing: border-box;
        border-style: none;
        border-width: 0px;
        -webkit-box-shadow: 0 0 0 0;
        box-shadow: 0 0 0 0;
        margin: 0 0 7% 0;
        display: inline-table;
    }
    #taxonomy-inicial
    {
        width: 100%;
        padding: 0 0 0 0;
        margin: 5% 0 0 0;
    }
	#inicial-tabs
	{
		display: none;
	}
	#inicial-all
	{
		min-height: 19em;
	}
	#inicialchecklist
	{
		font-weight: bold;
		columns: 3;
	}
	#inicial-adder
	{
		display: none;
	}
    #post_name, #new-tag-post_tag
    {
        width: 100%;
    }
    -->
    </style>
<?php
    }
};
add_action('admin_head', 'bib102_autor_css');

//A2.2- Esconde metabox do título na tela de edição do post type 'autor'
function bib102_esconde_autor_titulo () {
    $screen = get_current_screen();
    $post = get_post();
  
    if  ($screen->post_type  == 'autor' && $screen->base == 'post') {
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
add_action('admin_head', 'bib102_esconde_autor_titulo');

?>