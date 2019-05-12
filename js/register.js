;(function(){
    "use strict";
    
    class Register{
        constructor(){
            this.user = document.getElementById("user");
            this.pass = document.getElementById("pass");
            this.btn = document.getElementById("free");
            this.span = document.querySelector(".checkreg");
            this.gologin = document.getElementById("gologin");
            this.init();
            this.getData();

        }
        init(){
            let that = this;
            this.btn.onclick = function(){
                that.setData();
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
        setData(){
            if(this.username.length == 0){
                this.username.push({
                    user:this.user.value,
                    pass:this.pass.value,
                    onoff:0
                })
                this.span.innerHTML = "注册成功";
                localStorage.setItem("username",JSON.stringify(this.username));
            }else{
                for(let i=0;i<this.username.length;i++){
                    if(this.user.value == this.username[i].user){
                        this.span.innerHTML = "已被注册";
                        return;
                    }
                }
                this.username.push({
                    user:this.user.value,
                    pass:this.pass.value,
                    onoff:0
                })
                this.span.innerHTML = "注册成功";
                localStorage.setItem("username",JSON.stringify(this.username));
            }
            this.addEvent();
        }
        addEvent(){
            let that = this;
            this.gologin.onclick = function(){
                console.log(1)
                if(that.span.innerHTML == "注册成功"){
                    setTimeout(()=>{
                        location.href = "login.html";
                    },1000)
                }
            }
        }
    }
    new Register;

})();