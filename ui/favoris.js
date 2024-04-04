export default {
    template: `
    <div class="favoris">
        <h1 class="titleFavoris">Favoris</h1>
        <li v-for="contact in favoriteContacts" :key="contact.id" class="itemFavoris">
            <div class="contactInfo">
                <img :src="contact.photo" alt="Profile" class="profile-img">
                <p>{{ contact.nom }} {{ contact.prenom }}</p>
            </div>
        </li>
        <button id="But1"><a href="#/home">Retour</a></button>
    </div>
    `,
    data() {
        return {
            contacts: [],
            groupes: [],
            contactGroupes: [],
            idGroupeFavori: 1, // ID de votre groupe favori, à ajuster selon votre logique
        };
    },
    computed: {
        favoriteContacts() {
            // Filtre les contacts basés sur leur présence dans le groupe favori
            const favoriContactIds = this.contactGroupes
                .filter(cg => cg.groupeId === this.idGroupeFavori)
                .map(cg => cg.contactId);

            return this.contacts.filter(contact => favoriContactIds.includes(contact.id));
        },
    },
    mounted() {
        // Charge tous les contacts
        axios.get('/contact')
            .then(response => {
                this.contacts = response.data;
            });

        // Charge toutes les liaisons contact-groupe
        axios.get('/contactgroupe')
            .then(response => {
                this.contactGroupes = response.data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
    },
};
