# celeryanalytics

celery task analytics for [Alliance Auth](https://gitlab.com/allianceauth/allianceauth).

## Installation

With your venv active,

Pip install `pip install -U git+https://github.com/pvyParts/allianceauth-celeryanalytics.git`

Add `celeryanalytics` to your `INSTALLED_APPS` in your `local.py`

Also add the following cron job:

```python
## AA Celery Analytics Housekeeping
CELERYBEAT_SCHEDULE["celeryanalytics.tasks.run_housekeeping"] = {
    "task": "celeryanalytics.tasks.run_housekeeping",
    "schedule": crontab(minute=0, hour=0),
}
```

This module has no permissions or views. it will start logging all completed and failed tasks on install using the celery signals. 

## Settings 

`CA_HOUSEKEEPING_DB_BACKLOG` defines how long (in days) records should be kept in 
your database. Default is 10 days.

if you are using a results fed app you may wish to limit he result spam to database.
in your `local.py` add the setting `CA_RESULT_MAX_LEN=1000` set the integer to what ever you want as your max length
View the failed tasks in admin of your auth. as below; 

![Admin Menu](https://i.imgur.com/g36hJyu.png "Admin Menu")

![Failures](https://i.imgur.com/mTD224f.png "Failures")

![Details](https://i.imgur.com/ang9wXB.png "Details")

## Issues

Please remember to report any celeryanalytics related issues using the issues on **this** repository.
