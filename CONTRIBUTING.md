# Contributing

If you're interested in contributing to this project,
please start with the
[general PDC contribution guidelines](https://github.com/PhilanthropyDataCommons/.github/blob/main/CONTRIBUTING.md).

## Guidelines specific to this project

### Populating "Recent Changes"

If your change affects the user experience,
describe it in concise, non-technical language
in the `RECENT_CHANGES.md` document
under a heading for the current month.
Include this description in the PR
that contains your change.

Consult the existing document
for a sense of what sort of changes
justify inclusion in `RECENT_CHANGES.md`,
and for how to write a good description.

As a reviewer,
be sure to review `RECENT_CHANGES.md` additions as well —
and if the submitter didn't write one,
be sure to consider whether they should.

### Ignored revisions

We have set up a file to track commits that are focused on formatting changes. It is possible to [ignore these commits when running git blame](https://akrabat.com/ignoring-revisions-with-git-blame/).

You can configure your local git to always ignore these commits by invoking:

```
git config blame.ignoreRevsFile .git-blame-ignore-revs
```
