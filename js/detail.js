;(function(){
    "use strict";
    
    // class Tab{
    //     constructor(){
    //         this.img = document.querySelectorAll(".smallimg img");
    //         console.log(this.img)
    //         this.menu = document.querySelector("#tab .menu");
    //         this.li = document.querySelectorAll(".cltion .menu .choice li");
    //         this.choice = document.querySelector(".cltion .menu .choice");
    //         this.ul = document.querySelector(".cltion .menu .choice ul");
    //         // this.addEvent();
    //     }
    //     addEvent(){
    //         let that = this;
    //         for(let i=0;i<this.img.length;i++){
    //             this.img[i].index = i;
    //             this.img[i].onmouseover = function(){
    //                 that.changeIndex(this.index)
    //             }
    //         }
    //         this.choice.onmouseout = function(){
    //             that.hide()
    //         }
    //     }
    //     changeIndex(index){
    //         this.index = index;
    //         this.hide();
    //         this.show();
    //     }
    //     hide(){
    //         for(let j=0;j<this.img.length;j++){
    //             this.li[j].style.display = "none";
    //         }
    //     }
    //     show(){
    //         this.li[this.index].style.display = "block";
    //     }
    // }
    // new Tab;
    
    class Goods{
        constructor(){
            this.url = "http://localhost/1902/lhqproject/data/product.json";
            this.title = document.querySelector(".paroductl .title");
            this.sbox = document.querySelector(".paroductl .s_box");
            this.bbox = document.querySelector(".paroductl .b_box");

            this.pricel = document.querySelector(".paroductl .pricel");
            this.load();

        }
        load(){
            let that = this;
            ajax({
                url:this.url,
                success:function(res){
                    that.res = JSON.parse(res);
                    that.display();
                    that.getItem();
                }
            })
        }
        getItem(){
            this.id = JSON.parse(localStorage.getItem("id"));
            localStorage.setItem("id",JSON.stringify(this.id))
            this.display();
        }
        display(){
            let str1 = "";
            let str2 = "";
            let str3 = "";
            let str4 = "";
            for(let i=0;i<this.res.length;i++){
                    if(this.res[i].id == this.id){
                        str1 += `<h3 index="this.id">${this.res[i].name}</h3>`
                        str2 += `<span>价 格 </span><span>${this.res[i].price}</span>`
                        str3 += `<img src="${this.res[i].url}"><span></span>`
                        str4 += `<img src="${this.res[i].url}">`
                    }
            }
            this.title.innerHTML = str1;
            this.pricel.innerHTML = str2;
            this.sbox.innerHTML = str3;
            this.bbox.innerHTML = str4;
            new Magnifier;
        }

    }
    new Goods;

    class Magnifier{
        constructor(){
            this.sBox = document.querySelector(".s_box");
            this.span = document.querySelector(".s_box span");
            this.bBox = document.querySelector(".b_box");
            this.bImg = document.querySelector(".b_box img");
            this.init();
        }
        init(){
            let that = this;
            this.sBox.onmouseover = function(){
                that.show();
                this.onmousemove = function(eve){
                    let e = eve || window.event;
                    that.move({x:e.pageX-this.offsetLeft,
                    y:e.pageY-this.offsetTop})
                }
            }
            this.sBox.onmouseout = function(){
                that.hide();
            }

        }
        hide(){
            this.span.style.display = "none";
            this.bBox.style.display = "none";
        }
        show(){
            this.span.style.display = "block";
            this.bBox.style.display = "block";
        }
        move(json){
            let l = json.x - this.span.offsetWidth/2;
            let t = json.y - this.span.offsetHeight/2;
            if(l<0){l=0};
            if(t<0){t=0};
            (l>this.sBox.offsetWidth-this.span.offsetWidth)&&(l=this.sBox.offsetWidth-this.span.offsetWidth);
            (t>this.sBox.offsetHeight-this.span.offsetHeight)&&(t=this.sBox.offsetHeight-this.span.offsetHeight);
            this.span.style.left = l + "px";
            this.span.style.top = t + "px";
            let x = l/(this.sBox.offsetWidth-this.span.offsetWidth);
            let y = t/(this.sBox.offsetHeight-this.span.offsetHeight);
            this.bImg.style.left = -x*(this.bImg.offsetWidth-this.bBox.offsetWidth)+"px";
            this.bImg.style.top = -y*(this.bImg.offsetHeight-this.bBox.offsetHeight)+"px";
        }
    }
    
})();



