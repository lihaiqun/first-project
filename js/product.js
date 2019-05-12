;(function(){
    "use strict";
 
    class Product{
        constructor(json){
            this.url = json.url;
            this.list = json.list;
            this.left = json.left;
            this.right = json.right;
            this.num = json.num;
            this.index = json.index;
            this.page = json.page;
            this.load();
            this.addEvent();
        }
        load(){
            let that =this;
            ajax({
                url:this.url,
                success:function(res){
                    that.res = JSON.parse(res);
                    that.display();
                    that.createPage();
                    that.setActive();
                }
            })
        }
        display(){
            let str = "";
            for(let i=this.num*this.index;i<this.num*this.index+this.num;i++){
                if(i<this.res.length){
                    str += `<li index="${this.res[i].id}">
                    <a href="detail.html">
                                    <img src="${this.res[i].url}" id="pgoods">
                                    <div class="info">
                                        <span>${this.res[i].name}</span>
                                        <p class="price">
                                            <span>${this.res[i].price}</span>
                                        </p>
                                        <p class="shopname"><span>${this.res[i].shop}</span><span>${this.res[i].tip}</span></p>
                                    </div>
                                </a>
                            </li>`
                }
            }
            this.list.innerHTML = str;
        }
        createPage(){
            this.maxPage = Math.ceil(this.res.length/this.num);
            let str = "";
            for(let i=0;i<this.maxPage;i++){
                str += `<li>${i+1}</li>`
            }
            this.page.innerHTML = str;
        }
        addEvent(){
            let that = this;
            this.left.onclick = function(){
                that.changeIndex(1);
            }
            this.right.onclick = function(){
                that.changeIndex(2);
            }
            this.list.addEventListener("click",function(eve){
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                if(target.id == "pgoods"){
                    that.id = target.parentNode.parentNode.getAttribute("index");
                    console.log(that.id);
                }
                that.setItem();
            })
        }
        setItem(){
            this.goods = localStorage.getItem("goods");
            console.log(this.goods);
            if(this.goods == null){
                this.goods = [{
                    id:this.id,
                    num:1
                }]
            }else{
                this.goods = JSON.parse(this.goods);
                let onoff = true;
                for(let i=0;i<this.goods.length;i++){
                    if(this.goods[i].id == this.id){
                        this.goods[i].num++;
                        onoff = false;
                    }
                }
                if(onoff){
                    this.goods.push({
                        id:this.id,
                        num:1
                    })
                }
            }
            localStorage.setItem("goods",JSON.stringify(this.goods));
            for(let i=0;i<this.goods.length;i++){
                localStorage.setItem("id",JSON.stringify(this.goods[i].id));
            }
            console.log(JSON.stringify(this.goods))
        }
        changeIndex(type){
            if(type==1){
                if(this.index == 0){
                    this.index = this.maxPage-1;
                }else{
                    this.index--;
                }
                this.display();
                this.setActive();
            }else{
                if(this.index == this.maxPage-1){
                    this.index = 0;
                }else{
                    this.index++;
                }
            }
            this.display();
            this.setActive();
        }
        setActive(){
            for(let i=0;i<this.page.children.length;i++){
                this.page.children[i].className = "";
            }
            this.page.children[this.index].className = "active"
        }
    }
    new Product({
        url:"http://localhost/1902/lhqproject/data/product.json",
        list:document.getElementById("plist"),
        page:document.getElementById("page"),
        left:document.getElementById("btnL"),
        right:document.getElementById("btnR"),
        num:10,
        index:0
    });

    // class Goods{
    //     constructor(){

    //     }
    // }
 
})();



