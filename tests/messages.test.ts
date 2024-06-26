// Copyright 2020-2021 Cristian Greco
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {expect} from '@jest/globals';
import {pullRequestText} from '../src/messages';
import {Release} from '../src/releases';

describe('pullRequestText', () => {
  const distributionTypes = new Set(['all', 'bin']);

  const targetRelease: Release = {
    version: '1.0.1',
    allChecksum: 'dist-all-checksum-value',
    binChecksum: 'dist-bin-checksum-value',
    wrapperChecksum: 'wrapper-jar-checksum-value'
  };

  const sourceVersion = '1.0.0';

  it('returns title and body text of Pull Request', () => {
    const {title, body} = pullRequestText(
      distributionTypes,
      targetRelease,
      sourceVersion
    );

    expect(title).toEqual('Update Gradle Wrapper from 1.0.0 to 1.0.1');

    expect(body).toEqual(`Update Gradle Wrapper from 1.0.0 to 1.0.1.

Read the release notes: https://docs.gradle.org/1.0.1/release-notes.html

---

The checksums of the Wrapper JAR and the distribution binary have been successfully verified.

- Gradle release: \`1.0.1\`
- Distribution (-bin) zip checksum: \`dist-bin-checksum-value\`
- Distribution (-all) zip checksum: \`dist-all-checksum-value\`
- Wrapper JAR Checksum: \`wrapper-jar-checksum-value\`

You can find the reference checksum values at https://gradle.org/release-checksums/

---

🤖 This PR has been created by the [Update Gradle Wrapper](https://github.com/gradle-update/update-gradle-wrapper-action) action.

<details>
<summary>Need help? 🤔</summary>
<br />

If something doesn't look right with this PR please file an issue [here](https://github.com/gradle-update/update-gradle-wrapper-action/issues).
</details>`);
  });

  describe('when source version is unspecified', () => {
    it('returns title and body text with only the target version', () => {
      const {title, body} = pullRequestText(distributionTypes, targetRelease);

      expect(title).toEqual('Update Gradle Wrapper to 1.0.1');

      expect(body).toEqual(`Update Gradle Wrapper to 1.0.1.

Read the release notes: https://docs.gradle.org/1.0.1/release-notes.html

---

The checksums of the Wrapper JAR and the distribution binary have been successfully verified.

- Gradle release: \`1.0.1\`
- Distribution (-bin) zip checksum: \`dist-bin-checksum-value\`
- Distribution (-all) zip checksum: \`dist-all-checksum-value\`
- Wrapper JAR Checksum: \`wrapper-jar-checksum-value\`

You can find the reference checksum values at https://gradle.org/release-checksums/

---

🤖 This PR has been created by the [Update Gradle Wrapper](https://github.com/gradle-update/update-gradle-wrapper-action) action.

<details>
<summary>Need help? 🤔</summary>
<br />

If something doesn't look right with this PR please file an issue [here](https://github.com/gradle-update/update-gradle-wrapper-action/issues).
</details>`);
    });
  });

  describe('when distribution type is "bin"', () => {
    const binDistributionType = new Set(['bin']);

    it('the body text contains only the "bin" checksum value', () => {
      const {title, body} = pullRequestText(
        binDistributionType,
        targetRelease,
        sourceVersion
      );

      expect(title).toEqual('Update Gradle Wrapper from 1.0.0 to 1.0.1');

      expect(body).toEqual(`Update Gradle Wrapper from 1.0.0 to 1.0.1.

Read the release notes: https://docs.gradle.org/1.0.1/release-notes.html

---

The checksums of the Wrapper JAR and the distribution binary have been successfully verified.

- Gradle release: \`1.0.1\`
- Distribution (-bin) zip checksum: \`dist-bin-checksum-value\`
- Wrapper JAR Checksum: \`wrapper-jar-checksum-value\`

You can find the reference checksum values at https://gradle.org/release-checksums/

---

🤖 This PR has been created by the [Update Gradle Wrapper](https://github.com/gradle-update/update-gradle-wrapper-action) action.

<details>
<summary>Need help? 🤔</summary>
<br />

If something doesn't look right with this PR please file an issue [here](https://github.com/gradle-update/update-gradle-wrapper-action/issues).
</details>`);
    });
  });

  describe('when distribution type is "all"', () => {
    const allDistributionType = new Set(['all']);

    it('the body text contains only the "all" checksum value', () => {
      const {title, body} = pullRequestText(
        allDistributionType,
        targetRelease,
        sourceVersion
      );

      expect(title).toEqual('Update Gradle Wrapper from 1.0.0 to 1.0.1');

      expect(body).toEqual(`Update Gradle Wrapper from 1.0.0 to 1.0.1.

Read the release notes: https://docs.gradle.org/1.0.1/release-notes.html

---

The checksums of the Wrapper JAR and the distribution binary have been successfully verified.

- Gradle release: \`1.0.1\`
- Distribution (-all) zip checksum: \`dist-all-checksum-value\`
- Wrapper JAR Checksum: \`wrapper-jar-checksum-value\`

You can find the reference checksum values at https://gradle.org/release-checksums/

---

🤖 This PR has been created by the [Update Gradle Wrapper](https://github.com/gradle-update/update-gradle-wrapper-action) action.

<details>
<summary>Need help? 🤔</summary>
<br />

If something doesn't look right with this PR please file an issue [here](https://github.com/gradle-update/update-gradle-wrapper-action/issues).
</details>`);
    });
  });
});
