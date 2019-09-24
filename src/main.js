// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import BaseExports from './base_bundle'

import { BaseFlashPlayback, FlashPlayback as Flash } from '@clappr/flash-playback'
import FlasHLS from '@clappr/flashls-playback'
import HLS from '@clappr/hlsjs-playback'

export default {
  ...BaseExports,
  BaseFlashPlayback,
  Flash,
  FlasHLS,
  HLS,
}
