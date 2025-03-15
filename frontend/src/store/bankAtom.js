import { atom } from 'recoil';

export const bloodBanksState = atom({
  key: 'bloodBanksState',
  default: []
});

export const appointmentsState = atom({
  key: 'appointmentsState',
  default: []
});

export const requestsState = atom({
  key: 'requestsState',
  default: []
});
