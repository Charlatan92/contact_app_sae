const favoris = {
    template: `
    <div class="favoris">
        <h1 class="titleFavoris">Favoris</h1>
        <li v-for="contact in contacts" id="listeFavoris" :key="contact.id">
            <input type="button" class="Champ" id="barreContact">
            <input type="checkbox" v-model="selectedContacts" :value="contact.id" class="Champ coche" :checked="favorites.includes(contact.id)" style="position: relative; right: -35%; top: -30px">
            <img :src="contact.photo" alt="Profile" class="profile-img">
            <p>{{ contact.nom }} {{ contact.prenom }}</p>
        </li>
        <button id="But1"><a href="#/home">Retour</a></button>
        <button @click="saveFavorites"><a href="#/home">Enregistrer</a></button>
    </div>
    `,
    data() {
        return {
            contacts: [],  // Initialise le tableau des contacts
            favorites: [], // Initialise le tableau des favoris
            selectedContacts: []
        };
    },
    computed: {
    },
    methods: {
        saveFavorites() {
            this.favorites = [...this.selectedContacts];
            
            // Enregistre les favoris mis à jour dans favoris.json
            fetch('data/favoris.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.favorites),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Favorites saved:', data);
            })
            .catch(error => {
                console.error('Erreur lors de la sauvegarde des favoris:', error);
            });
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
                this.selectedContacts = [...this.favorites]; // Initialise selectedContacts avec les favoris
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
    }
}