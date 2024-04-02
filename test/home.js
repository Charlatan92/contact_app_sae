    const home = {
    template: `
    <div class="home">
        <header>
            <h1 class="titleContact">Contacts</h1>
            <input type="text" placeholder="Rechercher" v-model="searchQuery" id="barreRecherche">
            <a href="#/addContact">
                <input type="button" value="" id="AddContact">
            </a>
            <input type="button" value="" id="Parametres">
            <hr> <!-- Ligne de séparation -->
            <a href="#/favoris">
                <input type="button" value="Favoris" class="Champ" id="Favoris">
            </a>
            <a href="#/groupes">
                <input type="button" value="Groupes" class="Champ" id="Groupes">
            </a>
            <hr> <!-- Ligne de séparation -->
            <a href="#/doublons">
                <input type="button" value="Doublons" class="Champ" id="Doublons">
            </a>
            <hr> <!-- Ligne de séparation -->
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
            contacts: [],  // Initialise le tableau des contacts
            searchQuery: ''  // Initialise la requête de recherche
        };
    },
    computed: {
        filteredContacts() {
            // Filtrer les contacts en fonction de la recherche
            return this.contacts.filter(contact => {
                return contact.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                       contact.prenom.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        }
    },
    methods: {
        goToProfile(contactId) {
            // Redirige vers la page de détails du contact
            this.$router.push({ path: `/contact/${contactId}` });
        }
    },
    mounted() {
        // Charge les données du fichier JSON
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