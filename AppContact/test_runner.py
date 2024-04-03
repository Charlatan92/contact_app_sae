from django.test.runner import DiscoverRunner

class NoDbTestRunner(DiscoverRunner):
    """
    Un test runner pour utiliser une base de données de test existante sans créer ou supprimer.
    """

    def setup_databases(self, **kwargs):
        """
        Override la méthode setup_databases pour ne pas créer une base de données.
        """
        pass

    def teardown_databases(self, old_config, **kwargs):
        """
        Override la méthode teardown_databases pour ne pas supprimer la base de données.
        """
        pass
