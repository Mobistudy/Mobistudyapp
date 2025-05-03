import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'

import CINPUT from './demo/CustomInput.vue'

describe('CustomInput test', () => {
  it('mounts without errors', () => {
    const wrapper = mount(CINPUT, {
      props: {
        modelValue: 'Dario'
      }
    })

    expect(wrapper).toBeTruthy()
  })

  it('sets the correct default data', () => {
    const cinput = mount(CINPUT, {
      props: {
        modelValue: 'Dario'
      }
    })

    expect(cinput.props('modelValue')).toBe('Dario')
  })

  it('updates the data', async () => {
    const cinput = mount(CINPUT, {
      props: {
        modelValue: 'Dario',
        'onUpdate:modelValue': (e) => cinput.setProps({ modelValue: e })
      }
    })

    expect(cinput.props('modelValue')).toBe('Dario')

    await cinput.find('input').setValue('Dario2')

    expect(cinput.props('modelValue')).toBe('Dario2')
  })
})
