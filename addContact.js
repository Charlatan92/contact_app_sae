const addContact = {
    template: `
    <div>
        <header class="addContact">
            <img src="CSS/Images/PhotoProfilClair.svg" alt="Photo de profil claire" id="PhotoProfilClair">
            
            <input type="text" placeholder="Nom" v-model="nom" class="Champ">
            <input type="text" placeholder="Prénom" v-model="prenom" class="Champ">
            <input type="text" placeholder="Numéro de téléphone" v-model="telephone" class="Champ">
            <input type="text" placeholder="Email" v-model="email" class="Champ">
            <input type="text" placeholder="Adresse" v-model="adresse" class="Champ">
            <input type="text" placeholder="Métier" v-model="metier" class="Champ">
            
            <button id="But1" @click="annuler"><a href="#/home">Annuler</a></button>
            <button id="But2" @click="enregistrer"><a href="#/home">Enregistrer</a></button>
        </header>
    </div>
    `,
    data() {
        return {
            nom: '',
            prenom: '',
            telephone: '',
            email: '',
            adresse: '',
            metier: ''
        };
    },
    methods: {
        annuler() {
            // Redirige vers la page d'accueil
            this.$router.push({ path: '#/home' });
        },
        enregistrer() {
            // Crée un nouvel objet contact
            const newContact = {
                id: Date.now(),  // ID unique basé sur la date et l'heure
                nom: this.nom,
                prenom: this.prenom,
                telephone: this.telephone,
                email: this.email,
                adresse: this.adresse,
                metier: this.metier,
                // photo: 'path/to/photo.jpg'  // Mettre à jour le chemin de la photo si nécessaire
            };
        
            // Envoie l'objet au serveur pour l'ajouter au fichier JSON
            fetch('contacts.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newContact)
            })
            .then(response => response.text())  // Convertit la réponse en texte
            .then(text => {
                // Affiche la réponse du serveur (pour le débogage)
                console.log(text);
        
                // Redirige vers la page d'accueil
                this.$router.push({ path: '#/home' });
            })
            .catch(error => {
                console.error('Erreur lors de l\'enregistrement du contact:', error);
            });
        }
    }
}
