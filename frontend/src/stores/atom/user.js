import { atom, selector } from 'recoil'
import axios from 'axios'

export const fetchUser = selector({
    key: 'fetchUser',
    get: async ({ get }) => {
        try {
            const user = await axios.get(
                `${import.meta.env.VITE_URL}/api/v1/user/userInfo`,
                { headers: { Authorization: localStorage.getItem("token") } }
            );
            const transactions = await axios.get(
                `${import.meta.env.VITE_URL}/api/v1/transaction/transactions`,
                { headers: { Authorization: localStorage.getItem("token") } }
            );
            const userAccount = {
                userId: user.data.userData._id,
                username: user.data.userData.username,
                firstName: user.data.userData.firstName,
                lastName: user.data.userData.lastName,
                balance: user.data.userData.balance,
                friendsInfo: [...user.data.userData.friendsInfo],
                sentFriendRequests: [...user.data.userData.sentFriendRequests],
                friendRequestsInfo: [...user.data.userData.friendRequestsInfo],
                transactions: [...transactions.data.transactions],
                friendsLength: [...user.data.userData.friendsInfo].length,
                transactionsLength: [...transactions.data.transactions].length,
                friendRequestsLength: [...user.data.userData.friendRequestsInfo].length,
            };
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
