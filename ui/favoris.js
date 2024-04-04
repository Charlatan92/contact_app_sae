const favoris = {
    template: `
    <div class="favoris">
        <h1 class="titleFavoris">Favoris</h1>
        <div>
            <input type="checkbox" id="toggleFavorites" v-model="showOnlyFavorites">
            <label for="toggleFavorites">Afficher seulement les favoris</label>
        </div>
        <ul>
            <li v-for="contact in displayedContacts" :key="contact.id" class="itemFavoris">
                <input type="checkbox" v-model="selectedContacts" :value="contact.id">
                <div @click="goToProfile(contact.id)" class="contactInfo">
                    <img :src="contact.photo || 'CSS/Images/defaultImage.png'" alt="Profile" class="profile-img">
                    <p>{{ contact.nom }} {{ contact.prenom }}</p>
                </div>
            </li>
        </ul>
        <button id="But1"><a href="#/home">Retour</a></button>
        <button @click="saveFavorites">Enregistrer</button>
    </div>
    `,
    data() {
        return {
            contacts: [],
            contactGroupes: [],
            selectedContacts: [],
            showOnlyFavorites: false,
        };
    },
    computed: {
        displayedContacts() {
            if (this.showOnlyFavorites) {
                const favoriContactIds = this.contactGroupes
                    .filter(cg => cg.groupe_id === 1)
                    .map(cg => cg.contact_id);

                return this.contacts.filter(contact => favoriContactIds.includes(contact.id));
            } else {
                return this.contacts;
            }
        },
    },
    methods: {
        goToProfile(contactId) {
            this.$router.push(`/contact/${contactId}`);
        },
        saveFavorites() {
            // La logique d'enregistrement des favoris
            console.log('Saving favorites:', this.selectedContacts);
        },
        loadContacts() {
            axios.get('http://127.0.0.1:8000/contact')
                .then(response => {
                    this.contacts = response.data;
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des contacts:', error);
                });
        },
        loadContactGroupes() {
            axios.get('http://127.0.0.1:8000/contactgroupe')
                .then(response => {
                    this.contactGroupes = response.data;
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des groupes de contacts:', error);
                });
        }
    },
    mounted() {
        this.loadContacts();
        this.loadContactGroupes();
    }
}
export default favoris;
