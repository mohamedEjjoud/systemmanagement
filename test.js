// var kk =[ "blue" , "yellow" , "green" , "black" , "violet" ,"pink"]
// console.log(kk[Math.trunc(Math.random() * kk.length)]);



let form1= document.querySelector("#registrationForm")
form1.addEventListener("submit" , function(event){
    event.preventDefault()
    let name = document.querySelector("#name")
    let nameerror = document.querySelector("#nameError")
    nameerror.innerHTML=""
    try{
        if (!/^[A-z].{3,}$/.test(name.value))
            throw new Error("le nom doit contenu au moin 3 letter ")
            
    }

    catch(error){let kk = error.message
        if (kk.includes("nom")){
            nameerror.innerText=kk
        }

    }
    
})
// let form1 = document.querySelector("#registrationForm");
// form1.addEventListener("submit", function(event) {
//     event.preventDefault();

//     let name = document.querySelector("#name");
//     let nameerror = document.querySelector("#nameError");
//     nameerror.innerHTML = "";

//     try {
//         if (!/^[A-Za-z]{3,}$/.test(name.value.trim())) {
//             throw new Error("Le nom doit contenir au moins 3 lettres alphabétiques.");
//         }
//         alert("Nom valide !");
//     } catch (error) {
//         let kk = error.message;
//         if (kk.toLowerCase().includes("nom")) {
//             nameerror.innerText = kk;
//         }
//     }
// });
