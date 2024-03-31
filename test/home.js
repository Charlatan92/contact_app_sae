const home= {template: `

<header>
    <h1 class="titleContact">
        Contacts
    </h1>

    <input type="text" placeholder="Rechercher" id="barreRecherche">

    <a href="#/addContact">
        <input type="button" value="" id="AddContact">
    </a>

    <input type="button" value="" id="Parametres">

    <hr> <!-- Ligne de séparation -->

    <input type="button" value="Mon profil" class="Champ" id="MonProfil">

    <hr> <!-- Ligne de séparation -->

    <a href="#/favoris">
        <input type="button" value="Favoris" class="Champ" id="Favoris">
    </a>

    <a href="#/groupes">
        <input type="button" value="Groupes" class="Champ" id="Groupes">
    </a>

    <hr> <!-- Ligne de séparation -->

    <a href="#/doublons">
        <input type="button" value="Doublons" class="Champ" id="Doublons">
    </a>


    <hr> <!-- Ligne de séparation -->
</header>
`
} 