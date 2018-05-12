import React from 'react';
import { Palette } from 'coupon-components-native/styles';

const constants = {
  UNAVAILABLE: 'unavailable',
  AVAILABLE: 'available',
  HUNTED: 'hunted',
  EXPIRED: 'expired',
  REDEEMED: 'redeemed',
};

export const getCurrentStatus = (status) => {
  switch (status) {
    case constants.AVAILABLE:
      return {
        id: "status.available",
        color: Palette.accent,
        key: constants.AVAILABLE
      };
    case constants.UNAVAILABLE:
      return {
        id: "status.unavailable",
        color: Palette.neutral,
        key: constants.UNAVAILABLE
      };
    case constants.HUNTED:
      return {
        id: "status.hunted",
        color: Palette.secondaryAccent,
        key: constants.HUNTED
      };
    case constants.EXPIRED:
      return {
        id: "status.expired",
        color: Palette.neutral,
        key: constants.EXPIRED
      };
    case constants.REDEEMED:
      return {
        id: "status.redeemed",
        color: Palette.colors.aquamarine,
        key: constants.REDEEMED
      };
    default:
      return {
        id: 'status.unavailable',
        color: Palette.neutral,
        key: constants.UNAVAILABLE
      };
  }
}

export default {
  getCurrentStatus,
  constants,
}