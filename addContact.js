const addContact = {
    template: `
    <div>
        <header class="addContact">
            <label for="photoInput" style="cursor: pointer; display: block; text-align: center;">
                <img :src="photo ? photo : 'CSS/Images/PhotoProfilClair.svg'" alt="Photo de profil" id="PhotoProfilClair">
            </label>
            <input type="file" id="photoInput" @change="handlePhotoChange" style="display: none;">
                        
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
            metier: '',
            photo: null  // Ajout d'une propriété pour stocker la photo
        };
    },
    methods: {
        annuler() {
            this.$router.push({ path: '#/home' });
        },
        handlePhotoChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
    
            reader.onloadend = () => {
                this.photo = reader.result;  // Stocke l'image encodée en base64
            };
    
            if (file) {
                reader.readAsDataURL(file);
            }
        },
        enregistrer() {
            const newContact = {
                id: Date.now(),
                nom: this.nom,
                prenom: this.prenom,
                telephone: this.telephone,
                email: this.email,
                adresse: this.adresse,
                metier: this.metier,
                photo: this.photo  // Utilise la photo stockée
            };
        
            fetch('contacts.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newContact)
            })
            .then(response => response.text())
            .then(text => {
                console.log(text);
                this.$router.push({ path: '#/home' });
            })
            .catch(error => {
                console.error('Erreur lors de l\'enregistrement du contact:', error);
            });
        }
    }    
}
