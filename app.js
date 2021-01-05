//Elementleri seçme
const githubForm = document.getElementById("github-form")
const nameInput = document.getElementById("githubname")
const clearLastUsers = document.getElementById("clear-last-users")
const lastUsers =document.getElementById("last-users")
const github = new Github();
const ui = new UI();

eventListener();

function eventListener(){
    githubForm.addEventListener("submit",getData)
    clearLastUsers.addEventListener("click",clearAllSearhed)
    document.addEventListener("DOMContentLoaded",getAllSearched)//Son aramaları sayfa yenilendikçe storage dan alıp arayüze yazacağız

}
function getData(e){
        let username = nameInput.value.trim();

        if (username === ""){
            alert ("Lütfen geçerli bir kullanıcı girin!")
        }
        else{
            //username belli bir isme sahip demektir.O yüzden request atacağız
            github.getGithubData(username)//istedik ancak fonk. async old. için ve bize bir obje döneceği için bizim
            //bunu promise yapısı ile yakalamamız gerekiyor
            .then (response => {
                if (response.user.message === "Not Found"){
                    //hata mesajı
                    ui.showError("Kullanıcı Bulunamadı");

                }
                else{
                    ui.addSearchedUsersToStorage(username)

                    Storage.addSearchedUsersToStorage(username)
                    ui.showUserInfo(response.user)
                    ui.showRepoInfo(response.repo)
                }
            })
            //.then (response => console.log(response.repo))
            .catch(err =>ui.showError(err))
        }
        ui.clearInput();//input temizleme

        e.preventDefault();//sayfanın yenilenmesini önlemek için
}
function clearAllSearhed(){//Tüm arananları temizleme
        if (confirm("Emin misiniz?")){
            //silme
           Storage.clearAllSearchedUsersFromStorage();//Storage dan temizleme
           ui.clearAllSearchedFromUI();
        }
}
function getAllSearched(){//Aramaları Storagedan al ve ui ye ekle
     let users = Storage.getSearchedUsersFromStorage();

     let result = "";

     users.forEach(user =>{
         //<li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
         result += `<li class="list-group-item">${user}</li>`
     })
     lastUsers.innerHTML = result;
}
