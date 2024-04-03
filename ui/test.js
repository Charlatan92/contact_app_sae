const test = {
  template: `
    <div class="test">
        <div id="app">
            <h1>Bitcoin Price Index</h1>
            
            <!-- Bouton pour ajouter un champ -->
            <button @click="addNewField">Ajouter un champ</button>

            <section v-if="errored">
                Désolés, nous ne sommes pas en mesure de récupérer ces informations pour le moment. Veuillez réessayer ultérieurement.</p>
            </section>
            
            <section v-else>
                <div v-if="loading">Chargement...</div>
                
                <div
                    v-else
                    v-for="currency in info"
                    class="currency"
                >
                    {{ currency.description }}:
                    <span class="lighten">
                    <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
                    </span>
                </div>
            </section>
        </div>
    </div>
    `,
  data() {
    return {
      info: null,
      loading: true,
      errored: false
    }
  },
  filters: {
    currencydecimal(value) {
      return value.toFixed(2)
    }
  },
  methods: {
    addNewField() {
      // Exemple de champ à ajouter
      const newField = {
        description: "Nouvelle monnaie",
        symbol: "NMC",
        rate_float: 1000.00
      };
      
      // Lecture du fichier JSON actuel
      axios.get('./test.json')
        .then(response => {
          let data = response.data;
          
          // Vérifie si data est un tableau
          if (Array.isArray(data)) {
            // Ajout du nouveau champ
            data.push(newField);
          } else {
            // Si data n'est pas un tableau, ajoute le nouveau champ à un nouveau tableau
            data = [data, newField];
          }
          
          // Écriture du fichier JSON mis à jour avec la méthode POST
          return axios.post('./test.json', data);
        })
        .then(() => {
          // Rafraîchir les données
          return axios.get('./test.json');
        })
        .then(response => {
          this.info = response.data;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => this.loading = false);
    }
  },  
  mounted() {
    axios
      .get('./test.json')  // Changement ici pour lire test.json
      .then(response => {
        this.info = response.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
}
