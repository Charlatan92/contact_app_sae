const changeGroupes = {
    template: `
    <div class="changeGroupes">
        <h1 class="titleFavoris">Groupes</h1>
        <li v-for="contact in favoriteContacts" id="listeFavoris" :key="contact.id" @click="goToProfile(contact.id)">
            <input type="button" class="Champ">
            <img :src="contact.photo" alt="Profile" class="profile-img">
            <p>{{ contact.nom }} {{ contact.prenom }}</p>
        </li>
        <button id="But1"><a href="#/home">Retour</a></button>
    
        <button id="But2"><a href="#/changeContact">Modifier</a></button>
    </div>
    `,
    data() {
        return {
            contacts: [],  // Initialise le tableau des contacts
            favorites: [], // Initialise le tableau des favoris
            searchQuery: ''  // Initialise la requête de recherche
        };
    },
    computed: {
        favoriteContacts() {
            // Filtrer les contacts pour afficher uniquement les favoris
            return this.contacts.filter(contact => this.favorites.includes(contact.id));
        },
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
        // Charge les données du fichier JSON des contacts
        fetch('data/contacts.json')
            .then(response => response.json())
            .then(data => {
                this.contacts = data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });

        // Charge les données du fichier JSON des favoris
        fetch('data/favoris.json')
            .then(response => response.json())
            .then(data => {
                this.favorites = data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
    }
}
