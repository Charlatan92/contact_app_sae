// Les imports des composants
import home from './home.js';
import contact from './contact.js';
import addContact from './addContact.js';
import favoris from './favoris.js';
import groupes from './groupes.js';
import doublons from './doublons.js';
import test from './test.js';

const routes = [
    { path: '/home', component: home },
    { path: '/contact/:id', component: contact }, // Utilisez ':id' pour correspondre à votre composant contact
    { path: '/addContact', component: addContact },
    { path: '/favoris', component: favoris },
    { path: '/groupes', component: groupes },
    { path: '/doublons', component: doublons },
    { path: '/test', component: test },
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')
