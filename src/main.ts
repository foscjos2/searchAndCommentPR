import * as core from "@actions/core";
const { GitHub, context } = require("@actions/github");
const parse = require("parse-diff");

async function run(): Promise<void> {
  try {
    // get token
    const token = core.getInput("github-token", { required: true });
    const github = new GitHub(token, {});

    const searchTerms: string[] = core.getInput("searchTerms").split(",");

    const diff_url = context.payload.pull_request.diff_url;
    const result = await github.request(diff_url);
    const files = parse(result.data);
    let changes = "";

    files.forEach(function (file: any) {
      file.chunks.forEach((chunk: any) => {
        chunk.changes.forEach(function (change: any) {
          if (change.add) {
            // only need to search through additions. Shouldn't matter if the given keyword is removed.
            changes += change.content;
          }
        });
      });
    });

    if (changes && searchTerms?.length > 0) {
      let searchTermsFound: string[] = [];
      changes = changes.toLowerCase();

      searchTerms.forEach((searchTerm: string) => {
        if (changes.includes(searchTerm.toLowerCase().trim())) {
          // we've got a hit, determine if we need to make a comment.
          // might want to add the search term to a list of "hits" that we can add to the comment
          searchTermsFound.push(searchTerm);
        }
      });

      if (searchTermsFound.length > 0) {
        addCommentToPullRequest(searchTermsFound);
      }
    }
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

async function addCommentToPullRequest(searchTermsFound: string[]) {
  // here is where we will add the logic to leave a comment on the PR about the given terms.
  // Ideally only one comment will be left over the life of the PR - so each time this action is run we won't leave duplicate comments.
}

run();
