const contact = {
    template: `
    <div class="contact" v-if="contact">
        <img :src="contact.photo || './Photos/default-image-path.png'" alt="Profile" class="photoProfil"> 

        <input class="Champ" id="Nom" v-model="contact.nom">
        <input class="Champ" id="Prenom" v-model="contact.prenom">
        <input class="Champ" id="Email" v-model="contact.email">
        <input class="Champ" id="NumTelephone" v-model="formattedTelephone">
        <input class="Champ" id="Adresse" v-model="contact.adresse">
        <input class="Champ" id="Metier" v-model="contact.metier">

        <button id="But1"><a href="#/home">Retour</a></button>
        <button id="But2" @click="confirmDelete">Supprimer</button>
        <button id="But3" @click="saveContact">Enregistrer</button>
    </div>
    `,
    data() {
        return {
            contact: null // Initialise l'objet contact à null
        };
    },
    computed: {
        // Ajoute un '0' au début du numéro de téléphone pour l'affichage
        formattedTelephone: {
            get() {
                return this.contact ? '0' + this.contact.telephone : '';
            },
            set(newValue) {
                // Supprime le '0' au début lors de la mise à jour de la valeur
                this.contact.telephone = newValue.replace(/^0/, '');
            }
        }
    },
    mounted() {
        const contactId = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/contact/${contactId}`)
            .then(response => {
                this.contact = response.data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
            });
    },
    methods: {
        saveContact() {
            axios.put(`http://127.0.0.1:8000/contact/${this.contact.id}`, this.contact)
                .then(() => {
                    console.log('Contact sauvegardé:', this.contact);
                    this.$router.push('/home');
                })
                .catch(error => {
                    console.error('Erreur lors de la sauvegarde du contact:', error);
                });
        },
        confirmDelete() {
            if (confirm("Voulez-vous vraiment supprimer ce contact ?")) {
                axios.delete(`http://127.0.0.1:8000/contact/${this.contact.id}`)
                    .then(() => {
                        console.log('Contact supprimé:', this.contact);
                        this.$router.push('/home');
                    })
                    .catch(error => {
                        console.error('Erreur lors de la suppression du contact:', error);
                    });
            }
        }
    }
}

export default contact;
