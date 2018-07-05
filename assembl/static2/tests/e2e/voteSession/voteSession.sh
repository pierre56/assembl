#!/bin/bash
../../../node_modules/jest/bin/jest.js ./voteSessionStepOneSetup.spec.js
../../../node_modules/jest/bin/jest.js ./tokenSetup.spec.js
../../../node_modules/jest/bin/jest.js ./addPropositions.spec.js
../../../node_modules/jest/bin/jest.js ./deleteVotePhase.spec.js
