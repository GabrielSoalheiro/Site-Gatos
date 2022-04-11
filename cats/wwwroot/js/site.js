// // // Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// // // for details on configuring this project to bundle and minify static web assets.

// // // Write your JavaScript code.
// // document.
// // querySelector('nav.main-header').
// // addEventListener('click',()=>{

// //     if(document.querySelector(".navbar-search-block[display:none]").length>0){
// //         document.querySelector("a[data-widget='navbar-search']").click()

// //     }

// // })

// $(function(){


//     debugger;
//     var url = window.location.pathname, 
//         urlRegExp = new RegExp(url.replace(/\/$/,'') + "$"); // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there
//         // now grab every link from the navigation
//         $('.menu a').each(function(){
//             // and test its normalized href against the url pathname regexp
//             if(urlRegExp.test(this.href.replace(/\/$/,''))){
//                 $(this).addClass('active');
//             }
//         });


// });
