<?php
namespace Sms\Gateway;

abstract class GatewayAbstract  {
	
	use \Cetera\DbConnection;
		
	public function __construct($params, $order)
	{
		$this->params = $params;
		$this->t = \Cetera\Application::getInstance()->getTranslator();
	}
	
	public static function getValues()
	{
		return unserialize(self::getDbConnection()->fetchColumn('SELECT `values` FROM sms_gateways WHERE `class`=?',array('\\'.str_replace('\\\\','\\',get_called_class()))));
	}
	
	abstract public static function getInfo();	
	
	abstract public static function send( $from, $to, $message );	
	
}