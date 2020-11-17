<?php
namespace Sms;

class Gateway  {
		
	use \Cetera\DbConnection;
	
	private static $gateways = array();
	
	public static function add($class)
	{
		if (is_subclass_of($class, '\Sms\Gateway\GatewayAbstract'))
		{
			self::$gateways[] = $class;
		} 
		else 
		{
		    throw new \LogicException("{$class} must extend \\Sms\\Gateway\\GatewayAbstract");
		}		
	}
	
	public static function isGatewayExists($class)
	{
		return in_array($class, self::$gateways);
	}
	
	public static function enum()
	{
		$data = array();
		foreach (self::$gateways as $g) {
			$d = $g::getInfo();
			$d['class'] = $g;
			$d['id'] = $g;
			$d['values'] = $g::getValues();
			$data[] = $d;
		}
		return $data;
	}
	
	public static function trigger($id, $params)
	{
		$data = self::getDbConnection()->fetchAll('SELECT * FROM sms_templates WHERE active=1 and event = ?', array($id));
		
		foreach ($data as $template)
		{
			if (!self::isGatewayExists($template['gateway'])) continue;
			
			$twig = new \Twig_Environment(
				new \Twig_Loader_Array( $template ),
				array(
					'autoescape' => false,
				)
			);	
			$twig->addFunction(new \Twig_SimpleFunction('_', function($text) {
				return \Cetera\Application::getInstance()->getTranslator()->_($text);
			}));
			
			$template['gateway']::send( $twig->render('message_from', $params), $twig->render('message_to', $params), $twig->render('message_text', $params) );
		
		}
		return count($data);
	}	
	
}