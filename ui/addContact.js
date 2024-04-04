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
            const newContact = {
                nom: this.nom,
                prenom: this.prenom,
                telephone: this.telephone,
                email: this.email,
                adresse: this.adresse,
                metier: this.metier,
            };
        
            axios.post('/contact', newContact)
                .then(response => {
                    console.log('Contact enregistré:', response.data);
                    this.$router.push('/home');
                })
                .catch(error => {
                    console.error('Erreur lors de l\'enregistrement du contact:', error);
                });
        }
        
    }
}
export default addContact;