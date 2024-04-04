const routes=[
    {path:'/home',component:home},
    {path:'/contact/:id', component: contact},
    {path:'/addContact',component:addContact},

    {path:'/favoris',component:favoris},
    {path:'/changeFavoris',component:changeFavoris},

    {path:'/groupes',component:groupes},
    {path:'/groupe/:id',component:groupeDetails},
    {path:'/changeGroupes',component:changeGroupes},

    {path:'/doublons',component:doublons},
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')

