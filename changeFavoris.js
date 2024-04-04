const changeFavoris = {
    template: `
    <div class="favoris">
        <h1 class="titleFavoris">Favoris</h1>
        <li v-for="contact in favoriteContacts" id="listeFavoris" :key="contact.id" @click="goToProfile(contact.id)">
            <input v-if="isEditMode" type="checkbox" v-model="selectedContacts" :value="contact.id" class="Champ">
            <img :src="contact.photo" alt="Profile" class="profile-img">
            <p>{{ contact.nom }} {{ contact.prenom }}</p>
        </li>
        <button v-if="!isEditMode" id="But1"><a href="#/home">Retour</a></button>
        <button v-else id="ButCancel" @click="cancelEdit">Annuler</button>
        <button v-if="!isEditMode" id="But2" @click="startEdit">Modifier</button>
        <button v-else id="ButDelete" @click="deleteSelected">Supprimer</button>
    </div>
    `,
    data() {
        return {
            contacts: [],  // Initialise le tableau des contacts
            favorites: [], // Initialise le tableau des favoris
            searchQuery: '',  // Initialise la requête de recherche
            isEditMode: false,
            selectedContacts: []
        };
    },
    computed: {
        favoriteContacts() {
            // Filtrer les contacts pour afficher uniquement les favoris
            return this.contacts.filter(contact => this.favorites.includes(contact.id));
        }
    },
    methods: {
        goToProfile(contactId) {
            // Redirige vers la page de détails du contact
            this.$router.push({ path: `/contact/${contactId}` });
        },
        startEdit() {
            this.isEditMode = true;
        },
        cancelEdit() {
            this.isEditMode = false;
            this.selectedContacts = [];
        },
        deleteSelected() {
            this.favorites = this.favorites.filter(id => !this.selectedContacts.includes(id));
            this.selectedContacts = [];
            this.isEditMode = false;
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
            }
        );
    }
}
