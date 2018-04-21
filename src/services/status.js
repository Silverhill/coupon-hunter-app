import React from 'react';
import { Palette } from 'coupon-components-native/styles';
import { FormattedMessage } from 'react-intl';

// Status
export const UNAVAILABLE = 'unavailable';
export const AVAILABLE = 'available';
export const HUNTED = 'hunted';
export const EXPIRED = 'expired';

export const getCurrentStatus = (status) => {
  switch (status) {
    case AVAILABLE:
      return {
        label: <FormattedMessage id="status.available" />,
        color: Palette.accent,
      };
    case UNAVAILABLE:
      return {
        label: <FormattedMessage id="status.unavailable" />,
        color: Palette.neutral,
      };
    case HUNTED:
      return {
        label: <FormattedMessage id="status.hunted" />,
        color: Palette.secondaryAccent,
      };
    case EXPIRED:
      return {
        label: <FormattedMessage id="status.expired" />,
        color: Palette.neutral,
      };
    default:
      return {
        label: '-',
        color: Palette.neutral,
      };
  }
}

export default {
  getCurrentStatus,
}