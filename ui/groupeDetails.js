const groupeDetails = {
    template: `
    <div class="groupeDetails">
        <h1 class="titleGroupes">{{ groupe.nom }}</h1>
        
        <h4 class="titleGroupes">Membres du groupe :</h4>
        <li v-for="contact in contactsDuGroupe" :key="contact.id">
            {{ contact.nom }} {{ contact.prenom }}
        </li>
        
        <button id="But1" @click="supprimerGroupe">Supprimer</button>

        <button id="But2"><a href="#/groupes">Retour</a></button>
    </div>
    `,
    data() {
        return {
            groupe: {},  // Initialise l'objet groupe
            contacts: [],  // Initialise le tableau des contacts
            groupesList: []  // Initialise le tableau des groupes
        };
    },
    mounted() {
        // Récupère l'ID du groupe depuis l'URL
        const groupeId = this.$route.params.id;

        // Charge les données du fichier JSON des groupes
        fetch('data/groupes.json')
            .then(response => response.json())
            .then(data => {
                // Trouve le groupe correspondant à l'ID
                this.groupe = data.find(g => g.id === parseInt(groupeId));
                this.contacts = data.flatMap(g => g.contacts); // Récupère tous les contacts de tous les groupes
                this.groupesList = data;  // Stocke la liste complète des groupes
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
    },
    computed: {
        contactsDuGroupe() {
            return this.contacts.filter(contact => this.groupe.membres.includes(contact.id));
        }
    },
    methods: {
        supprimerGroupe() {
            const groupeId = this.groupe.id;
            
            if (confirm("Voulez-vous vraiment supprimer ce groupe ?")) {
                // Supprime le groupe de la liste des groupes
                this.groupesList = this.groupesList.filter(g => g.id !== groupeId);
    
                // Sauvegarde la liste mise à jour dans le fichier JSON
                this.sauvegarderGroupes();
            }

            // Redirige vers la liste des groupes
            this.$router.push({ path: '#/groupes' });
        },
        sauvegarderGroupes() {
            fetch('data/groupes.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.groupesList),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Groupes sauvegardés:', data);
            })
            .catch(error => {
                console.error('Erreur lors de la sauvegarde des données:', error);
            });
        }
    }
}