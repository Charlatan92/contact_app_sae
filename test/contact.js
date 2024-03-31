// Définit le composant de la page de détails
const contact = {
    template: `
    <div class="contact">
        <h2>{{ contact.nom }} {{ contact.prenom }}aaa</h2>
        <img :src="contact.photo" alt="Profile" class="profile-img">
        <p class="Champ">Email: {{ contact.email }}</p>
        <p class="Champ">Téléphone: {{ contact.telephone }}</p>
        <p class="Champ">Adresse: {{ contact.adresse }}</p>
        <p class="Champ">Métier: {{ contact.metier }}</p>
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
        fetch('file.json')
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