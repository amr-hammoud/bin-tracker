interface User {
    _id: string;
    first_name: string;
    last_name: string;
    username: string;
    email?: string;
    user_type: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    device_id?: string;
}

interface Token {
    token: string | null
}

export {User, Token}