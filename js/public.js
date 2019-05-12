;(function(){
    "use strict";
    function createDate(){
        var d = new Date();
        
        var year = d.getFullYear()
        var month = d.getMonth()
        var date = d.getDate()
        var day = d.getDay()
    
        var h = d.getHours()
        var m = d.getMinutes()
        var s = d.getSeconds()
    
        switch(day){
            case 0:day = "星期日";break;
            case 1:day = "星期一";break;
            case 2:day = "星期二";break;
            case 3:day = "星期三";break;
            case 4:day = "星期四";break;
            case 5:day = "星期五";break;
            case 6:day = "星期六";break;
        }
    
        var str = year+"年"+createZero(month+1)+"月"+createZero(date)+" "+day+" "+createZero(h)+":"+createZero(m)+":"+createZero(s);
    
        return str;
    }
    
    function createZero(n){
        if(n<10){
            return "0"+n;
        }else{
            return n;
        }
    }
    
    function dateDiff(date1,date2){
        date2 = date2 ? new Date(date2) : new Date();
        date1 = new Date(date1);
        var t = Math.abs(date1 - date2);
    
        var day = parseInt(t/1000/60/60/24);
        var hours = parseInt((t - day*24*60*60*1000)/1000/60/60);
        var minutes = parseInt((t - day*24*60*60*1000 - hours*60*60*1000)/1000/60)
        var seconds = parseInt((t - day*24*60*60*1000 - hours*60*60*1000 - minutes*60*1000)/1000)
        
        return {
            day:day,
            hours:hours,
            minutes:minutes,
            seconds:seconds
        }
    }
    
    // 获取非行内样式
    function getStyle(ele,attr){
        if(ele.currentStyle){
            return ele.currentStyle[attr];
        }else{
            return getComputedStyle(ele,false)[attr];
        }
    }
    
    
    // 阻止事件冒泡
    function stopBubble(e){
        if(e.stopPropagation){
            e.stopPropagation()
        }else{
            e.cancelBubble = true;
        }
    }
    
    // 阻止默认行为
    function stopDefault(e){
        if(e.preventDefault){
            e.preventDefault()
        }else{
            e.returnValue = false;
        }
    }
    
    // 绑定事件
    function addEvents(ele,type,callback){
        if(ele.addEventListener){
            ele.addEventListener(type,callback,false)
        }else if(ele.attachEvent){
            ele.attachEvent("on"+type,callback)
        }else{
            ele["on"+type] = callback;
        } 
    }
    
    // 删除事件
    function removeEvent(ele,type,callback){
        if(ele.removeEventListener){
            ele.removeEventListener(type,callback,false)
        }else if(ele.detachEvent){
            ele.detachEvent("on"+type,callback)
        }else{
            ele["on"+type] = null;
        }
    }
    
    //键盘事件兼容
    // function Fn(eve){
    //     var code = e.keyCode || e.which;
    // }
    
    //事件委托
    function EveEnt(child,callback){
        return function(eve){
            var e = eve || window.event; //事件对象兼容
            var target = e.target || e.srcElement;  //事件目标兼容
            for(var i=0;i<child.length;i++){
                if(target === child[i]){
                    callback.bind(target)()//改变了原函数后执行
                }
            }
        }
    }
    
    //随机数
    function random(max,min){
        return Math.round(Math.random()*(max-min)+min);
    }
    
    //随机颜色
    function randomColor(){
        return `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`
    };
            
    class Search{
        constructor(){
            this.url = "http://localhost/1902/lhqproject/data/search.json";
            this.ul = document.getElementsByClassName("search-res")[0];
            this.txt = document.querySelector(".sea");
            this.addEvent()
        }
        addEvent(){
            let that = this;
            this.txt.onkeyup = function(){
                that.value = this.value
                that.ul.style.display = "block"
                that.load();
            }
        }
        load(){
            let str = "";
            let that = this;
            ajax({
                url:this.url,
                success:function(res){
                    that.res = JSON.parse(res);
                    for(let i=0;i<that.res.length;i++){
                        that.value = that.res[i].searchname;
                        for(let j=0;j<that.value.length;j++){
                            if(-1 != that.value[j].indexOf(that.txt.value) && that.txt.value != ""){
                                str += `<li>${that.value[j]}</li>`
                            }
                        }
                        that.display(str);
                    }
                }
            })
        }
        display(str){
            this.ul.innerHTML = str;
            this.list = this.ul.children;
            this.over();
        }
        over(){
            let that =this;
            for(let i=0;i<this.list.length;i++){
                this.list[i].index = i;
                this.list[i].onmouseover = function(){
                    that.index = this.index;
                    that.setAtive();
                    that.list[i].className = "";
                    this.className = "active"
                }
                this.list[i].onclick = function(){
                    that.txt.value = this.innerHTML;
                    that.ul.style.display = "none";
                    location.href = "product.html"
                }
            }
        }
        setAtive(){
            for(let j=0;j<this.list.length;j++){
                this.list[j].className = "";
            }
            this.list[this.index].className = "active";
        }
    }
    new Search;
        
    class toCar{
        constructor(){
            this.gocar = document.querySelector("#gocar")
            this.getData();
            this.init();
        }
        init(){
            let that = this;
            this.gocar.onclick = function(){
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
                if(this.username[i].onoff == 1){
                    location.href = "car.html"
                    return;
                }
                if(this.username[i].onoff == 0){
                    alert("请先登录")
                }
            }
        }
    }
    new toCar;

    class Index{
        constructor(){
            this.top = document.querySelectorAll(".top-l");
            this.span = document.querySelector("#dear");
            this.exit = document.getElementById("exit")
            this.getData();
            this.addEvent();
        }
        getData(){
            this.username = localStorage.getItem("username");
            if(this.username === null){
                this.username = [];
            }else{
                this.username = JSON.parse(this.username);
            }
            this.judge();
        }
        judge(){
            for(let i=0;i<this.username.length;i++){
                if(this.username[i].onoff == 1){
                    this.top[0].style.display = "none";
                    this.top[1].style.display = "flex";
                    this.span.innerHTML = this.username[i].user;
                    this.successName = this.username[i].user;
                    return;
                }
            }
            console.log(this.top)
            this.top[0].style.display = "flex";
            this.top[1].style.display = "none";
            this.span.innerHTML = "";
        }
        addEvent(){
            let that = this;
            this.exit.onclick = function(){
                if(that.successName){
                    for(var i=0;i<that.username.length;i++){
                        if(that.username[i].user === that.successName){
                            that.username[i].onoff = 0;
                            localStorage.setItem("username",JSON.stringify(that.username))
                            that.judge();
                        }
                    }
                }
            }
        }
    }
    new Index;
})();









