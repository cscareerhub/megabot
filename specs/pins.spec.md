# Pins bot

Easily allow members with mod-specified roles to pin messages.

## Steps

1. Responds to the pin reaction in server by pinning the message.
2. List pins from a certain channel when called with `++pins list <channel>`. Open question: should we allow `++pins list all`?
3. The list of pins should send in the user's DMs and not spam in the server.
