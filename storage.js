// input alanından aldığımız bilgileri storage a ekleyeceğiz sonra sayfa yüklendiğinde bu bilgileri storage dan alıp
//arayüzde göstereceğiz

//storage class ının 2 tane statik fonsiyonu olacak
class Storage {
    static getSearchedUsersFromStorage(){
        //tüm kullanıcıları al
        let users;
        // let users dedik bir tane array oluturacağız ancak bu array storage da varsa bu array i bir tane key sayesinde
        // alacağız,yoksa bu array i boş bir şekilde oluşturacağız
        if(localStorage.getItem("searched") === null){
            users =[]

        }
        else{
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;

    }
    static addSearchedUsersToStorage(username){
        //kullanıcı ekle,eğer storage da eklenmek istenilen kişi ekliyse o kişiyi eklemeyeceğiz  
        let users =this.getSearchedUsersFromStorage();
        
        //ındexof
        if (users.indexOf(username) === -1){
                users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));
    }
    static clearAllSearchedUsersFromStorage(){
        //tüm kullanıcıları sil
        localStorage.removeItem("searched");
    }
}
