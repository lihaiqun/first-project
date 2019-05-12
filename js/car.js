;(function(){
    "use strict";
    class Car{
        constructor(){
            this.checkin = document.querySelector(".checkin");
            // this.seleall = document.querySelectorAll(".checkAllProduct");
            this.sumprice = document.querySelector(".sumprice");
            this.url = "http://localhost/1902/lhqproject/data/product.json";
            this.load();
            this.addEvent();
            
        }
        load(){
            let that = this;
            ajax({
                url:this.url,
                success:function(res){
                    that.res = JSON.parse(res);
                    that.getItem();
                }
            })
        }
        getItem(){
            this.goods = localStorage.getItem("goods") == "" ? [] : JSON.parse(localStorage.getItem("goods"));
            this.display();
        }
        display(){
            let str = "";
            let sum = 0;
            let unit = 0;
            for(let i=0;i<this.res.length;i++){
                for(let j=0;j<this.goods.length;j++){
                    if(this.goods[j].id == this.res[i].id){
                        unit=(this.res[i].price.slice(2)*this.goods[j].num).toFixed(2);
                        str += `<ul class="clear" index="${this.goods[j].id}">
                                    <li><input type="checkbox" class="checkAllProduct">
                                        <a href="detail.html" id="carimg">
                                            <img src="${this.res[i].url}">
                                        </a></li>
                                    <li><a href="detail.html">${this.res[i].name}</a></li>
                                    <li><span>≥1盘：<b id="unitprice">${this.res[i].price}</b></span></li>
                                    <li>
                                        <input type="number" min="1" class="add" id="quantity" value="${this.goods[j].num}">
                                    </li>
                                    <li>${"￥"+unit}</li>
                                    <li><em class="del">删除</em></li>
                                </ul>`
                        sum += Number(unit)
                    }
                }
            }
            this.checkin.innerHTML = str;
            this.sumprice.innerHTML = sum.toFixed(2);
        }
        addEvent(){
            this.seleall = document.querySelectorAll(".checkAllProduct");        
            let that = this;
            this.checkin.addEventListener("input",function(eve){
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                if(target.className == "add"){
                    that.id = target.parentNode.parentNode.getAttribute("index");
                    that.num = target.value;
                    that.setItem(function(i){
                        that.goods[i].num = that.num;
                    })
                }
                that.display()
            })
            this.checkin.addEventListener("click",function(eve){
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                if(target.className == "del"){
                    that.id = target.parentNode.parentNode.getAttribute("index");
                    target.parentNode.parentNode.remove();
                    that.setItem(function(i){
                        localStorage.removeItem(JSON.stringify(that.goods.splice(i,1)));
                    })
                }
            })

            this.seleall[0].addEventListener("click",function(){
                if(that.seleall[0].getAttribute("checked") == "checked"){
                    console.log(that.seleall)
                    for(let i=0;i<that.seleall.length;i++){
                        that.seleall[i].removeAttribute("checked");
                    }
                }else{
                    for(let i=0;i<that.seleall.length;i++){
                        that.seleall[i].setAttribute("checked","checked");
                    }
                }
                that.display();
            });
        }
        setItem(callback){
            for(var i=0;i<this.goods.length;i++){
                if(this.id == this.goods[i].id){
                   callback(i);
                }
                localStorage.setItem("goods",JSON.stringify(this.goods))
            }
        }
    }
    new Car;

    class Sumbuy{
        constructor(){
            this.seleall = document.querySelectorAll(".checkAllProduct");
            this.unitprice = document.querySelector("#unitprice");
            this.quantity = document.querySelector("#quantity");
            this.sumprice = document.querySelectorAll(".sumprice");
            this.add = document.querySelector(".add");
            this.checkin = document.querySelector(".checkin");
            this.quan = parseFloat(this.quantity.value);
            this.unit = parseFloat(this.unitprice.innerHTML.slice(2));
            this.addEvent();
            this.load();
        }
        load(){
            let that = this;
            ajax({
                url:this.url,
                success:function(res){
                    console.log(res)
                    that.res = JSON.parse(res);
                    that.getPrice();
                }
            })
        }
        addEvent(){
            let that = this;
            this.seleall[0].addEventListener("click",function(){
                if(that.seleall[0].getAttribute("checked") == "checked"){
                    for(let i=0;i<that.seleall.length;i++){
                        that.seleall[i].removeAttribute("checked");
                    }
                }else{
                    for(let i=0;i<that.seleall.length;i++){
                        that.seleall[i].setAttribute("checked","checked");
                    }
                }
                that.calculate();
            });
            
        }
        calculate(){
            this.sumprice[this.sumprice.length-1].innerHTML = parseFloat(this.quan * this.unit,2);
            console.log(this.sumprice[this.sumprice.length-1])
            this.sumprice[0].innerHTML = "￥"+ parseFloat(this.quan * this.unit,2);
        }
        calculatetoo(){
            let that = this;
            this.checkin.addEventListener("input",function(eve){
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                that.sumprice[0].innerHTML = "￥"+ parseFloat(that.num * that.unit,2);
            })
        }
        getPrice(){
            this.goods = localStorage.getItem("goods") == "" ? [] : JSON.parse(localStorage.getItem("goods"));
            for(var i=0;i<this.goods.length;i++){
                this.num = Number(this.goods[i].num);
                //this.calculatetoo();
            }
        }

    }
})();