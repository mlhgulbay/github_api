class Github{
    constructor(){
        this.url = "https://api.github.com/users/";
    }
    async getGithubData(username) {
        const responseUser = await fetch(this.url + username);//url e username i ekleyeceğiz ev bunun json ını almalıyız
        const responseRepo = await fetch(this.url + username + "/repos")//repos özelliklerinin bulunduğu array a ulaşmak için
        //buraya bir istek atacağız ve bize burası resolve ettiğinde response objemiz gelecek.Response objesinin json özelliğini alacağız
        //ve bunu bir değişkende tutacağız

        const userData = await  responseUser.json();
        const repoData = await responseRepo.json();

        return{
            user:userData,
            repo:repoData//Bizim user keyword una karşılık gelen değerimiz userData olsun,repoya karşılık gelen değerimiz ise 
            //repoData olsun,bunları bir obje olarak döndük
        }
    }
}