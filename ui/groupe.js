const groupe = {
    template: `
    <div class="groupe" v-if="groupe">
        <input class="Champ" id="Nom" v-model="groupe.nom">
        <!-- Exemple d'ajout d'un champ spécifique au groupe, comme la couleur -->
        <input type="color" id="Couleur" v-model="groupe.couleur">

        <button id="But1"><a href="#/groupesPage">Retour</a></button>
        <button id="But2" @click="confirmDelete">Supprimer</button>
        <button id="But3" @click="saveGroupe">Enregistrer</button>
    </div>
    `,
    data() {
        return {
            groupe: null // Initialise l'objet groupe à null
        };
    },
    mounted() {
        const groupeId = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/groupe/${groupeId}`)
            .then(response => {
                this.groupe = response.data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
    },
    methods: {
        saveGroupe() {
            axios.put(`http://127.0.0.1:8000/groupe/${this.groupe.id}`, this.groupe)
                .then(() => {
                    console.log('Groupe sauvegardé:', this.groupe);
                    this.$router.push('/groupesPage');
                })
                .catch(error => {
                    console.error('Erreur lors de la sauvegarde du groupe:', error);
                });
        },
        confirmDelete() {
            if (confirm("Voulez-vous vraiment supprimer ce groupe ?")) {
                axios.delete(`http://127.0.0.1:8000/groupe/${this.groupe.id}`)
                    .then(() => {
                        console.log('Groupe supprimé:', this.groupe);
                        this.$router.push('/groupesPage');
                    })
                    .catch(error => {
                        console.error('Erreur lors de la suppression du groupe:', error);
                    });
            }
        }
    }
}

export default groupe;
