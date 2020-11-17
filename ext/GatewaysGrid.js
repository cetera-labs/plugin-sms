Ext.define('Plugin.sms.GatewaysGrid', {

    extend:'Cetera.grid.Abstract',
	requires: 'Plugin.sms.GatewayModel',
	
	border: false,	
	
	editWindowClass: 'Plugin.sms.GatewayWindow',

    columns: [
		{text: _("Шлюз"), flex: 1, dataIndex: 'name'}
    ],
	
	store: {
		model: 'Plugin.sms.GatewayModel',
		autoLoad: true,
		autoSync: true			
	},
	
	initComponent: function() {
		this.callParent();
		this.addAction.setHidden(true);
		this.deleteAction.setHidden(true);
		this.editAction.setText(_('Настроить'));
	}	
	
}); 