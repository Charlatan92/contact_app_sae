const home = {
    template: `
    <div class="home">
        <header>
            <h1 class="titleContact">Contacts</h1>

            <input type="text" placeholder="Rechercher" v-model="searchQuery" id="barreRecherche">
            <span v-if="searchQuery" class="clear-icon" @click="clearSearchQuery">&times;</span>

            <input type="button" value="" id="AddContact" @click="goToAddContact">
            <input type="button" value="" id="Parametres" @click="toggleSortOptions">

            <div v-if="showSortOptions" class="sort-options">
                <button @click="sortContacts('A-Z')" class="sort-button">Trier les contacts de A à Z</button>
                <button @click="sortContacts('Z-A')" class="sort-button">Trier les contacts de Z à A</button>
            </div>
            <hr>
            <a href="#/favoris">
                <input type="button" value="Favoris" class="Champ" id="Favoris">
            </a>
            <a href="#/groupesPage">
                <input type="button" value="Groupes" class="Champ" id="GroupesPage">
            </a>
            <hr>
        </header>

        <li v-for="contact in filteredContacts" :key="contact.id" id="listeContact" @click="goToProfile(contact.id)">
            <input type="button" class="inputContact">
            <!-- Modifier la source de l'image pour utiliser une image par défaut si aucune photo n'est définie -->
            <img :src="contact.photo || './Photos/default-image-path.png'" alt="Profile" class="profile-img-list">
            <p>{{ contact.nom }} {{ contact.prenom }}</p>
        </li>
    </div>
    `,
    data() {
        return {
            contacts: [],  // Initialise le tableau des contacts
            searchQuery: '',  // Initialise la requête de recherche
            showSortOptions: false // Ajouter cette propriété pour gérer l'affichage des options de tri
        };
    },
    computed: {
        filteredContacts() {
            return this.contacts.filter(contact => {
                return contact.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    contact.prenom.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        }
    },
    methods: {
        goToProfile(contactId) {
            this.$router.push({ path: `/contact/${contactId}` });
        },
        goToAddContact() {
            this.$router.push({ path: '/addContact' });
        },
        toggleSortOptions() {
            this.showSortOptions = !this.showSortOptions;
        },
        sortContacts(order) {
            if (order === 'A-Z') {
                this.contacts.sort((a, b) => a.nom.localeCompare(b.nom));
            } else if (order === 'Z-A') {
                this.contacts.sort((a, b) => b.nom.localeCompare(a.nom));
            }
            this.showSortOptions = false;
        },
        clearSearchQuery() {
            this.searchQuery = '';
        }
    },
    mounted() {
        axios.get('/contact')
            .then(response => {
                this.contacts = response.data; // Correction ici: utilisez `contacts` pour correspondre à votre data
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });    
    }
    
}

export default home;
