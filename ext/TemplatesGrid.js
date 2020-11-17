Ext.require('Cetera.model.Event');
Ext.create('Ext.data.Store',{
	storeId: 'events_store',
	model: 'Cetera.model.Event'		
});
		
Ext.define('Plugin.sms.TemplatesGrid', {

    extend:'Cetera.grid.Abstract',
	requires: 'Plugin.sms.TemplateModel',
	
	border: false,	
	
	editWindowClass: 'Plugin.sms.TemplateWindow',

    columns: [
		{text: "ID", width: 50, dataIndex: 'id'},
		{text: _("Акт."),  width: 60, dataIndex: 'active', renderer: function (value) { if (value) return _('Да'); else return _('Нет'); }},
		{text: _("Шлюз"), width: 150, dataIndex: 'gateway'},
		{
			text: _("Событие"),  
			flex: 1, 
			dataIndex: 'event', 
			renderer: function (value) { 
				var evt = this.mailEvents.getById(value);
				value = '['+value+']';
				if (evt) value += ' ' + evt.get('name');
				return value;
			}
		},
        {text: _('Текст'),  flex: 1, dataIndex: 'message_text'}
    ],
	
	store: {
		model: 'Plugin.sms.TemplateModel',
		autoLoad: true,
		autoSync: true			
	},
	
	initComponent: function() {
		this.mailEvents = Ext.data.StoreManager.lookup('events_store');
		this.mailEvents.load();
		this.callParent();		
	}
	
});