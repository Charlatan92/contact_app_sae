const contact = {
    template: `
    <div class="contact">
        <img :src="contact.photo" alt="Profile" class="photoProfil">

        <input class="Champ" id="Nom" v-model="contact.nom">
        <input class="Champ" id="Prenom" v-model="contact.prenom">
        <input class="Champ" id="Email" v-model="contact.email">
        <input class="Champ" id="NumTelephone" v-model="contact.telephone" type="integer">
        <input class="Champ" id="Adresse" v-model="contact.adresse">
        <input class="Champ" id="Metier" v-model="contact.metier">

        <button id="But1"><a href="#/home">Retour</a></button>
    
        <button id="But2" @click="confirmDelete">Supprimer</button>
    
        <button id="But3" @click="saveContact">Enregistrer</button>
    </div>
    `,
    data() {
        return {
            contact: {}  // Initialise l'objet contact
        };
    },
    mounted() {
        // Récupère l'ID du contact depuis l'URL
        const contactId = this.$route.params.id;

        // Charge les données du fichier JSON
        fetch('data/contacts.json')
            .then(response => response.json())
            .then(data => {
                // Trouve le contact correspondant à l'ID
                this.contact = data.find(c => c.id === parseInt(contactId));
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
    },
    methods: {
        saveContact() {
            // Sauvegarde le contact modifié (ici, on pourrait envoyer les données au serveur)
            console.log('Contact sauvegardé :', this.contact);
    
            // Redirige vers la page d'accueil après la sauvegarde du contact
            this.$router.push('/home');
        },
        confirmDelete() {
            if (confirm("Voulez-vous vraiment supprimer ce contact ?")) {
                // Supprime le contact (ici, on pourrait envoyer une requête au serveur pour supprimer le contact)
                console.log('Contact supprimé :', this.contact);
    
                // Redirige vers la page d'accueil après la suppression du contact
                this.$router.push('/home');
            }
        }
    }    
}
