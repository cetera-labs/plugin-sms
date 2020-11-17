<?php
include('common_bo.php');
$a = \Cetera\Application::getInstance();

if (isset($_GET['action'])) {
	$data = json_decode(file_get_contents("php://input"), true);
	if ($_GET['action'] == 'update') {	
	
		try {
			$a->getDbConnection()->insert('sms_gateways', array('`class`'=>$data['class'], '`values`' => serialize($data['values'])));	
		}
		catch (\Exception $e) {
			$a->getDbConnection()->update('sms_gateways', array('`values`' => serialize($data['values'])), array('class' => $data['class']));	
		}
	}	

}
else {
	$data = \Sms\Gateway::enum();
}

echo json_encode(array(
    'success' => true,
    'rows'    => $data
));