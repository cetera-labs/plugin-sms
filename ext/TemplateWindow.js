Ext.define('Plugin.sms.TemplateWindow', {
    extend:'Ext.Window',
	
	requires: 'Plugin.sms.GatewayModel',

    modal: true,
    autoShow: true,
    width: '70%',
    minWidth: 400,
    minHeight: 300,
	layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	title: _('Шаблон SMS'),
	lastFocus: null,
	
    items: [
		{
			flex: 1,
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

			items: [
				{
					itemId: 'event',
					fieldLabel: _('Событие'),
					name: 'event',
					xtype: 'combobox',
					allowBlank: false,
					displayField: 'name',
					valueField: 'id',
					editable: false,				
					store: 'events_store',
					listeners: {
						change: {
							fn: function(elm, value) {
								var p = elm.up('window').getComponent('parameters');
								var rec = this.getStore().getById(value);
								if (rec) p.update( rec.get('parameters') );
									else p.update('');
							}
						}						
					}
				},			
				{
					fieldLabel: _('Активен'),
					name: 'active',
					xtype: 'checkboxfield'
				},	
				{
					itemId: 'gateway',
					fieldLabel: _('SMS шлюз'),
					name: 'gateway',
					xtype: 'combobox',
					allowBlank: false,
					displayField: 'name',
					valueField: 'class',
					editable: false,				
					store: {
						model: 'Plugin.sms.GatewayModel',
						autoLoad: true,
						autoSync: true			
					}
				},
				{
					fieldLabel: _('От кого'),
					name: 'message_from',
					allowBlank: false,
					listeners: {
						focus: function(elm) {
							elm.up('window').lastFocus = elm;
						}
					}
				},			
				{
					fieldLabel: _('Кому'),
					name: 'message_to',
					allowBlank: false,
					listeners: {
						focus: function(elm) {
							elm.up('window').lastFocus = elm;
						}
					}
				},					
				{
					fieldLabel: _('Сообщение'),
					name: 'message_text',
					allowBlank: false,
					xtype: 'textarea',
					height: 200,
					listeners: {
						focus: function(elm) {
							elm.up('window').lastFocus = elm;
						}
					}
				}
			],
			
			buttons: [
				{
					text    : _('OK'),
					handler : function() {
						var f = this.up('form').getForm();
						if (!f.isValid()) return;
						f.updateRecord();
						if (!f.getRecord().getId()) this.up('window').fireEvent('recordcreated', f.getRecord());
						this.up('window').destroy();
					}
				},{
					text    : _('Отмена'),
					handler : function() {
						this.up('window').destroy();
					}
				}
			]
		},
		{
			title: _('Параметры'),
			itemId: 'parameters',
			width: 300,
			data: null,
			padding: 5,
			bodyPadding: 5,	
			overflowY: 'auto',						
			tpl: [
				'<tpl foreach=".">', 
					'<p><a href="javascript:Ext.WindowManager.getActive().insertParameter(\'{{{$}}}\');"><b>{{{$}}}</b></a> {.}</p>', 
				'</tpl>'
			]
		}		
	],
	
    initComponent: function(){
		this.callParent();
		var evt = this.getComponent('form').getComponent('event');
		if (!this.record)
		{
			this.record = Ext.create('Plugin.sms.TemplateModel');
			evt.enable();
		}
		else
		{
			evt.disable();
		}
		this.getComponent('form').getForm().loadRecord( this.record );
	},
	
	insertParameter: function(value) {
		if (this.lastFocus)
		{
			this.insertAtCursor(this.lastFocus.inputEl.dom, value);
			this.lastFocus.focus();
		}
	},
	
	insertAtCursor: function(myField, myValue) { 

    	//IE support 
    	if (document.selection) { 
    		myField.focus(); 
    		sel = document.selection.createRange(); 
    		sel.text = myValue; 
    	}
    		//Mozilla/Firefox/Netscape 7+ support 
    	else if (myField.selectionStart || myField.selectionStart == '0'){  
    		var startPos = myField.selectionStart; 
    		var endPos = myField.selectionEnd; 
    		myField.value = myField.value.substring(0, startPos)+ myValue 
                 + myField.value.substring(endPos, myField.value.length); 
    		} else { 
    			myField.value += myValue; 
    		} 
	}	
	  
});     