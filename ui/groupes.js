const groupes = {
    template: `
    <div class="groupes">
        <h1 class="titleGroupes">Groupes</h1>
        <li v-for="groupe in groupesList" :key="groupe.id" class="itemGroupes" @click="goToProfile(groupe.id)">
            <div class="groupInfo">
                <img :src="groupe.photo" alt="Image du groupe" class="profile-img">
                <p>{{ groupe.nom }}</p>
            </div>
        </li>
        <button id="But1"><a href="#/home">Retour</a></button>
        <button id="But2"><a href="#/addGroupe">Ajouter Groupe</a></button> <!-- Ajustez le lien si nécessaire -->
    </div>
    `,
    data() {
        return {
            groupesList: []  // Initialise le tableau des groupes
        };
    },
    methods: {
        goToProfile(groupeId) {
            // Redirige vers la page de détails du groupe
            this.$router.push({ path: `/groupe/${groupeId}` });
        }
    },
    mounted() {
        // Charge les données de l'API Django
        axios.get('/groupe') // Assurez-vous que c'est la bonne URL de base
            .then(response => {
                // Affecte la liste des groupes reçue à la propriété groupesList
                this.groupesList = response.data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
    }
}

export default groupes;
