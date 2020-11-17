<?php
include('common_bo.php');
$a = \Cetera\Application::getInstance();

if (isset($_GET['action']))
{
	$data = json_decode(file_get_contents("php://input"), true);
	$data['active'] = (int)$data['active'];
	
	if ($_GET['action'] == 'update')
	{	
		$a->getDbConnection()->update('sms_templates', $data, array('id' => $data['id']));	
	}
	
	if ($_GET['action'] == 'create')
	{
		$a->getDbConnection()->insert('sms_templates', $data);
		$data['id'] = $a->getDbConnection()->lastInsertId();		
	}	
	
	if ($_GET['action'] == 'destroy')
	{
		$a->getDbConnection()->delete('sms_templates', array('id' => $data['id']));
	}	
}
else
{
	$data = $a->getDbConnection()->fetchAll('SELECT * FROM sms_templates ORDER BY id');
}

echo json_encode(array(
    'success' => true,
    'rows'    => $data
));