$("#TableUsuario").DataTable({
    ajax: {
        url: `/Usuarios/Amigos`,
        method: "GET",
        async: true,
    },
    width: 100,
    "pageLength": 10,
    /*        dom: 'Bfrtip',*/
    buttons: [
        {
            extend: 'collection',
            autoClose: 'true',
            text: '',
            tag: 'span',
            className: "fa fa-download",
            buttons: ['copy', 'csv', 'print', 'excel', 'pdf']
        }
    ],
    "drawCallback": () => {
        
        document.querySelectorAll("[delete]")
        .forEach(o=> o.addEventListener('click',(e)=>{
            
            e.stopImmediatePropagation()

            bootbox.confirm({
                message: "Tem certeza que deseja deletar este amigo? 😥",
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
      
                    if (result) {
                        let formData = new FormData();
                        formData.append("AmigoId", 
                        e.target.getAttribute("addamigo"))
      
                        var dialog = bootbox.dialog({
                            message: '<p class="text-center mb-0"><i class="fa fa-spin fa-cog"></i> Loading...</p>',
                            closeButton: false
                        });
      
                        fetch("/Usuarios/DeletarAmigo", {
                            method: "DELETE",
                            body: formData
                        })
                            .then(o => o.json())
                            .then(result => {
                                if (result.success)
                                    toastr.success("Amigo Excluido! 😕")
                                else
                                    toastr.info(result.message);
      
                            })
                            .finally(o=>{
                                setTimeout(o=>dialog.modal("hide"),500)   
                                $("#TableUsuario").DataTable().ajax.reload(null,false)
                            })
                    }
      
      
      
      
                }
            })

        }));

        
        document.querySelectorAll("[view]")
        .forEach(o=> o.addEventListener('click',(e)=>{
            e.stopPropagation();
            window.open(window.location.origin+`/ListaUsuario?AmigoId=${e.target.getAttribute("addAmigo")}`,"_self");

        }))

     
    },
    columnDefs: [
        { targets: [0], width: 15 },
    ], 
    // language: {
    //     "decimal": "",
    //     "emptyTable": "No hay información",
    //     "info": "Mostrando _START_ a _END_ de _TOTAL_ Documentos",
    //     "infoEmpty": "Mostrando 0 to 0 of 0 Documentos",
    //     "infoFiltered": "(Filtrado de _MAX_ total entradas)",
    //     "infoPostFix": "",
    //     "thousands": ",",
    //     "lengthMenu": "Mostrar _MENU_ Documentos",
    //     "loadingRecords": "Cargando...",
    //     "processing": "Procesando...",
    //     "search": "Buscar:",
    //     "zeroRecords": "Sin resultados encontrados",
    //     "paginate": {
    //         "first": "Primero",
    //         "last": "Ultimo",
    //         "next": "Siguiente",
    //         "previous": "Anterior"
    //     }
    // },

})

