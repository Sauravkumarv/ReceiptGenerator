export const validators = {
  required: (value) => {
    if (!value || value.toString().trim() === '') {
      return 'This field is required'
    }
    return null
  },

  email: (value) => {
    if (!value) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
    return null
  },

  phone: (value) => {
    if (!value) return null
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
      return 'Please enter a valid phone number'
    }
    return null
  },

  positive: (value) => {
    if (value < 0) {
      return 'Value must be positive'
    }
    return null
  },

  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Maximum ${max} characters allowed`
    }
    return null
  },

  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Minimum ${min} characters required`
    }
    return null
  }
}

export const validateField = (value, validatorFunctions) => {
  for (const validator of validatorFunctions) {
    const error = validator(value)
    if (error) return error
  }
  return null
}