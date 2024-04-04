const groupes = {
    template: `
    <div class="groupes">
        <h1 class="titleGroupes">Groupes</h1>

        <li v-for="groupe in groupesList" id="listeGroupes" :key="groupe.id" @click="goToProfile(groupe.id)">
            <input type="button" class="Champ" v-model="groupe.nom">
            <img :src="groupe.photo" alt="Profile" class="profile-img">
        </li>

        <!-- Formulaire pour créer un nouveau groupe -->
        <div class="nouveauGroupe">
            <h5>Créer un nouveau groupe</h5>
            <form @submit.prevent="ajouterGroupe">
                <label for="photoInput" style="cursor: pointer; display: block; text-align: center;">
                    <img :src="nouvellePhoto ? nouvellePhoto : 'CSS/Images/PhotoProfilClair.svg'" alt="Photo de groupe" id="PhotoProfilClair">
                </label>
                <input type="file" id="photoInput" @change="onFileChange" style="display: none;">
                
                <input type="text" v-model="nouveauNom" placeholder="Nom du groupe" class="Champ" required>
                
                <button type="submit">Ajouter</button>
            </form>
        </div>
        
        <button id="But1"><a href="#/home">Retour</a></button>
    </div>
    `,
    data() {
        return {
            groupesList: [],  // Initialise le tableau des groupes
            nouveauNom: '',  // Nouveau nom du groupe
            nouvellePhoto: ''  // Nouvelle URL de la photo
        };
    },
    mounted() {
        // Charge les données du fichier JSON des groupes
        this.chargerGroupes();
    },
    methods: {
        chargerGroupes() {
            fetch('data/groupes.json')
                .then(response => response.json())
                .then(data => {
                    this.groupesList = data;
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des données:', error);
                });
        },
        goToProfile(groupeId) {
            // Redirige vers la page de détails du groupe
            this.$router.push({ path: `/groupe/${groupeId}` });
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.nouvellePhoto = URL.createObjectURL(file);
            }
        },
        ajouterGroupe() {
            const nouveauGroupe = {
                id: Date.now(),  // ID unique basé sur la date actuelle
                nom: this.nouveauNom,
                photo: this.nouvellePhoto,
                contacts: [],
                membres: []
            };

            // Ajoute le nouveau groupe à la liste des groupes
            this.groupesList.push(nouveauGroupe);

            // Réinitialise les champs du formulaire
            this.nouveauNom = '';
            this.nouvellePhoto = '';

            // Sauvegarde la liste mise à jour dans le fichier JSON
            this.sauvegarderGroupes();
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
