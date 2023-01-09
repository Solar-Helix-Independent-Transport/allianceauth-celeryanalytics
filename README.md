# celeryanalytics

celery task and worker analytics for [Alliance Auth](https://gitlab.com/allianceauth/allianceauth).

## Installation

With your venv active,

1. Pip install

      `pip install -U allianceauth-celeryanalytics`

2. Add `celeryanalytics` to your `INSTALLED_APPS` in your `local.py`

3. From terminal run migrations

     `python manage.py migrate celeryanalytics`
     `python manage.py collectstatic`

4. **Optional** if you wish to havve the module cealup old tasks its self run 

     `python manage.py ca_setup_task`

## Usage
This module has no permissions. it will start logging all completed and failed tasks on install using the celery signals. To view the UI you need to be superuser, and select `Task Queues` from the side menu

### Task Menu 
Toggle sections of the UI on/off here
![Imgur](https://i.imgur.com/Zc9m0P1.png)

### Workers 
Shows basic info on alll running workers

![Imgur](https://i.imgur.com/O8j4uMw.png)

*NOTE* if you only have a single worker shown, you are probably missing the `-n %(program_name)s_%(process_num)02d` parameter in your the supervisor config commands.

### Active Tasks
Shows tasks that are running in the what workers
![Imgur](https://i.imgur.com/ERE38gE.png)

### Future Tasks
Shows tasks that are held by workers with a future ETA. These may have been retries with a cool down or tasks scheduled to run in the future.

![Imgur](https://i.imgur.com/wPeuTJ7.png)

### Queue Backlog
Shows tasks split by Queue and Priority that are still pending in the queue

![Imgur](https://i.imgur.com/rNxP74P.png)

### Specifics on failed/completed tasks
View the successful/failed tasks in admin of your auth. as below;

![Admin Menu](https://i.imgur.com/g36hJyu.png "Admin Menu")

![Failures](https://i.imgur.com/mTD224f.png "Failures")

![Details](https://i.imgur.com/ang9wXB.png "Details")

## Cleanup 
If you wish to perform a tidy-up of the database you can run the following command from your terminal

`python manage.py ca_run_housekeeping`

## Settings

`CA_HOUSEKEEPING_DB_BACKLOG` defines how long (in days) records should be kept in
your database. Default is 14 days.

`CA_RESULT_MAX_LEN` if you are using a results fed app you may wish to limit the result spam to database.
in your `local.py` add the setting `CA_RESULT_MAX_LEN=1000` set the integer to what ever you want as your max length. Default is `-1` or unlimited.

`CA_LOG_SUCCESS_TO_DB` If you don't want the module to log `Successful Tasks` to database, set this to `False`. Default is `True`

`CA_LOG_FAILURE_TO_DB` If you don't want the module to log `Failed Tasks` to database, set this to `False`. Default is `True`


## Issues

Please remember to report any celeryanalytics related issues using the issues on **this** repository.
