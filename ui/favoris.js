const favoris = {
    template: `
    <div class="favoris">
        <h1 class="titleFavoris">Favoris</h1>
        <div>
            <input type="checkbox" id="toggleFavorites" v-model="showOnlyFavorites">
            <label id="affFavoris" for="toggleFavorites">Afficher seulement les favoris</label>
        </div>
        <li v-for="contact in displayedContacts" :key="contact.id" class="itemFavoris">
            <input type="checkbox" v-model="selectedContacts" :value="contact.id" :checked="isFavori(contact.id)">
            <div @click="goToProfile(contact.id)" class="contactInfo">
                <img :src="contact.photo || './Photos/default-image-path.png'" alt="Profile" class="profile-img">
                <p>{{ contact.nom }} {{ contact.prenom }}</p>
            </div>
        </li>
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
            return this.showOnlyFavorites ?
                this.contacts.filter(contact => this.isFavori(contact.id)) :
                this.contacts;
        },
    },
    methods: {
        isFavori(contactId) {
            return this.contactGroupes.some(cg => cg.contact_id === contactId && cg.groupe_id === 1);
        },
        goToProfile(contactId) {
            this.$router.push(`/contact/${contactId}`);
        },
        saveFavorites() {
            this.contacts.forEach(contact => {
                const isFavori = this.isFavori(contact.id);
                const isSelected = this.selectedContacts.includes(contact.id);
        
                if (isSelected && !isFavori) {
                    // Ajouter aux favoris
                    const newFavorite = {
                        contact_id: contact.id,
                        groupe_id: 1,
                    };
                    axios.post('http://127.0.0.1:8000/contactgroupe/', JSON.stringify(newFavorite), {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(response => {
                        console.log('Contact ajouté aux favoris:', response.data);
                        // Recharger les données pour refléter les changements
                        this.loadContactsAndGroupes();
                    })
                    .catch(error => {
                        console.error('Erreur lors de l\'ajout aux favoris:', error);
                    });
                } else if (!isSelected && isFavori) {
                    // Retirer des favoris
                    const contactGroupeEntry = this.contactGroupes.find(cg => cg.contact_id === contact.id && cg.groupe_id === 1);
                    if (contactGroupeEntry) {
                        axios.delete(`http://127.0.0.1:8000/contactgroupe/${contactGroupeEntry.id}/`, {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        })
                        .then(response => {
                            console.log('Contact retiré des favoris:', response.data);
                            // Recharger les données pour refléter les changements
                            this.loadContactsAndGroupes();
                        })
                        .catch(error => {
                            console.error('Erreur lors de la suppression des favoris:', error);
                        });
                    }
                }
            });
        },
        loadContactsAndGroupes() {
            Promise.all([
                axios.get('http://127.0.0.1:8000/contact/'),
                axios.get('http://127.0.0.1:8000/contactgroupe/'),
            ]).then(([contactsResponse, contactGroupesResponse]) => {
                this.contacts = contactsResponse.data;
                this.contactGroupes = contactGroupesResponse.data;
                this.updateSelectedContactsBasedOnFavorites();
            }).catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
        },

                loadContactsAndGroupes() {
            Promise.all([
                axios.get('http://127.0.0.1:8000/contact'),
                axios.get('http://127.0.0.1:8000/contactgroupe'),
            ]).then(([contactsResponse, contactGroupesResponse]) => {
                this.contacts = contactsResponse.data;
                this.contactGroupes = contactGroupesResponse.data;
                this.updateSelectedContactsBasedOnFavorites();
            }).catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
        },
        updateSelectedContactsBasedOnFavorites() {
            this.selectedContacts = this.contacts
                .filter(contact => this.isFavori(contact.id))
                .map(contact => contact.id);
        }
    },
    mounted() {
        this.loadContactsAndGroupes();
    }
}
export default favoris;
