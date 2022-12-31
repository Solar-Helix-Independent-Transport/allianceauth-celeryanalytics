from django.conf import settings

CA_RESULT_MAX_LEN = getattr(settings, "CA_RESULT_MAX_LEN", -1)
CA_HOUSEKEEPING_DB_BACKLOG = getattr(settings, "CA_HOUSEKEEPING_DB_BACKLOG", 14)
CA_LOG_TO_DB = getattr(settings, "CA_LOG_TO_DB", True)