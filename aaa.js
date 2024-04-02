const aaa = {
    template: `
    <div class="aaa">
        <li v-for="contact in contacts" :key="contact.id" id="listeContact" @click="goToProfile(contact.id)">
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