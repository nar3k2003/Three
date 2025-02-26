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
    getColor: (state) => state.color,
  },
}

export default createStore({
  modules: {
    select
  }
})
