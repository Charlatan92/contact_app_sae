const groupes = {
    template: `
    <div class="groupes">
        <h1 class="titleGroupes">Groupes</h1>
        <li v-for="groupe in groupesList" id="listeGroupes" :key="groupe.id" @click="goToProfile(groupe.id)">
            <input type="button" class="Champ">
            <img :src="groupe.photo" alt="Profile" class="profile-img">
            <p>{{ groupe.nom }}</p>
        </li>
        <button id="But1"><a href="#/home">Retour</a></button>
    
        <button id="But2"><a href="#/changeContact">Modifier</a></button>
    </div>
    `,
    data() {
        return {
            groupe: {},  // Initialise l'objet groupe
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
                this.groupesList = data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
    },
    methods: {
        goToProfile(groupeId) {
            // Redirige vers la page de détails du groupe
            this.$router.push({ path: `/groupe/${groupeId}` });
        }
    }
}
