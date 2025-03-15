import { atom } from 'recoil';

export const allBloodBanksState = atom({
  key: 'allBloodBanksState',
  default: []
});

export const allDonorsState = atom({
  key: 'allDonorsState',
  default: []
});

export const allHospitalsState = atom({
  key: 'allHospitalsState',
  default: []
});
