let closeIcon = document.getElementById("close");
let menuIcon = document.querySelector(".fa-bars");

menuList.style.maxHeight = "0px";

function toggleMenu() {
    if (menuList.style.maxHeight === "0px") {
        menuList.style.maxHeight = "450px";
        menuIcon.style.display = "none";
        closeIcon.style.display = "inline";
    } else {
        menuList.style.maxHeight = "0px";
        menuIcon.style.display = "inline";
        closeIcon.style.display = "none"; 
    }
}



class Carousel {


    constructor(element, options = {}){
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 3,
            loop: false,
             
        }, options);
        let children = [].slice.call (element.children);
        this.isMobile = false;
        this.currentItem = 0;
        this.root = this.createDivWithClass('carousel');
        this.container = this.createDivWithClass('carousel__container');
        this.root.setAttribute('tabindex', '0')
        this.root.appendChild(this.container); 
        this.element.appendChild(this.root);
        this.moveCallbacks = [];
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item');
            item.appendChild(child)
            this.container.appendChild(item);
            return item;
        }) 
        this.setStyle();
        this.createNavigation();
        this.moveCallbacks.forEach(cb => cb(0));
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.root.addEventListener('keyup', e => {
            if (e.key === 'ArrowRight'){
                this.next();
            } else if (e.key === 'ArrowLeft'){
                this.prev();
            }
        })
    }


    setStyle (){
        let ratio = this.items.length / this.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%")
    }

    createNavigation () {
        let nextButton = document.querySelector('.carousel__next');
        let prevButton = document.querySelector('.carousel__prev');
        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));
        if (this.options.loop === true) {
            return;
        }
        this.onMove(index => {
            if (index === 0) {
                prevButton.classList.add('.carousel__prev--hidden');
            } else {
                prevButton.classList.remove('.carousel__prev--hidden');
            }
            if ((this.items[this.currentItem + this.slidesVisible] === undefined)){

                nextButton.classList.add('carousel__next--hidden');
            } else {

                nextButton.classList.remove('carousel__next--hidden');

            }
        })
        
       

    }
 
    next() {
       this.gotoItem(this.currentItem + this.slidesToScroll);
    }

    prev() {
        this.gotoItem(this.currentItem - this.slidesToScroll);
    }

    gotoItem (index) {
        
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible;
        } else if (index >= this.items.length || (this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem)) {
            index = 0;
        }
        let translateX = index * -100 / this.items.length;
        this.container.style.transform = 'translate3d(' + translateX + '%, 0 ,0)';
        this.currentItem = index;
        this.moveCallbacks.forEach(cb => cb(index));
    }

    onMove(cb) {
        this.moveCallbacks.push(cb);
    }

    onWindowResize() {
        let mobile = window.innerWidth < 800;

        if (mobile !== this.isMobile) {
            this.isMobile = mobile; // Update mobile state
            this.setStyle(); // Reapply styles
            this.gotoItem(this.currentItem); // Reposition items
            this.moveCallbacks.forEach(cb => cb(this.currentItem)); // Trigger callbacks
        }
    }


    createDivWithClass (className){
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
    }

    get slidesToScroll () {
        return this.isMobile ? 1 : this.options.slidesToScroll;
    }

    get slidesVisible () {
        return this.isMobile ? 1 : this.options.slidesVisible;
    }
}


document.addEventListener('DOMContentLoaded', function(){

    new Carousel(document.querySelector('#carousel1'), {
        slidesVisible: 3,
        slidesToScroll: 1,
        loop:true,
    })
})
