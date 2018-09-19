<?php
//ACF
//1.1.1 - 2018-09-17

/*
*
* ACF1. Ajustes em funções
*
*/

//ACF1.1- Ao estabelecer a relação em Livros, atualiza-se também em Autores e vice-versa
function bidirectional_acf_update_value( $value, $post_id, $field  ) {
	
	// vars
	$field_name = $field['name'];
	$field_key = $field['key'];
	$global_name = 'is_updating_' . $field_name;
	
	
	// bail early if this filter was triggered from the update_field() function called within the loop below
	// - this prevents an inifinte loop
	if( !empty($GLOBALS[ $global_name ]) ) return $value;
	
	
	// set global variable to avoid inifite loop
	// - could also remove_filter() then add_filter() again, but this is simpler
	$GLOBALS[ $global_name ] = 1;
	
	
	// loop over selected posts and add this $post_id
	if( is_array($value) ) {
	
		foreach( $value as $post_id2 ) {
			
			$value2 = array();
			// load existing related posts
			$post_e = get_field($field_name, $post_id2, false);
			array_push($value2, $post_e);
			
			// allow for selected posts to not contain a value
			if( empty($value2) ) {
				
				$value2 = array();
				
			}
	
			// bail early if the current $post_id is already found in selected post's $value2
			if( in_array($post_id, $value2) ) continue;
			
			
			// append the current $post_id to the selected post's 'related_posts' value
			array_push($value2, $post_id);
			
			
			// update the selected post's value (use field's key for performance)
			update_field($field_key, $value2, $post_id2);
			
		}
	
	}
	
	
	// find posts which have been removed
	$old_value = get_field($field_name, $post_id, false);
	
	if( is_array($old_value) ) {
		
		foreach( $old_value as $post_id2 ) {
			
			// bail early if this value has not been removed
			if( is_array($value) && in_array($post_id2, $value) ) continue;
			
			
			// load existing related posts
			$value2 = get_field($field_name, $post_id2, false);
			
			
			// bail early if no value
			if( empty($value2) ) continue;
			
			
			// find the position of $post_id within $value2 so we can remove it
			$pos = array_search($post_id, $value2);
			
			
			// remove
			unset( $value2[ $pos] );
			
			
			// update the un-selected post's value (use field's key for performance)
			update_field($field_key, $value2, $post_id2);
			
		}
		
	}
	
	
	// reset global varibale to allow this filter to function as per normal
	$GLOBALS[ $global_name ] = 0;
	
	
	// return
    return $value;
    
}
add_filter('acf/update_value/name=livro_info_autor', 'bidirectional_acf_update_value', 10, 3);

/*
*
* ACF2. Ajustes em exibição
* OBS: Ajustes em exibição de taxonomias estão no arquivo 'biblioteca102-taxonomias.php'
*/

//ACF2.1- Remove mensagem padrão do tipo de campo 'flexible content'
function bib102_mensagem_flexible ($message, $field) {
    $message = '';
    return $message;
}
add_filter('acf/fields/flexible_content/no_value_message', 'bib102_mensagem_flexible', 10, 2);

/*
*
* ACF3. Options Pages
*
*/

//ACF3.1- Adiciona Options Pages
function bib102_acf_options_page () {
	
	if (function_exists('acf_add_options_page')) {
	
		acf_add_options_page(array(
			'page_title' 	=> 'Index',
			'menu_slug' 	=> 'options-index',
			'position'		=> '23.8',
			'icon_url'		=> "dashicons-list-view",
			'redirect'		=> true,
		'update_button'		=> __('Atualizar', 'acf'),
		'updated_message'	=> __("Página atualizada", 'acf'),
		));

		acf_add_options_sub_page(array(
			'page_title' 	=> 'Index - Livros',
			'menu_slug' 	=> 'options-index-livros',
			'parent_slug'	=> 'options-index',
		));
		acf_add_options_sub_page(array(
			'page_title' 	=> 'Admin Menu',
			'menu_slug' 	=> 'options-admin-menu',
			'parent_slug'	=> 'options-index',
		));
	}

}
add_action('acf/init', 'bib102_acf_options_page');

//ACF3.2- Ordena o repetidor em index de livro pelo localizador
function bib102_ordena_repetidor($value, $post_id, $field) {
	
	$order = array();
	
	//se vazio, sair
	if( empty($value) ) {
		
		return $value;
		
	}
	
	// populate order
	foreach($value as $i => $row) {

		$order[$i] = $row['field_5b9c208e53f43'];

	}
	
	// multisort
	array_multisort( $order, SORT_STRING, $value);
	
	// return	
	return $value;
	
}

add_filter('acf/load_value/key=field_5b9c1feb53f41', 'bib102_ordena_repetidor', 10, 3);

?>