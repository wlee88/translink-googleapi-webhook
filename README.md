# Private Google Voice Local Bus Stop/Train times app

This is a webhook to be used with Google Home/Assistant. 
It will always respond with the same bus stop times at the moment.

Only available for Translink Brisbane.

# Deploy to:
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# How it works?
- *Important* Insert your own bus stop code inside options.json.
- Push this app to Heroku
- Test the API - use www.hurl.it to test it

Open API.AI portal - https://api.ai
- Create an account and login
- Create an application within API.AI with the voice recognition you want

(Working as of 7/8/2017) - to create a persisting test session that is private to you follow instructions [here](https://stackoverflow.com/questions/41088596/make-google-actions-development-project-preview-persist-longer/41205026#41205026)

- before pushing the app in the final step in the method above, change name and invocation to "bus stop" or "train times" in the manifest key value pair in action.json depending on what endpoint you're using it for.