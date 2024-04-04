const contact = {
    template: `
    <div class="contact" v-if="contact">
        <img :src="contact.photo || './Photos/default-image-path.png'" alt="Profile" class="photoProfil"> 

        <p class="Champ" id="Nom">Nom: {{ contact.nom }}</p>
        <p class="Champ" id="Prenom">Prénom: {{ contact.prenom }}</p>
        <p class="Champ" id="Email">Email: {{ contact.email }}</p>
        <p class="Champ" id="NumTelephone">Téléphone: {{ contact.telephone }}</p>
        <p class="Champ" id="Adresse">Adresse: {{ contact.adresse }}</p>
        <p class="Champ" id="Metier">Métier: {{ contact.metier }}</p>

        <button id="But1"><a href="#/home">Retour</a></button>
    
        <!-- Supposons que vous ayez un composant ou une page pour changer les détails d'un contact -->
        <button id="But2" v-if="contact.id"><a :href="'#/changeContact/' + contact.id">Modifier</a></button>
    
    </div>
    `,
    data() {
        return {
            contact: null // initialiser contact en tant que null
        };
    },
    mounted() {
        // Utilisez this.$route.params.id pour obtenir l'ID du contact à partir de l'URL
        const contactId = this.$route.params.id;

        // Faites la demande GET à votre API pour récupérer les informations du contact
        axios.get(`http://127.0.0.1:8000/contact/${contactId}`) // Utilisez l'URL de votre API
            .then(response => {
                // Assurez-vous que l'API renvoie un objet contact dans la réponse
                this.contact = response.data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
    }
}

export default contact;
