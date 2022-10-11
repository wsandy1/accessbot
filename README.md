# Access Bot
Containerized fork of [vexsuk/accessbot](https://github.com/vexsuk/accessbot), geared for running Discord access bots for multiple vAMSYS virtual airlines.

## Usage
Clone this repository with
```
git clone https://github.com/wsandy1/accessbot.git
```
Edit `config.js` as follows:
```js
{
  "airlineID": "", // 3 letter airline ID
  "vamsysKey": "", // 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  "discordToken": "", // Discord bot token
  "servers": {
    "012345678901234567": { // set to the guild ID
      "accessRoleId": ["012345678901234567"], // Role ID to assign when access is granted. Comma separate multiple roles: ["012345678901234567", "012345678901234567"]
      "nickSeparator": " - ", // separator between name and pilot ID in nicknames
      "roleRemoval": {
        "enabled": true, // set this to true if a role needs to be removed when a user is given access to the server, and false if not
        "roleId": ["012345678901234567"] // required if enabled: true. Set to ID of role/roles to be removed when access is granted. Comma separated as with above.
      }
    }
  }
}
```
Build the docker image:
```
cd accessbot
docker build --tag [imagename] .
```
At this point, you can delete the downloaded files if you want.

Run the docker container:
```
docker run -d --name [containername] --restart unless-stopped [imagename]
```
The container will run detatched from the terminal, and restart even if the docker daemon/server has been restarted.

To stop the container:
```
docker stop [containername]
```
