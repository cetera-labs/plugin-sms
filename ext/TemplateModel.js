Ext.define('Plugin.sms.TemplateModel', {
    extend: 'Ext.data.Model',

    fields: [
		{name:'id', type: 'int'},
        {name:'active', type: 'boolean'},
        {name:'event', type: 'string'},
		{name:'gateway', type: 'string'},
		{name:'message_from', type: 'string'},
		{name:'message_to', type: 'string'},
		{name:'message_text', type: 'string'}
    ],
	
    proxy: {
		type: 'ajax',
		simpleSortMode: true,
        api: {
            read    : '/plugins/sms/scripts/data_templates.php',
            update  : '/plugins/sms/scripts/data_templates.php?action=update',
            create  : '/plugins/sms/scripts/data_templates.php?action=create',
            destroy : '/plugins/sms/scripts/data_templates.php?action=destroy'			
        },		
        reader: {
			type: 'json',
            root: 'rows'
        }
    }	
	
});