import { Color } from 'three'
import { createStore } from 'vuex'

const select = {
  state: {
    selectObjects: [],
    color: {
      originalColor: new Color('black'),
      hoverColor: new Color('red'),
      clickColor: new Color('blue') ,
    },
  },
  mutations: {
    selectObject(state, object) {
      const exist = state.selectObjects.some((obj) => obj === object)
      if (!exist){
        state.selectObjects = [...state.selectObjects, object]
      }
    },
    selectCtrlObject(state, object) {
      state.selectObjects.push(object)
    },
    deselectObject(state, object) {
      state.selectObjects = state.selectObjects.filter((obj) => obj !== object)
    },
    clearSelectObjects(state) {
      state.selectObjects = []
    },
  },
  getters: {
    getColor(state){
      return state.color
    },
    selectedObject(state) {
      return state.selectObjects
    },
  },
}

export default createStore({
  modules: {
    select
  }
})
