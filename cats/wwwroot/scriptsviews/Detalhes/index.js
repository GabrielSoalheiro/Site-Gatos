

document.querySelector("[add]").addEventListener("click",(e)=>{

    e.stopPropagation();

    bootbox.confirm({
        message: "Deseja adicionar este item a sua lista ? 🤔",
        buttons: {
            confirm: {
                label: 'Sim',
                className: 'btn-success'
            },
            cancel: {
                label: 'Não',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            
            

            if(result){


                var dialog = bootbox.dialog({
                    message: '<p class="text-center mb-0"><i class="fa fa-spin fa-cog"></i> Loading...</p>',
                    closeButton: false
                });

                let formData = new FormData();
                formData.append("itemId", document.querySelector("#Id").value )
                formData.append("type", type)
                            
                            
              SendFecthRequest("AddList","POST",formData,(result)=>{
    
                if(result.success)
                    toastr.success("Item adicionado 😙 ")
                else
                    toastr.info(result.message);
    
              },null,()=>{
                  setTimeout(o=>dialog.modal("hide"),500)
              
              })
            }
    

        }
    });

    
})




document.addEventListener('keydown', function(e) {
	var key = e.key || e.keyCode;
	switch (key) {
		case 'ArrowLeft': case 37:
            document.querySelector("span[data-slide='prev']").click()
			break;
		case 'ArrowUp': case 38:
			alert('up');
			break;
		case 'ArrowRight': case 39:
            document.querySelector("span[data-slide='next']").click()
			break;
		case 'ArrowDown': case 40:
			alert('down');
			break;
	}
});