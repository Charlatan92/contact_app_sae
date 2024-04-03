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
            <a href="#/groupes">
                <input type="button" value="Groupes" class="Champ" id="Groupes">
            </a>
            <hr>
            <a href="#/doublons">
                <input type="button" value="Doublons" class="Champ" id="Doublons">
            </a>
            <hr>
        </header>

        <li v-for="contact in filteredContacts" :key="contact.id" id="listeContact" @click="goToProfile(contact.id)">
            <input type="button" class="Champ">
            <img :src="contact.photo" alt="Profile" class="profile-img">
            <p>{{ contact.nom }} {{ contact.prenom }}</p>
        </li>
    </div>
    `,
    data() {
        return {
            contacts: [],
            searchQuery: '',
            showSortOptions: false
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
        fetch('data/contacts.json')
            .then(response => response.json())
            .then(data => {
                this.contacts = data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
    }
}
