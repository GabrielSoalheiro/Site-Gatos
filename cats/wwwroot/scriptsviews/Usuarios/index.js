DataTable("table", "Lista", null, null, null, null, () => LoadTableEvents())


function LoadTableEvents() {

    document.querySelectorAll("[delete],[edit],[view],[novoUsuario]")
        .forEach(o => {
            o?.addEventListener('click', (e) => {


                e.stopImmediatePropagation();

                let formData = new FormData()
                let btnid = e.target.getAttribute("data-id")
                let btnType = e.target.getAttributeNames()

                
                const SaveEdit = ()=>{
                    document.querySelector("#formEdit").addEventListener("submit", (e) => {
                        e.preventDefault();
                    if ($("#formEdit").valid()) {

                        let or = new FormData(document.querySelector("#formEdit"))
                        or.append("picture",document.querySelector("#foto").files[0])
                        
                        SendFecthRequest("Edit", "POST",
                        or, (e) => {

                            if (e.success){
                                toastr.success("Salvo! 😀")
                                document.querySelector("[btnClose]").click();
                                
                            }
                            else{
                                
                                if(typeof e.message != "undefined")
                                    toastr.error(e.message)
                                else
                                    toastr.info("Nome ou email já utilizado! 😅")
                            }

                        }, null, () => {
                            
                             $("table").DataTable().ajax.reload(null, false)
                        })

                       
                    }
                                              
                        })


                }


                if (btnType.includes("delete")) {
                    bootbox.confirm({
                        message: "Tem certeza que deseja remover este item ? 🤔",
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


                            formData.append("id", btnid)

                            if (result) {
                                SendFecthRequest("Deletar", "DELETE", formData, (response) => {

                                    if (response.result) {
                                        toastr.success("Registro removido! 😉")
                                        $("table").DataTable().ajax.reload(null, false);
                                    }
                                    else
                                        toastr.error("Um erro acontenceu! 😒")

                                })
                            }
                        }
                    })
                }
                else if (btnType.includes("novousuario")) {
                    formData.append("ModalName", "new");
                    getModal("GetModals", "[editModal]", formData, "POST", () =>  SaveEdit())
                }
                else if (btnType.includes('view')) {
                    formData.append("ModalName", "Details");
                    formData.append("id", btnid);

                    getModal("GetModals", "[editModal]", formData, "POST")
                }
                else{
                    
                    formData.append("ModalName", "Edit");
                    formData.append("id", btnid);

                    getModal("GetModals", "[editModal]", formData, "POST", () => SaveEdit() )
                }

            })
        })
}