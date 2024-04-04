const groupesPage = {
    template: `
    <div class="groupes">
        <h1 class="titleGroupes">Groupes</h1>

        <ul>
            <li v-for="groupe in groupesList" :key="groupe.id" @click="goToProfile(groupe.id)" class="groupeItem">
                <!-- Afficher un cercle avec la couleur du groupe -->
                <div class="couleurGroupe" :style="{ backgroundColor: groupe.couleur }"></div>
                <input type="button" class="Champ" v-model="groupe.nom">
            </li>
        </ul>

        <!-- Lien pour créer un nouveau groupe -->
        <div>
            <button @click="goToAddGroupe">Créer un nouveau groupe</button>
        </div>
        
        <button id="But1"><a href="#/home">Retour</a></button>
    </div>
    `,
    data() {
        return {
            groupesList: []
        };
    },
    methods: {
        chargerGroupes() {
            axios.get('http://127.0.0.1:8000/groupe/')
                .then(response => {
                    this.groupesList = response.data;
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des données:', error);
                });
        },
        goToProfile(groupeId) {
            this.$router.push(`/groupe/${groupeId}`);
        },
        goToAddGroupe() {
            this.$router.push(`/addGroupe`);
        }
    },
    mounted() {
        this.chargerGroupes();
    }
}

export default groupesPage;
