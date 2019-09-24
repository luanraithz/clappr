// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import ClapprCore from '@clappr/core'
import { Plugins, Vendor } from '@clappr/plugins'

// TODO: remove on 0.5.x (backward-compatibility only)
const {
  ClickToPause: ClickToPausePlugin,
  DVRControls,
  Favicon,
  MediaControl,
  Poster,
  SpinnerThreeBouncePlugin,
  WaterMarkPlugin,
} = Plugins

const version = VERSION

export default {
  ...ClapprCore,
  Plugins,
  MediaControl,
  ClickToPausePlugin,
  DVRControls,
  Favicon,
  Poster,
  SpinnerThreeBouncePlugin,
  WaterMarkPlugin,
  Vendor,
  version,
}
