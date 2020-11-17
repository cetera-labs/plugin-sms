Ext.define('Plugin.sms.Panel', {
    extend: 'Ext.Panel',
	
	requires: ['Plugin.sms.TemplatesGrid','Plugin.sms.GatewaysGrid'],

    bodyCls: 'x-window-body-default',        
    cls: 'x-window-body-default',
    style: 'border: none',
    border: false,
	layout: 'border',

	items:[
		Ext.create('Plugin.sms.GatewaysGrid',{
			'title' : _('SMS шлюзы'),
			'region': 'north',
			'height': 200
		}),	
		Ext.create('Plugin.sms.TemplatesGrid',{
			'title' : _('Шаблоны сообщений'),
			'region': 'center'
		})
	]	
	
});