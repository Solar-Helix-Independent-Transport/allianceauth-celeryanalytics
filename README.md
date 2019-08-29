# celeryanalytics

celery task analytics for [Alliance Auth](https://gitlab.com/allianceauth/allianceauth).

## Installation

With your venv active,

Pip install `pip install -U git+https://github.com/pvyParts/allianceauth-celeryanalytics.git`

Add `'celeryanalytics',` to your local.py, run migrations a restart auth.

This module has no permissions or views. it will start logging all completed and failed tasks on install using the celery signals. 

View the failed tasks in admin of your auth. as below; 

![Admin Menu](https://i.imgur.com/g36hJyu.png "Admin Menu")

![Failures](https://i.imgur.com/mTD224f.png "Failures")

![Details](https://i.imgur.com/ang9wXB.png "Details")

## Issues

Please remember to report any celeryanalytics related issues using the issues on **this** repository.
