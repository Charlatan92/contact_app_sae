const doublons = {
    template: `
    <div class="doublons">
        <h1 class="titleDoublons">Doublons</h1>
        
        <div v-for="duplicate in duplicates" :key="duplicate.id" id="test">
            <img :src="duplicate.photo" alt="Profile" class="profile-img">
            <p class="Champ">{{ duplicate.nom }} {{ duplicate.prenom }}</p>

            <ul>
                <li><strong>ID:</strong> {{ duplicate.id }}</li>
                <li><strong>Email:</strong> {{ duplicate.email }}</li>
                <li><strong>Téléphone:</strong> {{ duplicate.telephone }}</li>
                <li><strong>Adresse:</strong> {{ duplicate.adresse }}</li>
                <li><strong>Métier:</strong> {{ duplicate.metier }}</li>
            </ul>

            <!-- Bouton Supprimer -->
            <button @click="deleteDuplicate(duplicate.id)" id="butDelete">Supprimer</button>
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
            const namesCount = {};
    
            this.contacts.forEach(contact => {
                const fullName = `${contact.nom} ${contact.prenom}`;
    
                if (namesCount[fullName]) {
                    duplicates.push(contact);
                    namesCount[fullName]++;
                } else {
                    namesCount[fullName] = 1;
                }
            });
    
            this.duplicates = duplicates;
        },
        deleteDuplicate(id) {
            this.duplicates = this.duplicates.filter(duplicate => duplicate.id !== id);
        }
    }    
};
export default doublons;