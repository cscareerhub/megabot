# Settings

This command would manage the settings of the entire bot and should only be accessible to admins and mods.

## Steps

1. Respond to `++settings` messages.
2. Admins and mods should be able to:

- Change the bot prefix
- Set role restrictions on commands and functionality
- Change the channels that the bot spits things out in
- Limit the channels to detect commands in

Some examples:

```
++settings prefix !
++settings modrole @Mod
++settings pinners @Contributors
```

Channel restriction example in the format of `++settings onlydetect <minibot> <channel>`:

```
++settings onlydetect all #bot-commands
++settings onlydetect salary #salary
++settings onlydetect ama #ama
```
