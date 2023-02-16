import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js';

const url='https://vue3-course-api.hexschool.io/v2/';
const path='caiji_hexschool';

//取出cookie
const token = document.cookie.replace(/(?:(?:^|.*;\s*)caijiToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); 
//放入axios headers裡 每次發請求都夾帶cookie一起送出
axios.defaults.headers.common['Authorization'] = token;


const app ={
    data(){
        return{
            products:[],
            productTemplate:{}
        }
    },
    methods:{
        checkLogin(){
           
            axios.post(`${url}api/user/check`)
            .then((res) => {
                console.log(res);
                this.getProducts();
            })
            .catch((err) => {
                console.log(err);
                alert('登入錯誤');
                window.location='./login.html';
            })
        },
        getProducts(){
            axios.get(`${url}api/${path}/admin/products`)
            .then((res) => {
                console.log(res);
                this.products=res.data.products;
            })
            .catch((err) => {
                console.log(err);
            })
        },
        showProductTemplate(product){
            if(product.title==this.productTemplate.title){
                this.productTemplate={};
            }else{
                this.productTemplate=product;
            }
        }
    },
    mounted(){
        this.checkLogin();
    }
}

createApp(app).mount('#app');