const groupe = {
    template: `
    <div class="groupe" v-if="groupe">
        <h2>{{ groupe.nom }}</h2>
        <div id="paramGroupe">
            <div>
                <span>Modifier le nom :</span>
                <input class="Champ" id="Nom" v-model="groupe.nom">
            </div>
            <div>
                <span id="span2">Couleur du groupe :</span>
                <input type="color"class="Champ" id="Couleur" v-model="groupe.couleur">
            </div>
        </div>

        <h3>Contacts du groupe</h3>
        <div id="membresGroupe">
            <li v-for="contact in contactsDuGroupe" :key="contact.id" class="contact-item" @click="goToContactProfile(contact.id)">
                <p>{{ contact.nom }} {{ contact.prenom }}</p>
            </li>
            <div class="buttons">
                <button id="But1" @click="goBack">Retour</button>
                <button id="But2" @click="confirmDelete">Supprimer</button>
                <button id="But3" @click="saveGroupe">Enregistrer</button>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            groupe: null,
            contactsDuGroupe: []
        };
    },
    methods: {
        goBack() {
            this.$router.push('/groupesPage');
        },
        goToContactProfile(contactId) {
            // Rediriger vers la page de profil du contact
            this.$router.push(`/contact/${contactId}`);
        },
        loadContactsDuGroupe() {
            axios.get(`http://127.0.0.1:8000/contactgroupe/`)
                .then(response => {
                    const groupeAssociations = response.data.filter(assoc => assoc.groupe_id === this.groupe.id);
                    const contactIds = groupeAssociations.map(assoc => assoc.contact_id);
                    return Promise.all(contactIds.map(id => axios.get(`http://127.0.0.1:8000/contact/${id}`)));
                })
                .then(responses => {
                    this.contactsDuGroupe = responses.map(res => res.data);
                })
                .catch(error => console.error('Erreur lors du chargement des contacts du groupe:', error));
        },
        saveGroupe() {
            axios.put(`http://127.0.0.1:8000/groupe/${this.groupe.id}/`, this.groupe)
                .then(() => {
                    alert('Groupe sauvegardé avec succès');
                    this.goBack();
                })
                .catch(error => alert('Erreur lors de la sauvegarde du groupe: ' + error.message));
        },
        confirmDelete() {
            if (confirm("Voulez-vous vraiment supprimer ce groupe ?")) {
                axios.delete(`http://127.0.0.1:8000/groupe/${this.groupe.id}/`)
                    .then(() => {
                        alert('Groupe supprimé avec succès');
                        this.goBack();
                    })
                    .catch(error => alert('Erreur lors de la suppression du groupe: ' + error.message));
            }
        }
    },
    mounted() {
        const groupeId = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/groupe/${groupeId}`)
            .then(response => {
                this.groupe = response.data;
                this.loadContactsDuGroupe();
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
    }
};

export default groupe;
