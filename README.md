# celeryanalytics

celery task analytics for [Alliance Auth](https://gitlab.com/allianceauth/allianceauth).

## Installation

With your venv active,

1. Pip install

      `pip install -U allianceauth-celeryanalytics`

2. Add `celeryanalytics` to your `INSTALLED_APPS` in your `local.py`

3. From terminal run migrations

     `python manage.py migrate celeryanalytics`

4. **Optional** if you wish to havve the module cealup old tasks its self run 

     `python manage.py ca_setup_task`

## Usage
This module has no permissions or views. it will start logging all completed and failed tasks on install using the celery signals.

### Cleanup 
If you wish to perform a tidyup of the database you can run the collowing command from your terminal

`python manage.py ca_run_housekeeping`

## Settings

`CA_HOUSEKEEPING_DB_BACKLOG` defines how long (in days) records should be kept in
your database. Default is 14 days.

`CA_RESULT_MAX_LEN` if you are using a results fed app you may wish to limit the result spam to database.
in your `local.py` add the setting `CA_RESULT_MAX_LEN=1000` set the integer to what ever you want as your max length. Default is `-1` or unlimited.


View the failed tasks in admin of your auth. as below;

![Admin Menu](https://i.imgur.com/g36hJyu.png "Admin Menu")

![Failures](https://i.imgur.com/mTD224f.png "Failures")

![Details](https://i.imgur.com/ang9wXB.png "Details")

## Issues

Please remember to report any celeryanalytics related issues using the issues on **this** repository.
