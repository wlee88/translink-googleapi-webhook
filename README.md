# Private Google Voice Local Bus Stop/Train times app

This is a webhook to be used with Google Home/Assistant. It will tell you the bus or train times depending how you configure it. 

Only available for Translink Brisbane.

# Deploy to:
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# How it works?
- *Important* Insert your own bus stop code inside options.json.
- Push this app to Heroku
- Test the API - use postmant or [hurl](www.hurl.it) to test it

Open API.AI portal - https://api.ai
- Create an account and login
- Add your webservice url to fulfillment.
- Create an application within API.AI and upon welcome intent, call the webhook (/train URI for train times and /bus URI for bus times). Note that there can only be one agent for each one, i.e a bus agent for bus times and a train times agent for train times.
- Under Integrations enable Google Assistent with the toggle. No need to fiddle with settings yet.
- Go to Intentions, under "Default Welcome Intent" you should now see a new Actions on Google step, where you can tick "End Conversation".

Publish the app privately.
(Working as of 7/8/2017) - to create a persisting test session that is private to you follow instructions [here](https://stackoverflow.com/questions/41088596/make-google-actions-development-project-preview-persist-longer/41205026#41205026)

- before pushing the app in the final step in the method above, change name and invocation to "bus stop" or "train times" in the manifest key value pair in action.json depending on what endpoint you're using it for. This way you can say "open train times" or "open bus times" to get the times.


[William Lee](http://www.william-lee.com)