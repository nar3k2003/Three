import { ref } from 'vue'
import { isDrawingLine } from './line.js'
import { isDrawingCircle } from './circle.js'
import { isDrawingRectangle } from './rectangle.js'

export const isSelectMode = ref(false)

export function toggleSelectMode() {
  if (isSelectMode.value) {
    isSelectMode.value = false
  } else {
    isSelectMode.value = true
    isDrawingLine.value = false
    isDrawingCircle.value = false
    isDrawingRectangle.value = false
  }
}


