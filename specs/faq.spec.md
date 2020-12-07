# FAQ

A bot that spits out information about the FAQ requested and links to the longer form answer on our wiki (which has yet to be written).

## Steps

1. Responds to in-server `++faq` messages.
2. Consider also responding to DM `++faq` messages since some people might be shy.
3. Match the word being asked for with `++faq define <word>`:

```
++faq define LC

LeetCode (LC) is a platform that ... For more information, visit gitbook.com/cscareerhub/faq/leetcode.

++faq define onsite

An onsite is a ... For more information, visit gitbook.com/cscareerhub/faq/interviewing.
```

This could be a challenge if we need to map multiple words to a definition e.g., the LeetCode definition would be triggered by "LC" and "LeetCode".

4. Would match sentences based on trigger words:

```
++faq define What is LeetCode?

LeetCode (LC) is a platform that ... For more information, visit gitbook.com/cscareerhub/faq/leetcode.

++faq define What is a onsite with LC?

An onsite is a ... For more information, visit gitbook.com/cscareerhub/faq/interviewing.
LeetCode (LC) is a platform that ... For more information, visit gitbook.com/cscareerhub/faq/leetcode.
```

5. Admins and mods should be able to add more terms to the database through Discord with `++faq add`:

```
++faq add LC "LeetCode (LC) is a platform that ... For more information, visit gitbook.com/cscareerhub/faq/leetcode."
```

Alternatively,

```
++faq add LeetCode

What is the definition you'd like for LC?

LeetCode (LC) is a platform that ... For more information, visit gitbook.com/cscareerhub/faq/leetcode.

Got it. Added!
```
