// Les imports des composants
import home from './home.js';
import contact from './contact.js';
import addContact from './addContact.js';
import addGroupe from './addGroupe.js';
import favoris from './favoris.js';
import groupesPage from './groupesPage.js';
import groupe from './groupe.js';
import test from './test.js';

const routes = [
    { path: '/home', component: home },
    { path: '/contact/:id', component: contact }, // Utilisez ':id' pour correspondre à votre composant contact
    { path: '/addContact', component: addContact },
    { path: '/addGroupe', component: addGroupe },
    { path: '/favoris', component: favoris },
    { path: '/groupe/:id', component: groupe },
    { path: '/groupesPage', component: groupesPage },
    { path: '/test', component: test },
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')
