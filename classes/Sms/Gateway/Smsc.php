<?php
namespace Sms\Gateway;

class Smsc extends GatewayAbstract  {
	
	public static function getInfo()
	{	
		$t = \Cetera\Application::getInstance()->getTranslator();
		
		return array(
			'name'        => 'smsc.ru',
			'params' => [
				[
					'name'       => 'login',
					'xtype'      => 'textfield',
					'fieldLabel' => $t->_('Логин клиента *'),
					'allowBlank' => false,
				],
				[
					'name'       => 'psw',
					'xtype'      => 'textfield',
					'fieldLabel' => $t->_('Пароль клиента *'),
					'allowBlank' => false,
				],
				[
					'name'       => 'translit',
					'xtype'      => 'numberfield',
					'minValue'   => 0,
					'maxValue'   => 2,
					'value'      => 0,
					'fieldLabel' => $t->_('Перевести в транслит'),
					'allowBlank' => false,
				],	
				[
					'name'       => 'tinyurl',
					'xtype'      => 'numberfield',
					'minValue'   => 0,
					'maxValue'   => 1,
					'value'      => 0,
					'fieldLabel' => $t->_('Сокращать ссылки'),
					'allowBlank' => false,
				],	
				[
					'name'       => 'flash',
					'xtype'      => 'numberfield',
					'minValue'   => 0,
					'maxValue'   => 1,
					'value'      => 0,
					'fieldLabel' => $t->_('Flash сообщения'),
					'allowBlank' => false,
				],				
			]			
		);
	}
	
	public static function send( $from, $to, $message )
	{
		$params = self::getValues();
		
		$client = new \GuzzleHttp\Client();
		$response = $client->request('POST', 'https://smsc.ru/sys/send.php', [
			'verify'      => false,
			'form_params' => [
				'login'    => $params['login'],
				'psw'      => $params['psw'],
				'phones'   => $to,
				'mes'      => $message,
				'sender'   => $from,
				'translit' => $params['translit'],
				'tinyurl'  => $params['tinyurl'],
				'flash'    => $params['flash'],
				'charset'  => 'utf-8',
			]
		]);	
		$res = json_decode($response->getBody(), true);
		//print_r($res);	
	}
	
}