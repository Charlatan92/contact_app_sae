const addContact = {
    template: `
      <div>
          <header class="addContact">
              <img src="CSS/Images/PhotoProfilClair.svg" alt="Photo de profil claire" id="PhotoProfilClair">
              
              <!-- Afficher un message d'avertissement dynamique -->
              <p class="warning">{{ validationMessage }}</p>
              
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
        return this.nom && this.prenom && this.telephone.match(/^\d{10}$/);
      },
      validationMessage() {
        let message = "Les champs suivants sont requis :";
        if (!this.nom) message += " Nom";
        if (!this.prenom) message += " Prénom";
        if (!this.telephone.match(/^\d{10}$/)) message += " Numéro de téléphone valide";
        return message;
      }
    },
    methods: {
      annuler() {
        this.$router.push('/home');
      },
      enregistrer() {
        let adjustedTelephone = this.telephone.replace(/^0/, '');
        adjustedTelephone = adjustedTelephone.padStart(9, '0');
  
        const newContact = {
          nom: this.nom,
          prenom: this.prenom,
          telephone: adjustedTelephone,
          email: this.email,
          adresse: this.adresse,
          metier: this.metier,
          photo_path: this.photo_path
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
  