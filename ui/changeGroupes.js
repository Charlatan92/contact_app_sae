const favoris = {
    template: `
    <div class="favoris">
        <h1 class="titleFavoris">Favoris</h1>
        <div>
            <input type="checkbox" id="toggleFavorites" v-model="showOnlyFavorites">
            <label for="toggleFavorites">Afficher seulement les favoris</label>
        </div>
        <ul>
            <li v-for="contact in displayedContacts" :key="contact.id" class="itemFavoris">
                <input type="checkbox" v-model="selectedContacts" :value="contact.id">
                <div @click="goToProfile(contact.id)" class="contactInfo">
                    <img :src="contact.photo || './Photos/default-image-path.png'" alt="Profile" class="profile-img">
                    <p>{{ contact.nom }} {{ contact.prenom }}</p>
                </div>
            </li>
        </ul>
        <button id="But1"><a href="#/home">Retour</a></button>
        <button @click="saveFavorites">Enregistrer</button>
    </div>
    `,
    data() {
        return {
            contacts: [],
            contactGroupes: [],
            selectedContacts: [],
            showOnlyFavorites: false,
        };
    },
    computed: {
        displayedContacts() {
            if (this.showOnlyFavorites) {
                const favoriContactIds = this.contactGroupes
                    .filter(cg => cg.groupe_id === 1)
                    .map(cg => cg.contact_id);

                return this.contacts.filter(contact => favoriContactIds.includes(contact.id));
            } else {
                return this.contacts;
            }
        },
    },
    methods: {
        goToProfile(contactId) {
            this.$router.push(`/contact/${contactId}`);
        },
        saveFavorites() {
            this.selectedContacts.forEach(contactId => {
                const payload = {
                    contact_id: contactId,
                    groupe_id: 1  // Supposant que 1 est l'ID du groupe Favoris
                };
                
                // Vérifier si l'association existe déjà pour éviter les doublons
                const existingAssociation = this.contactGroupes.find(cg => cg.contact_id === contactId && cg.groupe_id === 1);
                
                if (!existingAssociation) {
                    axios.post('http://127.0.0.1:8000/contactgroupe', payload)
                        .then(response => {
                            console.log('Association ajoutée avec succès:', response.data);
                            // Recharger les associations pour mettre à jour l'affichage
                            this.loadContactGroupes();
                        })
                        .catch(error => {
                            console.error('Erreur lors de l\'ajout de l\'association:', error);
                        });
                } else {
                    console.log('Association déjà existante, pas besoin d\'ajouter');
                }
            });
    
            // Pour les contacts désélectionnés, vous pourriez avoir besoin d'une logique pour les supprimer de contactgroupe
            // Cela pourrait nécessiter une modification de votre API pour gérer la suppression par contact_id et groupe_id
        },
    
        loadContacts() {
            axios.get('http://127.0.0.1:8000/contact')
                .then(response => {
                    this.contacts = response.data;
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des contacts:', error);
                });
        },
        loadContactGroupes() {
            axios.get('http://127.0.0.1:8000/contactgroupe')
                .then(response => {
                    this.contactGroupes = response.data;
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des associations contact-groupe:', error);
                });
        },
        saveFavorites() {
            // Identifiez les contacts qui étaient favoris mais qui ont été désélectionnés
            const deselectedContacts = this.contactGroupes.filter(cg => cg.groupe_id === 1 && !this.selectedContacts.includes(cg.contact_id));
    
            // Supprimez chaque association désélectionnée
            deselectedContacts.forEach(cg => {
                axios.delete(`http://127.0.0.1:8000/contactgroupe/${cg.id}`) // Assurez-vous que votre API permet de supprimer par ID
                    .then(() => {
                        console.log(`Association pour le contact ${cg.contact_id} supprimée.`);
                        // Rechargez les associations pour mettre à jour l'affichage
                        this.loadContactGroupes();
                    })
                    .catch(error => {
                        console.error('Erreur lors de la suppression de l\'association:', error);
                    });
            });
    
            // Pour les contacts sélectionnés, ajoutez-les comme favoris s'ils ne le sont pas déjà
            this.selectedContacts.forEach(contactId => {
                // Vérifiez si le contact est déjà marqué comme favori
                const isAlreadyFavorite = this.contactGroupes.some(cg => cg.contact_id === contactId && cg.groupe_id === 1);
    
                if (!isAlreadyFavorite) {
                    axios.post('http://127.0.0.1:8000/contactgroupe', { contact_id: contactId, groupe_id: 1 })
                        .then(() => {
                            console.log(`Contact ${contactId} ajouté aux favoris.`);
                            // Rechargez les associations pour mettre à jour l'affichage
                            this.loadContactGroupes();
                        })
                        .catch(error => {
                            console.error('Erreur lors de l\'ajout aux favoris:', error);
                        });
                }
            });
        }
},
    mounted() {
        this.loadContacts();
        this.loadContactGroupes();
    }
}
export default favoris;
