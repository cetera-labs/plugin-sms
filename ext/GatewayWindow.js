Ext.define('Plugin.sms.GatewayWindow', {
    extend:'Ext.Window',

    modal: true,
    autoShow: true,
    width: 600,
    minWidth: 400,
    minHeight: 100,
	layout: 'fit',
			
    initComponent: function(){
				
		Ext.apply(this, {
			title: this.record.get('name'),
			items: {
				xtype: 'form',		
				itemId: 'form',
				layout: 'anchor',
				defaults: {
					anchor: '100%',
					labelWidth: 200,
					hideEmptyLabel: false
				},
				border: false,
				defaultType: 'textfield',
				bodyPadding: 10,		
				bodyCls: 'x-window-body-default',
				
				items: this.record.get('params'),
			
				buttons: [
					{
						text    : Config.Lang.ok,
						handler : function() {
							var f = this.up('form').getForm();
							if (!f.isValid()) return;
							//this.up('window').fireEvent('dataReady', this.up('form').getForm().getValues() );
							this.up('window').record.set('values', f.getValues());
							this.up('window').destroy();
						}
					},{
						text    : Config.Lang.cancel,
						handler : function() {
							this.up('window').destroy();
						}
					}
				]
			}
		});		
		
		this.callParent();
		
		this.getComponent('form').getForm().setValues( this.record.get('values') );
		
	}
	  
});