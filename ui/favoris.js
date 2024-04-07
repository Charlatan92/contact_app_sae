const favoris = {
    template: `
    <div class="favoris">
        <h1 class="titleFavoris">Favoris</h1>
        <div id="onlyfav">
            <label id="affFavoris" for="toggleFavorites">
                {{ showOnlyFavorites ? 'Afficher tous les contacts' : 'Afficher seulement les favoris' }}
                <input type="checkbox" id="toggleFavorites" v-model="showOnlyFavorites">
            </label>
        </div>
        <div>
            <li v-for="contact in displayedContacts" :key="contact.id" id="listeFavoris">
                <input type="checkbox" v-model="selectedContacts" :value="contact.id">
                <div @click="goToProfile(contact.id)" class="contactInfo">
                    <img :src="contact.photo || './Photos/default-image-path.png'" alt="Profile" class="profile-img">
                    <p>{{ contact.nom }} {{ contact.prenom }}</p>
                </div>
            </li>
        </div>
        <button id="But1"><a href="#/home">Retour</a></button>
        <button @click="saveFavorites">Enregistrer</button>
    </div>
    `,
    data() {
        return {
            contacts: [],
            contactGroupes: [],
            selectedContacts: [],
            showOnlyFavorites: true, // Modifier ici pour être par défaut à true
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
            const promises = [];
            
            // Assurez-vous que les contacts sélectionnés sont sous forme d'entiers et non de chaînes
            const selectedContacts = this.selectedContacts.map(Number);
        
            // Pour chaque contact sélectionné, ajouter ou supprimer des favoris
            this.contacts.forEach(contact => {
                const isSelected = selectedContacts.includes(contact.id);
                const isFavori = this.isFavori(contact.id);
        
                if (isSelected && !isFavori) {
                    // Si le contact est sélectionné mais pas encore favori, l'ajouter
                    const newFavorite = {
                        contact_id: contact.id,
                        groupe_id: 1,
                    };
                    promises.push(axios.post('http://127.0.0.1:8000/contactgroupe/', newFavorite));
                } else if (!isSelected && isFavori) {
                    // Si le contact est actuellement un favori mais n'est pas sélectionné, le supprimer
                    const contactGroupeEntry = this.contactGroupes.find(cg => cg.contact_id === contact.id && cg.groupe_id === 1);
                    if (contactGroupeEntry) {
                        promises.push(axios.delete(`http://127.0.0.1:8000/contactgroupe/${contactGroupeEntry.id}/`));
                    }
                }
            });
        
            Promise.all(promises).then(() => {
                alert('Favoris mis à jour avec succès');
                this.loadContactsAndGroupes();
            }).catch(error => {
                console.error('Erreur lors de la mise à jour des favoris:', error);
                alert('Une erreur est survenue lors de la mise à jour des favoris.');
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
