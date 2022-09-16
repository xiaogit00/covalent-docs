---
title: Covalent Postman Collection
weight: 5
description: Quickly sample Covalent API data using Postman Collections
---

# Covalent API Postman Collection

## Quick Start
If you are already familiar with Postman, you can import the following link into your Postman workspace:

`https://www.postman.com/collections/4404a73c93ff9d6abe6a`

&nbsp;
## What is Postman?  
Postman is a free tool used by developers to quickly and easily send REST, SOAP, and GraphQL requests and test APIs. It is available as both an online tool and an application for Linux, MacOS and Windows. Postman allows you to quickly issue API calls and see the responses in a nicely formatted, searchable form.

We have made a Covalent API Postman collection that allows you to:
- Quickly issue any Covalent API requests from Postman
- Reference properly formatted requests and not worry about parameters and configuration  
- Focus on the API response and the data you need  
- Not have to copy and paste tedious values in long query strings!

&nbsp;
## Setup

### Postman Installation
Postman can be installed locally or used as a web app. You can download Postman from https://www.postman.com/downloads/. It is recommended that you sign up using your email address as your workspace can then be easily backed up and shared between the web app and the app installed on your computer.

![download_postman.png](/static/images/developer-tools/covalent-postman-collection/download_postman.png)


After you have installed the application, run it. This will prompt you to create an account or log in.

&nbsp;
### Covalent API Collection Import
Next, here is how to import the Covalent API collection:

1. On the Postman home page, you will see the section on *Get started with Postman*. Click on *Create New*.

![getting_started](/static/images/developer-tools/covalent-postman-collection/getting_started.png)

2. Click on the *Workspace* option.

![new_workspace](/static/images/developer-tools/covalent-postman-collection/new_workspace.png)


3. On the new workspace page, click *Import*.

![import_collection](/static/images/developer-tools/covalent-postman-collection/import_collection.png)

4. Click on the *Link* tab on the Import page.

![import_link](/static/images/developer-tools/covalent-postman-collection/import_link.png)

5. Paste the following Covalent API collection link into the URL field and click *Continue*: https://www.getpostman.com/collections/4404a73c93ff9d6abe6a

![covalent_link](/static/images/developer-tools/covalent-postman-collection/covalent_link.png)

And now you have the Covalent API collection in your workspace!

&nbsp;
![covalent_api_collection](/static/images/developer-tools/covalent-postman-collection/covalent_api_collection.png)

Next we need to configure the collection to use the Covalent API key when making requests.

&nbsp;
### Covalent API Key Setup

To make a request, you will have to supply a Covalent API Key to Postman using the *Basic Auth* field.

6. Go to [https://www.covalenthq.com/platform](https://www.covalenthq.com/platform) to register and get your Covalent API key.

![api_key](/static/images/developer-tools/covalent-postman-collection/api_key.png)

7. Back in Postman, click on the top-level *Covalent API (Public)* menu item which will open up a config panel.

![covalent_config_panel](/static/images/developer-tools/covalent-postman-collection/covalent_config_panel.png)


8. Under the *Auth* tab, select *Basic Auth* for the *Type*.

![basic_auth](/static/images/developer-tools/covalent-postman-collection/basic_auth.png)

9. Paste your Covalent API Key into the *Username* field.

![basic_auth_username](/static/images/developer-tools/covalent-postman-collection/basic_auth_username.png)

10. And be sure to click *Save*.

![save_collection](/static/images/developer-tools/covalent-postman-collection/save_collection.png)

***Congratulations, you are now set up to try out all the Covalent API endpoints.***  

&nbsp;
## Making API Requests
The following steps outline how to use the Covalent API collection. By default, **all requests within the Covalent API collection have pre-configured query values attached to the variables so you can just run and test the endpoints.**

### Fetching Token Balances

1. Click on `Get Token Balances for Address` under the `Balances/` folder on the left, and click *Send*.

![sending_requests](/static/images/developer-tools/covalent-postman-collection/sending_requests.png)


2. Review the API response in the bottom panel:

![api_response](/static/images/developer-tools/covalent-postman-collection/api_response.png)

&nbsp;
### Changing Query Parameters
You may have noticed that in the `GET` URL field, there are highlighted variables such as `{{chain_id}}` and `{{wallet_address}}` . These are ***environment variables*** that you can configure with Postman. It is recommended that you change these environment variables instead of hardcoding values to reuse variables across all the endpoints in the collection.

1. Click on the top-level *Covalent API (Public)* menu item again to open up the config panel.

![covalent_config_panel](/static/images/developer-tools/covalent-postman-collection/covalent_config_panel.png)

2. This time, click on the *Variables* tab.

![variables](/static/images/developer-tools/covalent-postman-collection/variables.png)

This will open up a panel containing all the pre-configured variables within this collection and referenced in the query strings.

3. To change the wallet address, for example, paste the new wallet address into the `Initial Value` and `Current Value` fields and select *Persist All*. Then, click *Save*.

![persisting_all](/static/images/developer-tools/covalent-postman-collection/persisting_all.png)

4. Now send the request again! You will see the response return the balances of the new wallet address you supplied.

![sending_requests](/static/images/developer-tools/covalent-postman-collection/sending_requests.png)

You can change the `{{chain_id}}` variable as well if you want to check out address balances on other chain. Here is a snapshot of supported chains along with their chain IDs.

![chain_id](/static/images/developer-tools/covalent-postman-collection/chain_id.png)
