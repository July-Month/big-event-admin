import { dayjs } from 'element-plus'

export const formatTime = (time) => dayjs(time).format('YYYY-MM-DD')

// 普通对象转成 formData对象
export const objectToFormData = (obj, formData) => {
  formData = formData || new FormData()

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let value = obj[key]

      if (value instanceof Array) {
        value.forEach((item) => {
          objectToFormData(item, formData)
        })
      } else if (value instanceof Object) {
        objectToFormData(value, formData)
      } else {
        formData.append(key, value)
      }
    }
  }
  return formData
}
