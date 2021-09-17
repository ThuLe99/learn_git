// import { IBlog } from './../../utils/TypeScript';
 import { IBlog } from '../../utils/TypeScript'

export const GLOBALTYPES = {
    AUTH: "AUTH",
    ALERT: "ALERT",
    THEME: 'THEME',
    STATUS: 'STATUS',
    MODAL: 'MODAL',
    SOCKET: 'SOCKET',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE',
    CALL: 'CALL',
    PEER: 'PEER'
}

export const EditData = (data:IBlog[] , id: string, blog:IBlog) => {
    const newData = data.map(item => 
        (item._id === id ? blog : item)
    )
    return newData;
}

// export const DeleteData = (data, id) => {
//     const newData = data.filter(item => item._id !== id)
//     return newData;
// }