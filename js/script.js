var tableCustomer = [
	{ id:1, name:"Иван", surname:"Иванов"},
	{ id:2, name:"Петр", surname:"Петров"},
	{ id:3, name:"Алексей", surname:"Алексеев"},
	{ id:4, name:"Павел", surname:"Павлович"},
	 
];
var addCustomerWindow = webix.ui({
    view:"window",
    id:"myWin",
    head:"Add or Update Customer",	 
    width: 400,
    height: 300,
    body:{
        rows: [
			{  
				cols:[
			{view:"form", id:"myform", elements:[
				{ view:"fieldset",     label:"Добвать или изменить запись",
    				body:{
        				rows:[						 
          				 { view:"text", name:"name", placeholder:"Name", width:180, align:"center"}, 
		 				 { view:"text", name:"surname", placeholder:"Surname", width:180, align:"center"},
						 {cols:[
							{ view:"button", value:"Add", width:60, click:"AddCustomer"},
							{ view:"button", value:"Update", width:60, click:"update_row"},
							{ view:"button", value:"Cancel", width:60, click:"HideAddUpdateWindow" }
						 ]} 
       				 		],
								 
    					}
				}

				 ]},
			 
			 
		]
		}
		] 
    }
});

 


var myTable = webix.ui({
	rows: [
		{ view:"toolbar", id:"mybar", elements:[
			{ view:"button", value:"Add or Update", width:140, click:"ShowAddUpdateWindow"},
			{ view:"button", value:"Delete", width:70, click:"delete_row"}
			 ]
		},
		{ cols:[			 
			{
				view:"list", 
				id:"mylist",
				template:"ID: #id#   #name# #surname#", 
				select:true,  
				height:400,
				data: tableCustomer
			}		 
		]}
	]
}); 
function ShowAddUpdateWindow(){	
	addCustomerWindow.show({ x:300, y:50  });
}
 function HideAddUpdateWindow(){	
	addCustomerWindow.hide();
}
function AddCustomer(){
	  tableCustomer.push({
		name: $$("myform").getValues().name,
		surname: $$("myform").getValues().surname,
		 id:   tableCustomer.length + 1
	});
	$$("mylist").add({
		name: $$("myform").getValues().name,
		surname: $$("myform").getValues().surname,
		 id:   tableCustomer.length + 1
	});
	 $$("myform").clear();
	 
	 
}
function delete_row() {
	var id = $$("mylist").getSelectedId();
	
	webix.confirm({
		title: "Удалить", 
		text: "Вы действительно хотите удалить запись в таблице?",
		callback: function(result) { 
		if (result) {
			$$("mylist").remove(id);
			} 
		}
	});
}

$$("mylist").attachEvent("onAfterSelect", function(id){
	$$("myform").setValues({
		name: $$("mylist").getItem(id).name,
		surname: $$("mylist").getItem(id).surname 
	});
});

function update_row() { 
	var id = $$("mylist").getSelectedId();			
	var value1 = $$("myform").getValues().name;
	var value2 = $$("myform").getValues().surname;	
	var item = $$("mylist").getItem(id);  
	item.name = value1;
	item.surname = value2;
	$$("mylist").updateItem(id, item);
	addCustomerWindow.hide();
}

 