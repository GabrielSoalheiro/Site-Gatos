
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

$(".slider").owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000, //2000ms = 2s;
    autoplayHoverPause: true,
  });


  
  var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

  //Disable send button until connection is established
  document.getElementById("messageInput").disabled = true;
  document.getElementById("messageInput").value = null;
  

  connection.on("ReceiveMessage", function (user, message) {


    var li = document.createElement("li");
     var userP = document.querySelector(".info a small").textContent.trim().replace("\n","").split(" ")[0] + " " 
     + document.querySelector(".info a small").textContent.trim().replace("\n","").split(" ")[2] || ""

      li.classList.add("list-group-item")
    if (user == (userP)) {
      li.classList.add("list-group-item-success")
    }
    else{
            li.classList.add("list-group-item-primary")
    } 
    console.log(li)
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you
    // should be aware of possible script injection concerns.
    li.textContent = `${user}:   ${message}`;

  });


  connection.start().then(function () {
    document.getElementById("messageInput").disabled = false;
  }).catch(function (err) {
    return console.error(err.toString());
  });

  document.getElementById("messageInput").addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
      EnviarMensagem();
    }



  });


  document.querySelector("[enviarMsg]").addEventListener('click',()=>{

      EnviarMensagem();

  })

  function EnviarMensagem(){
    var message = document.getElementById("messageInput").value;
    var user =  document.querySelector(".info a small").textContent.trim().replace("\n","").split(" ")[0] + " " + document.querySelector(".info a small").textContent.trim().replace("\n","").split(" ")[2] || ""
    
    connection.invoke("SendMessage", user, message)
      .catch(function (err) {
        return console.error(err.toString());
      });
    document.querySelector("#messageInput").value = ""
  }

  DataTable("#TableUsuario","Lista",null,null,
  [
    { targets: [0], width: 16 }
],null,()=>{

  document.querySelectorAll("[addAmigo]")
  .forEach(o => o.addEventListener('click', (e) => {

    e.stopImmediatePropagation()

      bootbox.confirm({
          message: "Tem certeza que deseja adicionar este amigo? 🤔",
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

                  fetch("/Usuarios/AddAmigo", {
                      method: "POST",
                      body: formData
                  })
                      .then(o => o.json())
                      .then(result => {
                          if (result.success)
                              toastr.success("Amigo adicionado 😁")
                          else
                              toastr.info(result.message);

                      })
                      .finally(o=>{
                          setTimeout(o=>dialog.modal("hide"),500)   
                      })
              }




          }
      })


  }))

})