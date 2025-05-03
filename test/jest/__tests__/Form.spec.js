import { describe, expect, it } from '@jest/globals'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest'
import { mount, shallowMount } from '@vue/test-utils'
import { QIcon, QInput } from 'quasar'

import FORM from './demo/FormDemo.vue'

installQuasarPlugin({ components: { QIcon, QInput } })

describe('Form test', () => {
  it('mounts without errors', () => {
    const form = mount(FORM, {
      props: {
        modelValue: {
          name: 'Dario'
        }
      }
    })

    expect(form).toBeTruthy()

    const qinputs = form.findAllComponents(QInput)
    expect(qinputs.length).toBe(1)
    expect(qinputs.at(0).isVisible()).toBe(true)
  })

  it('sets the correct default data', () => {
    const form = mount(FORM, {
      props: {
        modelValue: {
          name: 'Dario'
        }
      }
    })

    expect(form.props('modelValue').name).toBe('Dario')
  })

  it('updates the data', async () => {
    const form = mount(FORM, {
      props: {
        modelValue: {
          name: 'Dario'
        },
        'onUpdate:modelValue': (e) => {
          form.setProps({ modelValue: e })
        }
      }
    })

    expect(form.props('modelValue').name).toBe('Dario')

    const qinput = form.findComponent(QInput)
    await qinput.setValue('Dario2')

    expect(form.props('modelValue').name).toBe('Dario2')
  })
})
