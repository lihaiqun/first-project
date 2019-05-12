;(function(){
    "use strict";
    class Login{
        constructor(){
            this.btn = document.querySelector("#btn");
            this.user = document.querySelector(".user");
            this.pass = document.querySelector("#pass");
            this.span = document.querySelectorAll(".warning");
            console.log(this.span)
            this.init();
            this.getData();
        }
        init(){
            let that = this;
            this.btn.onclick = function(){
                that.checkin()
            }
        }
        getData(){
            this.username = localStorage.getItem("username");
            if(this.username == null){
                this.username = [];
            }else{
                this.username = JSON.parse(this.username);
            }
        }
        checkin(){
            for(let i=0;i<this.username.length;i++){
                if(this.username[i].user == this.user.value && this.username[i].pass == this.pass.value){
                    this.span[0].innerHTML ="登录成功，正在跳转";
                    this.span[1].innerHTML ="登录成功，正在跳转";

                    this.username[i].onoff=1;
                    localStorage.setItem("username",JSON.stringify(this.username));
                    setTimeout(()=>{
                        location.href = "index.html"
                    },1000);
                    return;
                }
            }
            this.span[0].innerHTML= "用户名密码不符";
            this.span[1].innerHTML= "用户名密码不符";
        }
        
    }
    new Login;
    
})();