import { atom } from 'recoil'

export const user = atom({
    key: 'user',
    default: {
        userId: '',
        username: '',
        firstName: '',
        lastName: '',
        balance: ''
    }
})