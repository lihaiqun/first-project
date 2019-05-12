;(function(){
    "use strict";
    
    class Tab{
        constructor(){
            this.dd = document.querySelectorAll("#tab dd");
            this.menu = document.querySelector("#tab .menu");
            this.choice = document.querySelector(".cltion .menu .choice");
            this.ul = document.querySelector(".cltion .menu .choice ul");
            this.li = this.ul.childNodes;
            this.url = "http://localhost/1902/lhqproject/data/list.json"
            this.addEvent();
        }
        addEvent(){
            let that = this;
            for(let i=0;i<this.dd.length;i++){
                this.dd[i].addEventListener("mouseover",function(){
                    that.index = i;
                    that.load();
                })
            this.ul.addEventListener("mouseleave",function(){
                that.hide();
            })
            }
        }
        load(){
            let that = this;
            ajax({
                url:this.url,
                success:function(res){
                    that.res = JSON.parse(res);
                    that.display();
                }
            })
        }
        hide(){
            for(let i=0;i<this.li.length;i++){
                this.li[i].style.display = "none";
            }
        }
        display(){
            let str = "";
            for(let i=0;i<this.res.length;i++){
                // console.log(this.res[i].first)
                this.second = this.res[i].second;
                let str2 = "";
                for(let j=0;j<this.second.length;j++){
                    str2 += `<a href="product.html">${this.second[j]}</a>`
                }
                str += `<li>
                            <h4><a href="product.html">${this.res[i].first}</a></h4>
                            <p id="second">${str2}</p>
                        </li>`
            }
            this.ul.innerHTML = str;
            this.show();
        }
        show(){
            this.li[this.index].style.display = "block"
        }
    }
    new Tab;

    class Banner{
        constructor(){
            $(".turn").banner({
                items:$(".turn").children(".imgbox").children("a"),
                left:$(".turn").find("#left"),
                right:$(".turn").find("#right")
            })
        }
    }
    new Banner;

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
                    str += `<li>
                                <a href="http://localhost/1902/lhqproject/detail.html">
                                    <img src="${this.res[i].url}">
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
})();


