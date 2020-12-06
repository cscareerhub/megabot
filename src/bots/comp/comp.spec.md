# Compensation bot

## Steps

1. Responds to `++salary` message in DMs.
2. Sends form to user to fill out.

The minimum information collected should be the following, but may change:

```
Company/Industry: <company>
Title: <job title>
Date of Offer: <date>
Location: <city, state>
Duration: <# weeks>
Salary: <salary>
Relocation/Housing: <relocation>
Perks: <perks>
```

3. Normalizes inputs where possible. Some possibilities:

- Capitalization
- If in US, state formatting
- Number and date formatting

4. Sends latest input to mod-specified channel in a nice way. Options (choose whichever is prettiest):

- Message
- Code block
- Embed

## Goals

- Easily allow users to compare salaries with other community members by company and position

### Stretch

- Ability to crunch anonymous data to figure out averages and other useful information
