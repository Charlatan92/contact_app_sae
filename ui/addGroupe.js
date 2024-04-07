const addGroupe = {
    template: `
    <div class="addGroupe">
        <h1>Ajouter un nouveau groupe</h1>
        <form @submit.prevent="enregistrer">
            <input type="text" placeholder="Nom du groupe" v-model="nom" class="Champ" required>
            <select v-model="couleur" class="Champ" required>
                <option disabled value="">Choisir une couleur</option>
                <option value="#FF0000">Rouge</option>
                <option value="#00FF00">Vert</option>
                <option value="#0000FF">Bleu</option>
                <!-- Ajoutez plus de couleurs si nécessaire -->
            </select>
            <div class="bouton">
                <button @click="annuler" id="But1">Annuler</button>
                <button type="submit">Enregistrer</button>
            </div>
        </form>
    </div>
    `,
    data() {
        return {
            nom: '',
            couleur: ''
        };
    },
    methods: {
        enregistrer() {
            const nouveauGroupe = {
                nom: this.nom,
                couleur: this.couleur
            };

            axios.post('http://127.0.0.1:8000/groupe/', nouveauGroupe)
                .then(response => {
                    console.log('Groupe enregistré:', response.data);
                    this.$router.push('/groupesPage');
                })
                .catch(error => {
                    console.error('Erreur lors de l\'enregistrement du groupe:', error);
                });
        },
        annuler() {
            this.$router.push('/groupesPage');
        }
    }
}

export default addGroupe;
