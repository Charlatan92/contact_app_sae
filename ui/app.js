const routes=[
    {path:'/home',component:home},
    {path:'/contact/:id', component: contact},
    {path:'/addContact',component:addContact},
    {path:'/favoris',component:favoris},
    {path:'/groupes',component:groupes},
    {path:'/doublons',component:doublons},
    {path:'/test',component:test},
    {path:'/aaa',component:aaa},
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')

