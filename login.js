import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js';

const url='https://vue3-course-api.hexschool.io/v2/';
const path='caiji_hexschool';

const app = {
    data(){
        return{
            user:{
                username:'',
                password:''
            },
            
        }
    },
    methods:{
        login(){
            axios.post(`${url}admin/signin`,this.user)
            .then((res) => {
                //console.log(res.data);
                
                const { token, expired } = res.data;
                //const token = res.data.token;
                //const expired = res.data.expired;
                //把token 和 expired 放入cookie
                document.cookie = `caijiToken=${token}; expires=${new Date(expired)}`;
                window.location='./products.html'
            })
            .catch((err) => {
                console.log(err);
                if(this.user.username=='' || this.user.password==''){
                    alert('請輸入帳號密碼');
                    return
                };
                alert('登入失敗');
                this.user.username='';
                this.user.password='';
            })
        }
    }
}

createApp(app).mount('#app');