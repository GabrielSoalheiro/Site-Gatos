
DataTable("table", "Lista", null,
    function (d) {
            d.FiltrarGenero = document.querySelector("#FiltrarGenero").value,
            d.MostrarPor = document.querySelector("#mostrarpor").value,
            d.Status = document.querySelector("#status").value
            d.AmigoId = AmigoId
    }, [
    { targets: [5], width: 15 },
    { targets: [0], width: 15 },
    { targets: [3], width: 100 },
    { targets: [7], width: "20%" },

], (row, data) => {

    let item = [...row.children[3].children]
    let rating = item[0].getAttribute("preenchido")

    for (var i = 0; i < rating; i++)
        item[i].classList.add("checked")

}, () => LoadTableEvents())


function LoadTableEvents() {

    document.querySelectorAll("[delete],[edit],[view]")
        .forEach(o => {
            o?.addEventListener('click', (e) => {

                e.stopImmediatePropagation()


                let formData = new FormData()
                let btnid = e.target.getAttribute("data-id")
                let btnType = e.target.getAttributeNames()


                if (btnType.includes('view')) {
                    formData.append("ModalName", "Details");
                    formData.append("id", btnid);

                    getModal("GetModals", "[editModal]", formData, "POST")
                }
                else if (btnType.includes('edit')) {

                    formData.append("ModalName", "Edit");
                    formData.append("id", btnid);

                    getModal("GetModals", "[editModal]", formData, "POST", () => {

                        document.querySelector("[saveEdit]").addEventListener('click', (e) => {

                            e.preventDefault();

                            SendFecthRequest("Editar", "PUT", new FormData(document.querySelector("#FormEdit")), (result) => {

                                if (result.result) {
                                    toastr.success("Registro Alterado! 😉")
                                    $("table").DataTable().ajax.reload(null, false);
                                }
                                else {
                                    toastr.error("Um erro aconteceu! 😒")
                                }

                            })

                        })
                    })
                }
                else {
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

            })
        })

}

$(".filtros").on('change', () => $("table").DataTable().ajax.reload(null,false) )

document.querySelector("[clearFilters]")
    .addEventListener('click', () => $(".filtros").val(null).trigger('change'))

