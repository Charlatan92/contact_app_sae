// Définit le composant de la page de détails
const contact = {
    template: `
    <div class="contact">
        <img :src="contact.photo" alt="Profile" class="photoProfil">

        <p class="Champ" id="Nom"> {{ contact.nom }}</p>
        <p class="Champ" id="Prenom"> {{ contact.prenom }}</p>
        <p class="Champ" id="Email"> {{ contact.email }}</p>
        <p class="Champ" id="NumTelephone"> {{ contact.telephone }}</p>
        <p class="Champ" id="Adresse"> {{ contact.adresse }}</p>
        <p class="Champ" id="Metier"> {{ contact.metier }}</p>

        <button id="But1"><a href="#/home">Retour</a></button>
    
        <button id="But2"><a href="#/changeContact">Modifier</a></button>
    
        <button id="But3"><a href="#/home">Enregistrer</a></button>
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
    }
}