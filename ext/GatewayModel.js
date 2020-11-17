Ext.define('Plugin.sms.GatewayModel', {
    extend: 'Ext.data.Model',

    fields: [
		{name:'id', type: 'int'},
		{name:'name', type: 'string', persist: false},
		{name:'class', type: 'string'},
		{name:'values'},
		{name:'params', persist: false},
    ],
	
    proxy: {
		type: 'ajax',
		simpleSortMode: true,
        api: {
            read    : '/plugins/sms/scripts/data_gateways.php',
            update  : '/plugins/sms/scripts/data_gateways.php?action=update',
            create  : '/plugins/sms/scripts/data_gateways.php?action=create',
            destroy : '/plugins/sms/scripts/data_gateways.php?action=destroy'			
        },		
        reader: {
			type: 'json',
            root: 'rows'
        }
    }	
	
}); 