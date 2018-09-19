<?php
//AJAX
//1.1.0 - 2018-09-15

/* 
*
* AJAX1. Funções Gerais
*
*/

//AJAX1.1- Âncora para requisições ajax. Faz a busca, passa por uma função, se necessário e retorna o json para script
function bib102_busca_geral() {
    
    $dados = $_REQUEST['dados'];

        $busca = wp_remote_retrieve_body(wp_remote_get($dados));

		echo $busca;

    wp_die();
}
add_action("wp_ajax_bib102_busca_geral", "bib102_busca_geral");

//AJAX1.2 - Importação de imagens por demanda para todas as buscas
function bib102_imagem_capa() {

    $endereco = $_REQUEST['endereco'];
    $tipo = $_REQUEST['tipo'];
    $nome = $_REQUEST['nome'];
    $post_id = $_REQUEST['id'];
    $titulo = $_REQUEST['titulo'];
    
    if ($tipo == '.jpg' || $tipo == '.jpeg') {
        $mime = 'image/jpeg';
    }
    else if ($tipo == '.png') {
        $mime = 'image/png';
    }
    else {
        $filetype = wp_check_filetype($endereco);
        $nome = $nome . '.' . $filetype['ext'];
        $mime = $filetype['type'];
    }

    if ($endereco == '') {
        echo 'Nenhum dado válido recebido';
        return;
    }
    else {
        require_once(ABSPATH . "wp-admin" . '/includes/image.php');
        require_once(ABSPATH . "wp-admin" . '/includes/file.php');
        require_once(ABSPATH . "wp-admin" . '/includes/media.php');    

        $temp_file = download_url($endereco);

        if ( !is_wp_error( $temp_file ) ) {
            $file = array(
                'name'          => $nome,
                'type'          => $mime,
                'tmp_name'      => $temp_file,
                'error'         => 0,
                'size'          => filesize($temp_file),
            );

            $post_data = array (
                'alt'           => 'Capa do livro: ' . $titulo,
                'description'   => 'Endereço de origem: ' . $endereco
            );

            $imagem_id = media_handle_sideload($file, $post_id, $titulo, $post_data);
            $src = wp_get_attachment_url($imagem_id);

        }
    }

    echo $imagem_id . '!!!' . $src;

    wp_die();
}
add_action("wp_ajax_bib102_imagem_capa", "bib102_imagem_capa");

//AJAX1.3 - Coleta código cutter(tabela pha) de site de origem externa
function bib102_autor_pha($field) {
    
    $sobrenome = $_REQUEST['dados'];

    //prepara sobrenome para busca
    $sobrenome = str_ireplace(" ", "+", $sobrenome);
    $sobrenome = str_ireplace("0", "", $sobrenome);
    
    //buscar código de autor
    $body = wp_remote_retrieve_body(wp_remote_get('https://www.otonielfeliciano.com.br/cutters-online/?q=' . $sobrenome . '&t=&t=pha'));
    $posinic = stripos($body, 'id="txt"');
    $pha = substr($body, $posinic + 16, 4);
    trim($pha);

    if ($pha[3] === '"') {
        $pha = substr($pha, 0, 3);
    }
    
    echo $pha;
}
add_action("wp_ajax_bib102_autor_pha", "bib102_autor_pha");

?>