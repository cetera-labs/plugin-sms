<?php
namespace Sms\Gateway;

class Unisender extends GatewayAbstract  {
	
	public static function getInfo()
	{	
		$t = \Cetera\Application::getInstance()->getTranslator();
		
		return array(
			'name'        => 'Unisender',
			'params' => array(	
				array(
					'name'       => 'api_key',
					'xtype'      => 'textfield',
					'fieldLabel' => $t->_('Ключ доступа к API *'),
					'allowBlank' => false,
				),	
			)			
		);
	}
	
	public static function send( $from, $to, $message )
	{
		$params = self::getValues();
		
		$client = new \GuzzleHttp\Client();
		$response = $client->request('POST', 'https://api.unisender.com/ru/api/sendSms?format=json', [
			'verify'      => false,
			'form_params' => [
				'api_key' => $params['api_key'],
				'phone'   => $to,
				'sender'  => $from,
				'text'    => $message
			]
		]);	
		$res = json_decode($response->getBody(), true);
		//print_r($res);	
	}
	
}