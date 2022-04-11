// #region Consts
const getModal = (ActionName, contentSelector, formData, method, funcAfterLoad) => {

    fetch(`${window.location.pathname}/${ActionName}`, {
        method: method == null ? "POST" : method,
        body: formData
    }).then(result => result.text())
        .then(result => {
            let section = document.querySelector(contentSelector);
            section.innerHTML = result;
            $(".modal").modal("show");
            var $form = $('form');
            $.validator.unobtrusive.parse($form);
        })
        .finally(result => (funcAfterLoad == null ? () => { } : funcAfterLoad()))

}

const SendFecthRequest = (ActionName, method, data, successFunc, errorFunc, completeFunc) => {

    let url = !ActionName.includes("/") ? `${window.location.pathname}/${ActionName}` : ActionName
    fetch(url, {
        method: method,
        body: data,
    })
        .then(result => result.json())
        .then(successFunc == null ? () => { } : successFunc)
        .catch(errorFunc == null ? () => { } : errorFunc)
        .finally(completeFunc == null ? () => { } : completeFunc);

}


const DataTable = (selector, ActionName, completeFunc, data, columnsDef = null, rowcallback = null, drawcallback = null) => {
    return $(selector).DataTable({
        ajax: {
            url: `${window.location.pathname}/${ActionName}`,
            method: "GET",
            async: true,
            "data": data == null ? 
            function ( d ) {} : data,
            complete: completeFunc,
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
              buttons: [ 'copy', 'csv', 'print', 'excel', 'pdf' ]
            }
        ],
        rowCallback: rowcallback == null ? () => { } : rowcallback,
        "drawCallback": drawcallback == null ? () => { } : drawcallback,
        columnDefs: columnsDef == null ? {} : columnsDef
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

    });
}

// #endregion