import { Module } from 'vuex'
import GtmState from '../types/GtmState'
import { mutations } from './mutations'
import { state } from './state'

export const module: Module<GtmState, any> = {
  namespaced: true,
  mutations,
  state
};
