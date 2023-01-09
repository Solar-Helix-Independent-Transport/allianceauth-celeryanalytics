.PHONY: help clean dev docs package test

help:
	@echo "This project assumes that an active Python virtualenv is present."
	@echo "The following make targets are available:"
	@echo "  dev        install all deps for dev environment"
	@echo "  devjs      run the react dev server"
	@echo "  clean      remove all old packages"
	@echo "  test       run tests"
	@echo "  deploy     Configure the PyPi config file in CI"
	@echo "  package    Build the PyPi package"

clean:
	rm -rf dist/*
	rm -rf frontend/build/*

dev:
	pip install --upgrade pip
	pip install wheel -U
	pip install tox -U
	pip install -e .

test:
	tox

deploy:
	pip install twine
	twine upload dist/*

package:
	cd frontend;yarn install;yarn build
	python setup.py sdist

devjs:
	cd frontend;yarn install;yarn start
