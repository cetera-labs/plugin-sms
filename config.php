<?php
// Подключаем каталог с переводами модуля
$t = $this->getTranslator();
$t->addTranslation(__DIR__.'/lang');

\Sms\Gateway::add('\Sms\Gateway\Unisender');
\Sms\Gateway::add('\Sms\Gateway\Smsc');

\Cetera\Event::attach('*', array('\Sms\Gateway','trigger'));
	
// Для пользователей этой группы добавим наш плагин в меню
if ($this->getBo() && $this->getUser() && $this->getUser()->isAdmin() ) {

    $this->getBo()->addModule(array(
    	'id'	   => 'sms',
    	'position' => MENU_PLUGINS,
        'name' 	   => 'SMS',
        'icon'     => '/cms/plugins/sms/images/icon.gif',
        'class'    => 'Plugin.sms.Panel'
    ));

}