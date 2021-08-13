# AMA

Used for creating and displaying information on AMA events, as well as queueing and collecting questions for them.

1. Responds to `++ama`.
2. DMs info on the latest AMA when `++ama info` is used.
3. `++ama list` should DM a numbered list of all past, current, and future AMAs (just titles and links out to our website that will contain transcripts).

```
++ama list

__Past__

1. Building a Career During College, From Serial Interns to New Grads: https://cscareerhub.com/amas/building-a-career-during-college
2. Veteran Job Hoppers: Experiences at Opposite Ends of the Spectrum: https://cscareerhub.com/amas/job-hoppers-opposite-experiences

__Current__

3. What Would a Hiring Manager Say?: https://cscareerhub.com/amas/what-would-hiring-manager-say

__Planned__

4. Advice from a Former FAANG Engineer: https://cscareerhub.com/amas/advice-from-former-faang-engineer
```

4. Mods should be able to delete future AMAs with `++ama delete ama #` in case any get cancelled.
5. Mods should be able to update current AMA's info with `++ama update`.
6. Mods should be able to add an AMA event with `++ama new`.
7. After an AMA is over, the question queue should be archived. We could automatically do this by date, but also have a manual `++ama archive` command for mods as backup.

### Future

Not sure we want to implement this yet as asking questions live is more fun.

8. `++ama add "question"` should add the user's question for the current AMA.
9. `++ama questions` DMs a numbered of list all questions for the current AMA.
10. Mods should be able to delete questions with `++ama delete question #` in case there are any troll questions.
11. `++ama pull` should pop the first question off the list and send it in the specified channel, such as `#ama`.
