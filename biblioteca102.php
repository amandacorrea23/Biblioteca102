<?php

/* Plugin Name: Biblioteca102

* Plugin URI: www.biblioteca102.com.br

* Description: Plugin reunindo as modificações da Biblioteca102

* Version:  1.1.1

* Date: 2018-09-19

* Author: Amanda Corrêa

* Author URI: www.biblioteca102.com.br

* License:  GPL2

* License URI:  https://www.gnu.org/licenses/gpl-2.0.html

*/


/*
*
* 1. Ativação e desativação do plugin
*
*/

//1.1- Ajusta os permalinks
function bib102_install() {
 
    //ajusta os permalinks
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'bib102_install');

//1.2- Ajusta os permalinks em caso de desativação do plugin
function bib102_deactivation() {
    //ajusta os permalinks
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'bib102_deactivation');

/*
*
* 2. Definições básicas
*
*/
define('BIB102_PLUGIN_PATH', plugin_dir_path(__FILE__));

/*
*
* 3. Inclui arquivos
*
*/

include_once(BIB102_PLUGIN_PATH . 'biblioteca102-acf.php');
include_once(BIB102_PLUGIN_PATH . 'biblioteca102-ajax.php');
include_once(BIB102_PLUGIN_PATH . 'biblioteca102-autores.php');
include_once(BIB102_PLUGIN_PATH . 'biblioteca102-livros.php');
include_once(BIB102_PLUGIN_PATH . 'biblioteca102-taxonomias.php');

/*
*
* 4. Registra scripts e folha de estilos
*
*/

function bib102_global($hook) {
  	
	wp_register_script('bib102-script-global', plugins_url('/js/biblioteca102.js', __FILE__), array('jquery'));
	wp_enqueue_script('bib102-script-global');

    wp_register_style('biblioteca102-css', plugins_url('css/biblioteca102.css', __FILE__));
	wp_enqueue_style('biblioteca102-css');

	wp_register_style('material-design', "https://fonts.googleapis.com/icon?family=Material+Icons");
	wp_enqueue_style('material-design');

	if (in_array($hook, array('post.php', 'post-new.php'), true)) {

		wp_register_script('bib102-script-autor', plugins_url( '/js/biblioteca102-autores.js', __FILE__ ), array('jquery', 'bib102-script-global'));
		wp_enqueue_script('bib102-script-autor');
		wp_localize_script('bib102-script-autor', 'ajax_object', array('ajaxurl' => admin_url('admin-ajax.php')));
		
		wp_register_script('bib102-script-imagens', plugins_url('/js/biblioteca102-imagens.js', __FILE__), array('jquery', 'bib102-script-global'));
        wp_enqueue_script('bib102-script-imagens');
        wp_localize_script('bib102-script-imagens', 'ajax_object', array('ajaxurl' => admin_url( 'admin-ajax.php' )));

        wp_register_script('bib102-script-livros', plugins_url('/js/biblioteca102-livros.js', __FILE__), array('jquery', 'bib102-script-global', 'bib102-script-imagens'));
		wp_enqueue_script('bib102-script-livros');
		wp_localize_script('bib102-script-livros', 'ajax_object', array('ajaxurl' => admin_url( 'admin-ajax.php' )));

	} //else if (in_array($hook, array('edit-tags.php', 'term.php'), true)) {

	//}
}
add_action('admin_enqueue_scripts', 'bib102_global');
?>