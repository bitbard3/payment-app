import { atom, selector } from 'recoil'
import axios from 'axios'

export const fetchUser = selector({
    key: 'fetchUser',
    get: async ({ get }) => {
        try {
            const user = await axios.get(
                "http://localhost:3000/api/v1/user/userInfo",
                { headers: { Authorization: localStorage.getItem("token") } }
            );
            const transactions = await axios.get(
                "http://localhost:3000/api/v1/transaction/transactions",
                { headers: { Authorization: localStorage.getItem("token") } }
            );
            const userAccount = {
                userId: user.data.userData._id,
                username: user.data.userData.username,
                firstName: user.data.userData.firstName,
                lastName: user.data.userData.lastName,
                balance: user.data.userData.balance,
                friends: [...user.data.userData.friends],
                sentFriendRequests: [...user.data.userData.sentFriendRequests],
                friendRequests: [...user.data.userData.friendRequests],
                transactions: [...transactions.data.transactions],
                friendsLength: [...user.data.userData.friends].length,
                transactionsLength: [...transactions.data.transactions].length,
            };
            if (user.status == 200 && transactions.status) {
            }
            else {

            }
            return userAccount
        } catch (error) {
            throw error
        }
    }
})


export const user = atom({
    key: 'user',
    default: fetchUser
})
