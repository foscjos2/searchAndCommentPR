<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# PR Review and Comment Action

This github action scans the diff of a PR for places where you are adding given strings. If a match is found, a comment will be left on the PR to alert the author and any reviewers.

## Getting started

## Create workflow

Details to come

### Configuration and usage

The input is comma seperated as github actions do not currently take anything other than booleans, strings, and numbers.
Ideally it would be a list of strings, so please treat it as such.
ex: "search term 1, search term 2, search term 3, searchTerm4" will be turned into: ["search term 1", "search term 2", "search term 3", "searchTerm4"]

Input strings are currently case insensitive, so bear that in mind.

## Development

Knock yourself out! I'll review each PR/issue as best I can in the time I have.

## Authors

This library was originally created by [@foscjos2](https://github.com/foscjos2/). It is maintained by [@foscjos2](https://github.com/foscjos2/).
