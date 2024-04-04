const addContact = {
    template: `
    <div>
        <header class="addContact">
            <img src="CSS/Images/PhotoProfilClair.svg" alt="Photo de profil claire" id="PhotoProfilClair">
            
            <!-- Afficher un message d'avertissement si le formulaire n'est pas valide -->
            <p v-if="!isFormValid" class="warning">Le nom, le prénom et un numéro de téléphone valide sont requis.</p>
            
            <input type="text" placeholder="Nom" v-model="nom" class="Champ">
            <input type="text" placeholder="Prénom" v-model="prenom" class="Champ">
            <input type="tel" placeholder="Numéro de téléphone" v-model="telephone" class="Champ" pattern="\\d*">
            <input type="email" placeholder="Email" v-model="email" class="Champ">
            <input type="text" placeholder="Adresse" v-model="adresse" class="Champ">
            <input type="text" placeholder="Métier" v-model="metier" class="Champ">
            
            <button id="But1" @click="annuler">Annuler</button>
            <button id="But2" v-if="isFormValid" @click="enregistrer">Enregistrer</button>
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
            metier: '',
            photo_path: null
        };
    },
    computed: {
        isFormValid() {
            const telephoneValid = this.telephone.match(/^\d{10}$/) !== null;
            return this.nom.length > 0 && this.prenom.length > 0 && telephoneValid; // Nom et prénom sont requis
        }
    },
    methods: {
        annuler() {
            this.$router.push('/home');
        },
        enregistrer() {
            // Retirer le premier '0' si présent et assurer que le numéro a 9 chiffres
            let adjustedTelephone = this.telephone.replace(/^0/, '');
            adjustedTelephone = adjustedTelephone.padStart(9, '0');

            const newContact = {
                nom: this.nom,
                prenom: this.prenom,
                telephone: adjustedTelephone,
                email: this.email,
                adresse: this.adresse,
                metier: this.metier,
                photo_path: this.photo_path // à modifier si nécessaire pour inclure la logique de chemin de photo
            };

            axios.post('http://127.0.0.1:8000/contact/', newContact)
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
