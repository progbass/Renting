<?php

if($_POST['mail_txt']){
	//Class import
	require_once('utils/mail.inc.php');
	
	//
	$to		= array('0'=> array('name' => 'Casanova Renting Web-form', 'email' => 'progbass@gmail.com'));
	$cc		= array();
	$bcc	= array();
	$read	= array();
	$reply	= $_POST['mail_txt']; 
	
	
	//
	$sender = $_POST['mail_txt'];
	$senderName = $_POST['name_txt'];
	$subject = "Contacto :: Casanova Renting";
	$message = "<html>
				<head>
				  <title>Casanova Renting - Website Contact Form</title>
				</head>
				<body>
					<h4>Contacto Casanova Renting Website</h4><br/>
					<strong>Name:</strong> ".$senderName."<br/><br/>
					<strong>E-mail:</strong> ".$sender."<br/><br/>
					<strong>No. Unidades:</strong> ".$_POST['unidades_txt']."<br/><br/>
					<strong>Marca:</strong> ".$_POST['marca_txt']."<br/><br/>
					<strong>Modelo:</strong> ".$_POST['modelo_txt']."<br/><br/>
					<strong>Versi&oacute;n:</strong> ".$_POST['version_txt']."<br/><br/>
					<strong>Equipo Especial:</strong> ".$_POST['equipo_txt']."<br/><br/>
					<strong>Comentarios:</strong><br/>
					".$_POST['comments_txt']."
				</body>
				</html>";
				
				
				
	//enviamos el mail
	$status_err = 0;
	$status_txt = '';
	
	$obj = new sendMail($to, $sender, $subject, $message, $cc, $bcc, $senderName, $read, true, $reply, true);
	if( $obj->sendEmail() ){
		$status_err = 0;
	 	$status_txt = "Su mensaje ha sido enviado. Gracias.";
	 } else {
	 	$status_err = 1;
	 	$status_txt = "Se encontró un error. Por favor, intente de nuevo.";
	}
	
	//output
	$status = array (
		'err' => $status_err,
		'msg' => $status_txt
	);
	
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');
	echo json_encode($status);

}
?>