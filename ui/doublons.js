const doublons = {
    template: `
    <div class="doublons">
        <h1 class="titleDoublons">Doublons</h1>
        
        <div v-for="duplicate in duplicates" :key="duplicate.id" id="test">
            <img :src="duplicate.photo" alt="Profile" class="profile-img">
            <p class="Champ">{{ duplicate.nom }} {{ duplicate.prenom }}</p>

            <ul>
                <li><strong>Email:</strong> {{ duplicate.email }}</li>
                <li><strong>Téléphone:</strong> {{ duplicate.telephone }}</li>
                <li><strong>Adresse:</strong> {{ duplicate.adresse }}</li>
                <li><strong>Métier:</strong> {{ duplicate.metier }}</li>
            </ul>
        </div>

        <button id="But1"><a href="#/home">Retour</a></button>
        <button id="But2"><a href="#/home">Enregistrer</a></button>
    </div>
    `,
    data() {
        return {
            contacts: [],  // Initialise la liste des contacts
            duplicates: [] // Initialise la liste des doublons
        };
    },
    mounted() {
        // Charge les données du fichier JSON
        fetch('data/contacts.json')
            .then(response => response.json())
            .then(data => {
                this.contacts = data;

                // Trouve et affiche les doublons
                this.findDuplicates();
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
    },
    methods: {
        findDuplicates() {
            const duplicates = [];
            const uniqueEmails = new Set();
            const uniquePhones = new Set();

            this.contacts.forEach(contact => {
                if (uniqueEmails.has(contact.email) || uniquePhones.has(contact.telephone)) {
                    duplicates.push(contact);
                } else {
                    uniqueEmails.add(contact.email);
                    uniquePhones.add(contact.telephone);
                }
            });

            this.duplicates = duplicates;
        }
    }
};
